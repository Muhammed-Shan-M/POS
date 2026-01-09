import { Request, Response } from "express"
import Product from "../models/product.model";
import Bill from "../models/bill.modal";
import { calculateBogoDiscount, calculatePercentageDiscount, getBestOffer } from "../services/offer.service";


export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find({ active: true }).lean();

        res.status(200).json({
            success: true,
            data: products
        });

    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch products"
        });
    }
}






export const calculateBill = async (req: Request, res: Response) => {
    try {
        const { items } = req.body;

        if (items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Items are required"
            });
        }

        console.log("ddd3",items)

        let subtotal = 0;
        let totalDiscount = 0;
        const billItems: any[] = [];


        for (const item of items) {

            const { productId, quantity } = item;

            if (!productId || quantity <= 0) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid product or quantity"
                });
            } []

            const product = await Product.findById(productId).lean();

            if (!product || !product.active) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found or inactive"
                });
            }

            const itemSubtotal = product.price * quantity;
            subtotal += itemSubtotal;

            let discount = 0;
            let offerApplied = null;

            const bestOffer = getBestOffer(product.offers, quantity);

            if (bestOffer) {
                if (bestOffer.type === "PERCENTAGE") {

                    discount = calculatePercentageDiscount(product.price, quantity, bestOffer.value)
                    offerApplied = `${bestOffer.value}% Discount`;

                }

                if (bestOffer.type === "BOGO") {

                    discount = calculateBogoDiscount(product.price, quantity)
                    offerApplied = "Buy 1 Get 1 Free";

                }
            }

            totalDiscount += discount;

            billItems.push({
                productId: product._id,
                name: product.name,
                unitPrice: product.price,
                quantity,
                offerApplied,
                discountAmount: discount,
                finalPrice: Number((itemSubtotal - discount).toFixed(2)),
                image:product.imageUrl
            });

        }


        const finalTotal = Number((subtotal - totalDiscount).toFixed(2))

        return res.status(200).json({
            success: true,
            data: {
                items: billItems,
                subtotal: Number(subtotal.toFixed(2)),
                totalDiscount: Number(totalDiscount.toFixed(2)),
                finalTotal
            }
        })


    } catch (error) {
        console.error("Bill calculation error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to calculate bill"
        });
    }
}




export const finalizeBill = async (req: Request, res: Response) => {
    try {
        const { items, subtotal, totalDiscount, finalTotal } = req.body;

        if (!items || !finalTotal) {
            return res.status(400).json({
                success: false,
                message: "Invalid bill data"
            });
        }

        const bill = await Bill.create({
            items,
            subtotal,
            totalDiscount,
            finalTotal
        });

        return res.status(201).json({
            success: true,
            data: {
                createdAt: bill.createdAt,
                finalTotal: bill.finalTotal,
                subtotal: bill.subtotal,
                items: bill.items,
                totalDiscount: bill.totalDiscount,
            }
        });

    } catch (error) {
        console.error("Finalize bill error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to finalize bill"
        });
    }
}


