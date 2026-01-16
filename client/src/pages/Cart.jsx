import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const response = await api.get('/cart');
            setCartItems(response.data.items);
            setTotalAmount(response.data.totalAmount);
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    const updateQuantity = async (id, newQty) => {
        if (newQty < 1) return;
        try {
            await api.put(`/cart/${id}`, { quantity: newQty });
            fetchCart();
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const removeItem = async (id) => {
        try {
            await api.delete(`/cart/${id}`);
            fetchCart();
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    return (
        <div className="bg-amazon-bg min-h-screen p-4 md:p-8">
            <div className="container mx-auto flex flex-col md:flex-row gap-6">
                {/* Cart Items */}
                <div className="flex-1 bg-white p-6 shadow-sm">
                    <h1 className="text-2xl font-medium border-b pb-2 mb-4">Shopping Cart</h1>
                    {cartItems.length === 0 ? (
                        <p>Your Amazon Cart is empty.</p>
                    ) : (
                        <div className="space-y-6">
                            {cartItems.map(item => (
                                <div key={item.id} className="flex gap-4 border-b pb-4 last:border-0 relative">
                                    <img src={item.image_url} alt={item.title} className="w-[150px] h-[150px] object-contain" />
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <h3 className="text-lg font-medium text-black line-clamp-2 md:w-[70%] leading-snug">
                                                {item.title}
                                            </h3>
                                            <div className="text-right">
                                                <span className="font-bold text-lg">₹{Math.floor(item.price).toLocaleString()}.00</span>
                                            </div>
                                        </div>
                                        <div className="text-green-700 text-xs mt-1">In Stock</div>
                                        <div className="text-xs text-gray-500 mt-1">Eligible for FREE Shipping</div>
                                        <div className="flex items-center gap-4 mt-2">
                                            <div className="flex items-center border border-gray-300 rounded bg-gray-100 shadow-sm text-sm">
                                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 bg-gray-200 hover:bg-gray-300 border-r border-gray-300">-</button>
                                                <div className="bg-white px-4 py-1">{item.quantity}</div>
                                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 bg-gray-200 hover:bg-gray-300 border-l border-gray-300">+</button>
                                            </div>
                                            <button onClick={() => removeItem(item.id)} className="text-xs text-amazon-blue hover:underline border-l border-gray-300 pl-4">Delete</button>
                                            <button className="text-xs text-amazon-blue hover:underline border-l border-gray-300 pl-4">Save for later</button>
                                            <button className="text-xs text-amazon-blue hover:underline border-l border-gray-300 pl-4">See more like this</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="text-right mt-4">
                        <span className="text-lg">Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items): </span>
                        <span className="text-lg font-bold">₹{totalAmount.toLocaleString()}.00</span>
                    </div>
                </div>

                {/* Checkout Sidebar */}
                {cartItems.length > 0 && (
                    <div className="w-full md:w-[300px] bg-white p-6 shadow-sm h-fit">
                        <div className="flex items-center gap-2 text-green-700 text-sm mb-4">
                            <CheckCircle2 className="w-5 h-5" />
                            <span>Your order matches your expectation</span>
                        </div>
                        <div className="text-lg mb-4">
                            Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items): <span className="font-bold">₹{totalAmount.toLocaleString()}.00</span>
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                            <input type="checkbox" id="gift" />
                            <label htmlFor="gift" className="text-sm">This order contains a gift</label>
                        </div>
                        <button
                            onClick={() => navigate('/checkout')}
                            className="w-full bg-amazon-yellow hover:bg-yellow-400 rounded-lg py-2 text-sm shadow-sm"
                        >
                            Proceed to Buy
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
