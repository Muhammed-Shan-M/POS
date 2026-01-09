export interface IOffer {
  type: "BOGO" | "PERCENTAGE"
  value: number
  minQty: number
  priority: number
  active: boolean
}

