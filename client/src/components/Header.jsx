import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/?search=${searchTerm}`);
        }
    };

    return (
        <header className="bg-amazon-dark text-white sticky top-0 z-50 shadow-md">
            {/* Top Row */}
            <div className="flex items-center gap-4 p-2 pl-4 h-[60px]">
                {/* Logo */}
                <Link to="/" className="flex items-center pt-2 border border-transparent hover:border-white rounded-sm p-1 cursor-pointer">
                    <span className="font-bold text-2xl tracking-tighter">amazon</span>
                    <span className="text-xs self-start pt-1">.in</span>
                </Link>

                {/* Address (Hidden on mobile) */}
                <div className="hidden md:flex flex-col leading-tight border border-transparent hover:border-white rounded-sm p-1 cursor-pointer">
                    <span className="text-[12px] text-gray-300 ml-4">Delivering to Mumbai 400001</span>
                    <div className="flex items-center font-bold text-sm">
                        <MapPin className="w-4 h-4 -ml-4 mr-1" />
                        <span>Update location</span>
                    </div>
                </div>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="flex-1 flex h-[40px] rounded overflow-hidden focus-within:ring-3 focus-within:ring-amazon-orange">
                    <div className="bg-gray-100 w-12 flex items-center justify-center text-gray-600 text-xs border-r border-gray-300 cursor-pointer hover:bg-gray-200">
                        All
                    </div>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1 px-3 text-black outline-none"
                        placeholder="Search Amazon.in"
                    />
                    <button type="submit" className="bg-amazon-orange hover:bg-amazon-yellow w-12 flex items-center justify-center text-black">
                        <Search className="w-6 h-6" />
                    </button>
                </form>

                {/* Right Links */}
                <div className="hidden md:flex flex-col leading-tight border border-transparent hover:border-white rounded-sm p-1 cursor-pointer">
                    <span className="text-[12px]">Hello, sign in</span>
                    <span className="font-bold text-sm">Account & Lists</span>
                </div>

                <div className="hidden md:flex flex-col leading-tight border border-transparent hover:border-white rounded-sm p-1 cursor-pointer">
                    <span className="text-[12px]">Returns</span>
                    <span className="font-bold text-sm">& Orders</span>
                </div>

                <Link to="/cart" className="flex items-end border border-transparent hover:border-white rounded-sm p-2 cursor-pointer relative">
                    <ShoppingCart className="w-8 h-8" />
                    <span className="font-bold text-amazon-orange mb-1">0</span>
                    <span className="font-bold text-sm mb-1 ml-1">Cart</span>
                </Link>
            </div>

            {/* Bottom Row */}
            <div className="bg-amazon-light h-[40px] flex items-center px-4 gap-4 text-sm font-medium overflow-x-auto text-white">
                <div className="flex items-center gap-1 cursor-pointer hover:border hover:border-white p-1 rounded-sm">
                    <Menu className="w-6 h-6" />
                    <span className="font-bold">All</span>
                </div>
                {['Amazon miniTV', 'Sell', 'Best Sellers', 'Mobiles', 'Today\'s Deals', 'Electronics', 'Prime', 'New Releases', 'Home & Kitchen'].map(item => (
                    <span key={item} className="whitespace-nowrap cursor-pointer hover:border hover:border-white p-1 rounded-sm px-2">{item}</span>
                ))}
            </div>
        </header>
    );
};

export default Header;
