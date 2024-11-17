import {NextRequest, NextResponse} from "next/server";

const protectedRoutes = [
    '/account',
    '/contests',
    '/checkout',
    '/admin'
];

const adminRoutes = [
    '/admin'
];

export function middleware(request: NextRequest) {
    console.log('Middleware running on path:', request.nextUrl.pathname);

    const token = request.cookies.get('token')?.value;
    const {pathname} = request.nextUrl;

    // Skip public paths
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname === '/auth/login' ||
        pathname === '/auth/register'
    ) {
        return NextResponse.next();
    }

    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
    const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));

    if (isProtectedRoute) {
        if (!token) {
            const loginUrl = new URL('/auth/login', request.url);
            loginUrl.searchParams.set('from', pathname);
            return NextResponse.redirect(loginUrl);
        }

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));

            if (isAdminRoute && payload.role !== 'ADMIN' && payload.role !== 'ROLE_ADMIN') {
                return NextResponse.redirect(new URL('/', request.url));
            }

            const response = NextResponse.next();
            response.headers.set('x-user-role', payload.role);
            return response;

        } catch (error) {
            console.error('Token validation failed:', error);
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};