interface BillItem {
  productId: string
  name: string
  unitPrice: number
  quantity: number
  offerApplied?: string
  discountAmount: number
  finalPrice: number
}

interface BillItemsProps {
  items: BillItem[]
}

export default function BillItems({ items }: BillItemsProps) {
  return (
    <>

      <div className="md:hidden space-y-4">

        <div className="grid grid-cols-4 gap-2 text-xs text-muted-foreground font-semibold uppercase tracking-wide py-3 border-b border-border">
          <div>Article</div>
          <div>Unit Price</div>
          <div>Discount</div>
          <div className="text-right">Final</div>
        </div>


        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="border-b border-border pb-4">
              <div className="grid grid-cols-4 gap-2 items-center text-sm">
                <div className="font-semibold text-foreground truncate">{item.name}</div>
                <div className="text-foreground">₹{item.unitPrice}</div>
                <div className="text-foreground">₹{item.discountAmount}</div>
                <div className="text-right font-semibold text-foreground">₹{item.finalPrice}</div>
              </div>
            </div>
          ))}
        </div>
      </div>


      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-xs text-muted-foreground font-semibold uppercase tracking-wide py-4 px-3">
                No.
              </th>
              <th className="text-left text-xs text-muted-foreground font-semibold uppercase tracking-wide py-4 px-3">
                Article
              </th>
              <th className="text-left text-xs text-muted-foreground font-semibold uppercase tracking-wide py-4 px-3">
                Quantity
              </th>
              <th className="text-left text-xs text-muted-foreground font-semibold uppercase tracking-wide py-4 px-3">
                Unit Price
              </th>
              <th className="text-left text-xs text-muted-foreground font-semibold uppercase tracking-wide py-4 px-3">
                Offer
              </th>
              <th className="text-left text-xs text-muted-foreground font-semibold uppercase tracking-wide py-4 px-3">
                Discount Amount
              </th>
              <th className="text-right text-xs text-muted-foreground font-semibold uppercase tracking-wide py-4 px-3">
                Final Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="border-b border-border hover:bg-secondary/20 transition-colors">
                <td className="py-4 px-3 text-foreground font-medium">{index + 1}</td>
                <td className="py-4 px-3">
                  <div>
                    <p className="text-foreground font-semibold">{item.name}</p>
                    <p className="text-xs text-muted-foreground">Product Description</p>
                  </div>
                </td>
                <td className="py-4 px-3 text-foreground">
                  {item.quantity}
                  <div className="text-xs text-muted-foreground">Unit(s)</div>
                </td>
                <td className="py-4 px-3 text-foreground">₹{item.unitPrice}</td>
                <td className="py-4 px-3 text-foreground">{item.offerApplied || "Nill"}</td>
                <td className="py-4 px-3 text-foreground">₹{item.discountAmount}</td>
                <td className="py-4 px-3 text-right font-semibold text-foreground">₹{item.finalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
