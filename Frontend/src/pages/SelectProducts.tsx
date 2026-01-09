"use client"

import { useEffect, useState } from "react"
import { Search, ChevronLeft, Trash2, Plus, Minus } from "lucide-react"
import type { IProduct } from "../types/IProduct"
import api from "../services/api"
import { useNavigate } from "react-router-dom";


interface CartItem extends IProduct {
    quantity: number
}

export default function SelectProducts() {
    const [selectedCategory, setSelectedCategory] = useState("Burgers")
    const [searchQuery, setSearchQuery] = useState("")
    const [cart, setCart] = useState<CartItem[]>([])
    const [products, setProducts] = useState<IProduct[]>([])

    const categories = ["Snacks", "Burgers", "Drinks"]
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const data = await api.get("/products")
            setProducts(data.data.data)
        }
        fetchData()
    }, [])

    const filteredProducts = products.filter((product) => {
        const matchesCategory = selectedCategory === "Meals" || product.category === selectedCategory
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    const addToCart = (product: IProduct) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item._id === product._id)
            if (existingItem) {
                return prevCart.map((item) => (item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item))
            }
            return [...prevCart, { ...product, quantity: 1 }]
        })
    }

    const removeFromCart = (productId: string) => {
        setCart((prevCart) => prevCart.filter((item) => item._id !== productId))
    }

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity === 0) {
            removeFromCart(productId)
            return
        }
        setCart((prevCart) => prevCart.map((item) => (item._id === productId ? { ...item, quantity } : item)))
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

    const caluculateBilling = async () => {
        try {
            const items = cart.map(i => ({ productId: i._id, quantity: i.quantity }))

            const res = await api.post('/bill/calculate', { items })

            if (res.data.success) {
                navigate("/billing", {
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
        <div className="flex flex-col h-screen bg-gray-100 md:flex-row">

            <div className="md:hidden flex items-center justify-between bg-white px-4 py-3 border-b border-gray-200">
                <div className="flex items-center gap-2">
                    <ChevronLeft size={24} className="text-gray-700" />
                    <h1 className="text-lg font-semibold text-gray-800">New Order</h1>
                </div>
            </div>


            <div className="hidden md:flex w-40 bg-white p-4 flex flex-col gap-4 border-r border-gray-200">

                <div className="flex flex-col gap-3">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-colors ${selectedCategory === category
                                ? "bg-[#002d4a] text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            <span className="text-2xl">🍽️</span>
                            <span className="font-medium text-sm">{category}</span>
                        </button>
                    ))}
                </div>
            </div>


            <div className="flex-1 flex flex-col overflow-hidden md:p-6 pb-20 md:pb-6">
  
                <div className="md:hidden px-4 py-4 border-b border-gray-200 bg-white">
                    <div className="flex gap-3 overflow-x-auto pb-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`flex items-center justify-center gap-1 py-2 px-3 rounded-lg transition-colors whitespace-nowrap flex-shrink-0 ${selectedCategory === category ? "bg-[#002d4a] text-white" : "bg-gray-100 text-gray-700"
                                    }`}
                            >
                                <span className="text-lg">🍽️</span>
                                <span className="font-medium text-xs">{category}</span>
                            </button>
                        ))}
                    </div>
                </div>


                <div className="px-4 md:px-0 py-4 md:py-0 md:mb-6">
                    <div className="relative">
                        <Search className="absolute left-4 top-3 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-2 rounded-lg bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#002d4a]"
                        />
                    </div>
                </div>

 
                <div className="flex-1 overflow-auto px-4 md:px-0">
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredProducts.map((product) => (
                            <div
                                key={product._id}
                                className="bg-white rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
                                onClick={() => addToCart(product)}
                            >
                                <div className="bg-gray-200 rounded-lg h-32 md:h-48 mb-3 md:mb-4 flex items-center justify-center overflow-hidden">
                                    <img
                                        src={product.imageUrl || "/placeholder.svg"}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="text-center">
                                    <p className="text-gray-600 text-xs md:text-sm font-semibold mb-1 md:mb-2">
                                        ₹{product.price.toFixed(2)}
                                    </p>
                                    <p className="text-gray-800 font-bold text-xs md:text-sm leading-tight">{product.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            <div className="hidden md:flex w-80 bg-white p-6 flex flex-col gap-4 border-l border-gray-200 overflow-auto">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-800">New Order</h2>
                    {cart.length > 0 && (
                        <button onClick={() => setCart([])} className="text-gray-400 hover:text-red-500">
                            <Trash2 size={20} />
                        </button>
                    )}
                </div>


                <div className="flex-1 flex flex-col gap-4 overflow-auto">
                    {cart.length === 0 ? (
                        <p className="text-gray-400 text-center py-8">No items in cart</p>
                    ) : (
                        cart.map((item) => (
                            <div key={item._id} className="flex gap-3 border-b border-gray-200 pb-4">
                                <img
                                    src={item.imageUrl || "/placeholder.svg"}
                                    alt={item.name}
                                    className="w-16 h-16 rounded-lg object-cover"
                                />
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-800 text-sm">{item.name}</p>
                                    <p className="text-[#002d4a] font-bold text-sm">₹{item.price.toFixed(2)}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <button
                                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                            className="w-6 h-6 rounded-full bg-[#002d4a] text-white flex items-center justify-center hover:bg-[#00213a]"
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span className="text-gray-700 font-semibold text-sm w-8 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                            className="w-6 h-6 rounded-full bg-[#002d4a] text-white flex items-center justify-center hover:bg-[#00213a]"
                                        >
                                            <Plus size={14} />
                                        </button>
                                        <button
                                            onClick={() => removeFromCart(item._id)}
                                            className="ml-auto text-gray-300 hover:text-red-500"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>


                {cart.length > 0 && (
                    <button className="w-full bg-[#002d4a] text-white py-3 rounded-lg font-bold text-lg hover:bg-[#00213a] transition-colors flex items-center justify-between px-4"
                        onClick={caluculateBilling}
                    >
                        <span>₹{total.toFixed(2)}</span>
                        <span className="flex items-center gap-2">
                            Pay <ChevronLeft size={20} className="rotate-180" />
                        </span>
                    </button>
                )}
            </div>


            {cart.length > 0 && (
                <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#002d4a] text-white py-3 px-4">
                    <button className="w-full bg-[#002d4a] text-white py-3 rounded-lg font-bold text-lg hover:bg-[#00213a] transition-colors flex items-center justify-between px-4 border-t border-[#00213a]">
                        <span className="text-lg">${total.toFixed(2)}</span>
                        <span className="flex items-center gap-2">
                            Checkout <ChevronLeft size={20} className="rotate-180" />
                        </span>
                    </button>
                </div>
            )}
        </div>
    )
}
