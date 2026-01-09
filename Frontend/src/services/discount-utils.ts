export const calculatePercentageDiscount = (unitPrice: number, quantity: number, percentage: number): number => {
  const subtotal = unitPrice * quantity
  return Number(((subtotal * percentage) / 100).toFixed(2))
}

export const calculateBogoDiscount = (unitPrice: number, quantity: number): number => {
  const freeItems = Math.floor(quantity / 2)
  return Number((freeItems * unitPrice).toFixed(2))
}