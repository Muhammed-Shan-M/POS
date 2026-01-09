
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import {
    ArrowLeft,
    Trash2,
    Minus,
    Plus,
    ChevronRight,
    ChevronDown,
    ChevronUp,
} from "lucide-react"
import api from "../services/api"

export interface CartItem {
    productId: string
    name: string
    unitPrice: number
    quantity: number
    image?: string
    offerApplied?: string
    discountAmount: number
    finalPrice: number
}

interface BillData {
    items: CartItem[]
    subtotal: number
    totalDiscount: number
    finalTotal: number
}

export default function CheckoutPage() {
    const [currentView, setCurrentView] = useState<"checkout" | "payment">("checkout")
    const location = useLocation()
    const navigate = useNavigate()


    const [cart, setCart] = useState<BillData | null>(
        location.state?.billData || null
    )

    const [expandOffers, setExpandOffers] = useState(false)


    if (!cart || cart.items.length === 0) {
        navigate("/")
        return null
    }


    const updateQuantity = async (productId: string, delta: number) => {
        const updatedItems = cart.items.map(item =>
            item.productId === productId
                ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                : item
        )

        const payload = updatedItems.map(i => ({
            productId: i.productId,
            quantity: i.quantity,
        }))

        const res = await api.post("/bill/calculate", {
            items: payload,
        })

        setCart(res.data.data)
    }


    const removeItem = async (productId: string) => {
        const updatedItems = cart.items.filter(i => i.productId !== productId)

        if (updatedItems.length === 0) {
            navigate("/")
            return
        }

        const payload = updatedItems.map(i => ({
            productId: i.productId,
            quantity: i.quantity,
        }))

        const res = await api.post("/bill/calculate", {
            items: payload,
        })

        setCart(res.data.data)
    }


    const subtotal = cart.subtotal
    const totalDiscount = cart.totalDiscount
    const total = cart.finalTotal

    const appliedOffers = cart.items
        .filter(item => item.offerApplied)
        .map(item => ({
            productName: item.name,
            offerName: item.offerApplied!,
            discount: item.discountAmount,
        }))

    const finalizeBill = async () => {
        try {
            const res = await api.post('/bill/finalize', cart)
            
            if (res.data.success) {
                navigate('/finalBill', {
                    state: {
                        billData: res.data.data
                    }
                })
            }

        } catch (error) {
            console.log(error)
        }
    }



    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">

            <div className={`flex-1 flex flex-col ${currentView === "payment" ? "hidden md:flex" : "flex"} transition-all`}>

                <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between md:hidden">
                    <ArrowLeft className="w-5 h-5" />
                    <h1 className="text-lg font-semibold">Checkout</h1>
                    <Trash2 className="w-5 h-5 text-red-500" />
                </div>

                <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4">
                    <h2 className="text-xl font-bold mb-4 hidden md:block">Cart Items</h2>
                    <div className="space-y-3">
                        {cart.items.map((item) => (
                            <div key={item.productId} className="bg-white rounded-lg p-3 flex gap-3 md:gap-4 border border-gray-200">

                                <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
                                    <img
                                        src={item.image || "/placeholder.svg"}
                                        alt={item.name}
                                        width={80}
                                        height={80}
                                        className="w-full h-full object-cover rounded"
                                    />
                                </div>


                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-semibold text-sm md:text-base">{item.name}</h3>
                                        <p className="text-gray-600 text-sm md:text-base">${item.unitPrice.toFixed(2)}</p>
                                    </div>


                                    <div className="flex items-center gap-2 flex-wrap">
                                        <button
                                            onClick={() => updateQuantity(item.productId, -1)}
                                            className="bg-[#0f3a4d] text-white rounded-full p-1"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="font-semibold w-6 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.productId, 1)}
                                            className="bg-[#0f3a4d] text-white rounded-full p-1"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>

                                        {item.offerApplied && (
                                            <span className="bg-pink-500 text-white text-xs md:text-sm font-semibold px-3 py-1 rounded-full">
                                                {item.offerApplied}
                                            </span>
                                        )}
                                    </div>
                                </div>


                                <button onClick={() => removeItem(item.productId)} className="text-gray-400 hover:text-red-500">
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>


                <div className="bg-white border-t border-gray-200 p-4 md:hidden sticky bottom-0">
                    <button
                        onClick={() => setCurrentView("payment")}
                        className="w-full bg-[#0f3a4d] text-white py-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-[#0d2d3a]">
                        <span className="text-lg">${total.toFixed(2)}</span>
                        <span>Continue to Payment</span>
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>


            <div
                className={`flex-1 flex flex-col ${currentView === "checkout" ? "hidden md:flex" : "flex"} bg-white md:border-l md:border-gray-200 transition-all`}
            >

                <div className="bg-white border-b border-gray-200 px-4 md:px-6 py-4 flex items-center justify-between md:block">
                    <button
                        onClick={() => setCurrentView("checkout")}
                        className="flex items-center gap-2 md:hidden hover:text-gray-600">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-semibold">Back</span>
                    </button>
                    <h1 className="text-xl font-bold text-center md:text-left">Payment</h1>
                    <div className="w-8" />
                </div>

                <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6 space-y-6">
                    <div>
                        <p className="text-gray-600 text-sm md:text-base">Bill No #101</p>
                    </div>

                    <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                        <p className="text-gray-700 font-medium">Sub Total</p>
                        <p className="font-semibold text-lg">${subtotal.toFixed(2)}</p>
                    </div>


                    <div className="border border-gray-200 rounded-lg">
                        <button
                            onClick={() => setExpandOffers(!expandOffers)}
                            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition">
                            <span className="font-semibold text-gray-900">Offers Applied</span>
                            {expandOffers ? <ChevronUp className="w-5 h-5 text-gray-600" /> : <ChevronDown className="w-5 h-5 text-gray-600" />}
                        </button>

                        {expandOffers && (
                            <div className="border-t border-gray-200 divide-y divide-gray-200">
                                {appliedOffers.length > 0 ? (
                                    appliedOffers.map((offer, idx) => (
                                        <div key={idx} className="p-4 bg-blue-50 flex items-center justify-between">
                                            <div className="flex flex-col gap-1">
                                                <span className="font-semibold text-gray-900 text-sm">{offer.productName}</span>
                                                <span className="inline-block w-fit px-3 py-1 border border-blue-500 text-blue-600 text-xs font-medium rounded-full">
                                                    {offer.offerName}
                                                </span>
                                            </div>
                                            <span className="text-red-600 font-semibold">-${offer.discount.toFixed(2)}</span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-4 text-gray-600 text-sm">No offers applied</div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="flex justify-between items-center font-semibold text-lg py-4 border-b border-gray-200">
                        <span>Total Discount</span>
                        <span className="text-red-600">-${totalDiscount.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between items-center font-bold text-xl">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>

                <div className="bg-white border-t border-gray-200 p-4 md:px-6 md:py-6 sticky bottom-0">
                    <button className="w-full bg-[#0f3a4d] text-white py-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-[#0d2d3a]"
                        onClick={finalizeBill}
                    >
                        <span>Complete</span>
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    )
}
