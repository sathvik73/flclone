import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const navigate = useNavigate();
    const [address, setAddress] = useState({
        name: '',
        mobile: '',
        pincode: '',
        locality: '',
        address: '',
        city: '',
        state: ''
    });
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [orderId, setOrderId] = useState(null);

    const handleChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fullAddress = `${address.name}, ${address.mobile}, ${address.address}, ${address.locality}, ${address.city}, ${address.state} - ${address.pincode}`;

        try {
            const response = await api.post('/orders', {
                shippingAddress: fullAddress,
                paymentMethod: 'COD'
            });
            setOrderPlaced(true);
            setOrderId(response.data.orderId);
        } catch (error) {
            console.error(error);
            alert('Failed to place order');
        }
    };

    if (orderPlaced) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-white">
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="w-32 mb-8" />
                <div className="text-green-600 text-6xl mb-4">✓</div>
                <h2 className="text-2xl font-bold mb-2">Order Placed Successfully!</h2>
                <p className="text-gray-600 mb-6">Order ID: #{orderId}</p>
                <div className="text-center space-y-2">
                    <p>Thank you for shopping with us.</p>
                    <button onClick={() => navigate('/')} className="text-amazon-blue hover:underline">Continue Shopping</button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen">
            {/* Header */}
            <div className="flex items-center justify-between border-b bg-gray-100 p-4 shadow-sm mb-6">
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="w-24 mt-2" />
                <h1 className="text-2xl font-medium text-gray-700">Checkout</h1>
                <div className="w-24"></div>
            </div>

            <div className="container mx-auto px-4 max-w-3xl">
                <h2 className="text-xl font-bold text-amazon-orange mb-4">1. Select a delivery address</h2>

                <form onSubmit={handleSubmit} className="border border-gray-300 rounded p-6 space-y-4">
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold mb-1">Full Name</label>
                                <input required name="name" onChange={handleChange} className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-amazon-orange outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">Mobile number</label>
                                <input required name="mobile" onChange={handleChange} className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-amazon-orange outline-none" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-1">Pincode</label>
                            <input required name="pincode" onChange={handleChange} className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-amazon-orange outline-none w-[150px]" placeholder="6 digits [0-9] PIN code" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold mb-1">Flat, House no., Building, Company, Apartment</label>
                                <input required name="address" onChange={handleChange} className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-amazon-orange outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">Area, Street, Sector, Village</label>
                                <input required name="locality" onChange={handleChange} className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-amazon-orange outline-none" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold mb-1">Town/City</label>
                                <input required name="city" onChange={handleChange} className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-amazon-orange outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">State</label>
                                <input required name="state" onChange={handleChange} className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-amazon-orange outline-none" />
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-amazon-yellow hover:bg-yellow-400 rounded-lg py-2 mt-4 shadow-sm font-medium">Use this address</button>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
