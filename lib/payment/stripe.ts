import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16', // Use the latest API version
    typescript: true,
});

export const createPaymentIntent = async ({
                                              amount,
                                              currency = 'usd',
                                              metadata = {},
                                          }: {
    amount: number;
    currency?: string;
    metadata?: Record<string, string | number>;
}) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convert to cents
            currency,
            metadata,
            automatic_payment_methods: {
                enabled: true,
            },
        });

        return paymentIntent;
    } catch (error) {
        console.error('Error creating payment intent:', error);
        throw error;
    }
};

export const retrievePaymentIntent = async (paymentIntentId: string) => {
    try {
        return await stripe.paymentIntents.retrieve(paymentIntentId);
    } catch (error) {
        console.error('Error retrieving payment intent:', error);
        throw error;
    }
};

export const createPaymentSession = async ({
                                               lineItems,
                                               successUrl,
                                               cancelUrl,
                                               metadata = {},
                                           }: {
    lineItems: Stripe.Checkout.SessionCreateParams.LineItem[];
    successUrl: string;
    cancelUrl: string;
    metadata?: Record<string, string | number>;
}) => {
    try {
        return await stripe.checkout.sessions.create({
            mode: 'payment',
            payment_method_types: ['card'],
            line_items: lineItems,
            success_url: successUrl,
            cancel_url: cancelUrl,
            metadata,
        });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        throw error;
    }
};

export const webhookConstructEvent = (
    payload: string | Buffer,
    signature: string,
    webhookSecret: string
) => {
    try {
        return stripe.webhooks.constructEvent(
            payload,
            signature,
            webhookSecret
        );
    } catch (error) {
        console.error('Error constructing webhook event:', error);
        throw error;
    }
};