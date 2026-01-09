import type { IOffer } from "./IOffer"

export interface IProduct {
  _id: string
  name: string
  price: number
  category: string
  imageUrl: string
  active: boolean
  offers: IOffer[]
}