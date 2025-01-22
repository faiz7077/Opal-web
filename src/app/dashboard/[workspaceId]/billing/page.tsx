import { getPaymentInfo } from '@/actions/user'
import React from 'react'

type Props = {}

const BillingPage = async (props: Props) => {
    const payment = await getPaymentInfo();

    return (
        <div className="bg-[#1D1D1D] flex flex-col gap-y-8 p-5 rounded-xl">
            <div>
                <h2 className="text-2xl">Current Plan : {payment.data?.subscription?.plan}</h2>
                <p className="text-[#9D9D9D]">Your Payment History</p>
            </div>
            <div>
                <h2 className="text-2xl">
                    ${payment?.data?.subscription?.plan === 'PRO' ? '99' : '0'}/Month
                </h2>
                <p className="text-[#9D9D9D]">{payment?.data?.subscription?.plan}</p>
            </div>
        </div>
    )
}

export default BillingPage