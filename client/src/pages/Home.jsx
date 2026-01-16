import React, { useEffect, useState } from 'react';
import api from '../api';
import { useSearchParams, Link } from 'react-router-dom';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get('search');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let url = '/products';
                if (searchTerm) url += `?search=${searchTerm}`;
                const response = await api.get(url);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, [searchTerm]);

    return (
        <div className="bg-amazon-bg min-h-screen relative">
            {/* Hero Section (Carousel Placeholder) */}
            <div className="relative">
                <div className="h-[250px] md:h-[350px] bg-gradient-to-t from-amazon-bg to-transparent absolute bottom-0 w-full z-10"></div>
                <img
                    src="https://m.media-amazon.com/images/I/61lwJy4B8PL._SX3000_.jpg"
                    alt="Hero"
                    className="w-full h-[250px] md:h-[600px] object-cover mask-image-b"
                />
            </div>

            {/* Product Grid */}
            <div className="container mx-auto px-4 relative z-20 -mt-20 md:-mt-60">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Category Cards (Static Demo) */}
                    <div className="bg-white p-4 z-30 shadow-sm col-span-1 md:col-span-2 lg:col-span-1 min-h-[420px] flex flex-col">
                        <h2 className="text-xl font-bold mb-4">Revamp your home in style</h2>
                        <div className="grid grid-cols-2 gap-4 flex-1">
                            {['Cushion covers', 'Figurines', 'Home storage', 'Lighting'].map((item, i) => (
                                <div key={i} className="flex flex-col">
                                    <img src={`https://picsum.photos/seed/${100 + i}/300/300`} alt={item} className="h-full object-cover mb-1" />
                                    <span className="text-xs text-gray-700">{item}</span>
                                </div>
                            ))}
                        </div>
                        <a href="#" className="text-amazon-blue text-sm hover:underline mt-4 cursor-pointer">Explore all</a>
                    </div>

                    {/* Product Cards */}
                    {products.map(product => (
                        <div key={product.id} className="bg-white p-4 z-30 shadow-sm flex flex-col justify-between">
                            <h2 className="text-xl font-bold mb-4 line-clamp-1">{product.title}</h2>
                            <Link to={`/product/${product.id}`} className="flex-1 flex items-center justify-center p-4 cursor-pointer">
                                <img src={product.image_url} alt={product.title} className="max-h-[250px] object-contain max-w-full" />
                            </Link>
                            <div className="mt-2">
                                <Link to={`/product/${product.id}`} className="text-sm font-medium text-gray-900 hover:text-amazon-orange line-clamp-2 mb-1 cursor-pointer">
                                    {product.title}
                                </Link>
                                <div className="flex items-center gap-1 mb-1">
                                    <div className="flex text-yellow-500 text-sm">★★★★☆</div>
                                    <span className="text-xs text-amazon-blue hover:underline cursor-pointer">{product.review_count}</span>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-xs align-top">₹</span>
                                    <span className="text-2xl font-medium">{Math.floor(product.price).toLocaleString()}</span>
                                    <span className="text-xs align-top">00</span>
                                    {product.original_price && (
                                        <span className="text-xs text-gray-500 line-through ml-2">M.R.P: ₹{Number(product.original_price).toLocaleString()}</span>
                                    )}
                                </div>
                                {product.is_prime && (
                                    <div className="text-xs text-cyan-600 font-bold italic mt-1">✓prime</div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-8"></div>
        </div>
    );
};

export default Home;
