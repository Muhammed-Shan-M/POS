import { IOffer } from "../models/product.model";



export const getBestOffer = (offers: IOffer[], quantity: number): IOffer | null => {

    if (!offers || offers.length === 0) return null;

    const applicableOffers = offers
        .filter((offer) => offer.active && quantity >= offer.minQty)
        .sort((a, b) => a.priority - b.priority);

    return applicableOffers.length > 0 ? applicableOffers[0] : null;
};


export const calculatePercentageDiscount = (unitPrice: number, quantity: number, percentage: number): number => {

    const subtotal = unitPrice * quantity;
    return Number(((subtotal * percentage) / 100).toFixed(2));

};


export const calculateBogoDiscount = (unitPrice: number, quantity: number): number => {

    const freeItems = Math.floor(quantity / 2);
    return Number((freeItems * unitPrice).toFixed(2));
    
};