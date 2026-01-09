"use client"

import { ArrowLeft } from "lucide-react"
import BillHeader from "../components/Bill-header"
import BillItems from "../components/Bill-items"
import BillSummary from "../components/Bill-summery"
import { useState } from "react"
import type { CartItem } from "./ReviewOrder"
import { useLocation, useNavigate } from "react-router-dom"



export default function BillPage() {

    const location = useLocation()
    const navigate = useNavigate()

    const [billData, setBillData] = useState<{
        createdAt: string;
        finalTotal: number;
        items: CartItem[];
        totalDiscount: number;
        subtotal: number;
    } | null>(location.state?.billData || null);


    if (!billData) {
        navigate('/')
        return
    }


    const billDate = new Date(billData?.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    })

    return (
        <main className="min-h-screen bg-background py-6 px-4 md:px-8">
            <div className="max-w-4xl mx-auto">

                <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back</span>
                </button>


                <div className="bg-card rounded-lg border border-border p-6 space-y-8">

                    <BillHeader billDate={billDate} />


                    <BillItems items={billData.items} />

                    <BillSummary
                        subtotal={billData.subtotal}
                        totalDiscount={billData.totalDiscount}
                        finalTotal={billData.finalTotal}
                    />
                </div>


                <div className="mt-6 text-sm text-muted-foreground">
                    <p>Terms & Conditions</p>
                </div>
            </div>
        </main>
    )
}
