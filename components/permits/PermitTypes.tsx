// import { Card } from "@/components/ui/Card";
// import { Button } from "@/components/ui/Button";
// import Link from "next/link";
// import { PermitType, PermitTypeDescriptions } from '@/types/permit';
// import {PermitCard} from "@/components/permits/PermitCard";
//
// const permitTypes = [
//     {
//         type: PermitType.DAILY,
//         price: 15,
//         description: 'Perfect for a day trip',
//         features: ['Valid for 24 hours', 'All species included', 'Immediate start possible']
//     },
//     {
//         type: PermitType.WEEKLY,
//         price: 45,
//         description: 'Ideal for vacations',
//         features: ['Valid for 7 days', 'All species included', 'Best value for short trips']
//     },
//     {
//         type: PermitType.MONTHLY,
//         price: 90,
//         description: 'Regular fisherman\'s choice',
//         features: ['Valid for 30 days', 'All species included', 'Perfect for frequent fishing']
//     },
//     {
//         type: PermitType.ANNUAL,
//         price: 250,
//         description: 'For dedicated anglers',
//         features: ['Valid for 365 days', 'All species included', 'Best value for regular use']
//     }
// ];
//
// export function PermitTypes() {
//     return (
//         <section>
//             <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
//                 Choose Your Permit
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                 {permitTypes.map((permit) => (
//                     <PermitCard key={permit.type} permit={permit} />
//                 ))}
//             </div>
//         </section>
//     );
// }