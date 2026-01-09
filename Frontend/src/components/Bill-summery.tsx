interface BillSummaryProps {
  subtotal: number
  totalDiscount: number
  finalTotal: number
}

export default function BillSummary({ subtotal, totalDiscount, finalTotal }: BillSummaryProps) {
  return (
    <div className="space-y-3 border-t border-border pt-6">
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">Sub Total</p>
        <p className="font-semibold text-foreground">₹{subtotal}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">Total Discount</p>
        <p className="font-semibold text-foreground">₹{totalDiscount}</p>
      </div>
      <div className="flex justify-between items-center border-t border-border pt-3">
        <p className="text-foreground font-semibold">Total Price</p>
        <p className="font-bold text-lg text-foreground">₹{finalTotal}</p>
      </div>
    </div>
  )
}
