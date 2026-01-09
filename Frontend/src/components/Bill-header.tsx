

interface BillHeaderProps {
    billDate: string
}

const bill = {
    billingAddress: {
        name: "Willy Wonka",
        address: "1445 West Norwood Avenue, Itasca, Illinois, USA",
        phone: "9722304105",
        email: "om@om.com",
        siret: "362 521 879 00034",
        vat: "842-484021",
    },
    note: "This is a custom message that might be relevant to the customer. It can span up to three or four rows.",
}


export default function BillHeader({ billDate }: BillHeaderProps) {
    const paymentDateString = billDate

    return (
        <>

            <div className="md:hidden space-y-6">

                <div className="bg-secondary/40 rounded-lg p-4 space-y-6">
                    <div>
                        <p className="text-sm text-muted-foreground mb-1">Bill Date</p>
                        <p className="text-lg font-semibold text-foreground">{billDate}</p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground mb-1">Amount Received</p>
                        <p className="text-lg font-semibold text-foreground">₹500</p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground mb-1">Payment Date</p>
                        <p className="text-lg font-semibold text-foreground">{paymentDateString}</p>
                    </div>
                </div>


                <div>
                    <p className="text-sm text-muted-foreground mb-2">Billing Address</p>
                    <p className="font-semibold text-foreground">{bill.billingAddress.name}</p>
                    <p className="text-sm text-muted-foreground mt-2">{bill.billingAddress.address}</p>
                    <p className="text-sm text-muted-foreground">
                        {bill.billingAddress.phone} | {bill.billingAddress.email}
                    </p>
                    <p className="text-sm font-medium text-foreground mt-2">SIRET: {bill.billingAddress.siret}</p>
                    <p className="text-sm font-medium text-foreground">VAT: {bill.billingAddress.vat}</p>
                </div>

                <div>
                    <p className="text-sm text-muted-foreground mb-2">Note</p>
                    <p className="text-sm text-foreground">{bill.note}</p>
                </div>
            </div>


            <div className="hidden md:grid grid-cols-2 gap-8">

                <div className="space-y-6">
                    <div>
                        <p className="text-sm text-muted-foreground mb-1">Bill Date</p>
                        <p className="text-xl font-semibold text-foreground">{billDate}</p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground mb-1">Amount Received</p>
                        <p className="text-xl font-semibold text-foreground">₹500</p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground mb-1">Payment Date</p>
                        <p className="text-xl font-semibold text-foreground">{paymentDateString}</p>
                    </div>
                </div>


                <div className="space-y-6">

                    <div>
                        <p className="text-sm text-muted-foreground mb-2">Billing Address</p>
                        <p className="font-semibold text-foreground">{bill.billingAddress.name}</p>
                        <p className="text-sm text-muted-foreground mt-2">{bill.billingAddress.address}</p>
                        <p className="text-sm text-muted-foreground">
                            {bill.billingAddress.phone} | {bill.billingAddress.email}
                        </p>
                        <p className="text-sm font-medium text-foreground mt-2">SIRET: {bill.billingAddress.siret}</p>
                        <p className="text-sm font-medium text-foreground">VAT: {bill.billingAddress.vat}</p>
                    </div>


                    <div>
                        <p className="text-sm text-muted-foreground mb-2">Note</p>
                        <p className="text-sm text-foreground">{bill.note}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
