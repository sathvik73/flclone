import React, { useEffect, useState } from 'react';
import api from '../api';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Lock, Star } from 'lucide-react';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.get(`/products/${id}`);
                setProduct(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const addToCart = async () => {
        try {
            await api.post('/cart', {
                productId: product.id,
                quantity: 1
            });
            navigate('/cart');
        } catch (error) {
            console.error(error);
            alert('Failed to add to cart');
        }
    };

    if (loading || !product) return <div>Loading...</div>;

    return (
        <div className="bg-white min-h-screen pb-10">
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Left: Images */}
                    <div className="flex-1 max-w-[500px] sticky top-20 h-fit">
                        <div className="flex gap-4">
                            <div className="flex flex-col gap-2">
                                {[product.image_url].map((img, i) => (
                                    <div key={i} className="border border-amazon-orange rounded p-1 cursor-pointer hover:shadow-md">
                                        <img src={img} alt="" className="w-10 h-10 object-contain" />
                                    </div>
                                ))}
                            </div>
                            <div className="flex-1 flex justify-center">
                                <img src={product.image_url} alt={product.title} className="max-h-[500px] object-contain" />
                            </div>
                        </div>
                    </div>

                    {/* Center: Details */}
                    <div className="flex-[1.5]">
                        <h1 className="text-2xl font-medium text-gray-900 mb-2">{product.title}</h1>
                        <Link to="/" className="text-sm text-amazon-blue hover:underline mb-2 block">Visit the {product.brand || 'Amazon'} Store</Link>

                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex text-amazon-yellow text-sm">★★★★☆</div>
                            <span className="text-sm text-amazon-blue hover:underline cursor-pointer">{product.review_count} ratings</span>
                        </div>

                        <div className="border-t border-b border-gray-200 py-4 my-2">
                            <div className="flex items-baseline gap-2">
                                <span className="text-red-700 text-2xl font-light">-{product.discount_percentage}%</span>
                                <span className="text-xs align-top">₹</span>
                                <span className="text-3xl font-medium">{Math.floor(product.price).toLocaleString()}</span>
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                                M.R.P.: <span className="line-through">₹{Number(product.original_price).toLocaleString()}</span>
                            </div>
                            <div className="text-sm text-gray-900 font-medium">Inclusive of all taxes</div>
                        </div>

                        <div className="py-4">
                            <h3 className="font-bold mb-2">About this item</h3>
                            <ul className="list-disc pl-5 text-sm space-y-1">
                                <li>{product.description}</li>
                                <li>Resolution: 4K Ultra HD (3840x2160) | Refresh Rate: 60 Hertz</li>
                                <li>Connectivity: 3 HDMI ports to connect set top box, Blu Ray players, gaming console | 2 USB ports to connect hard drives and other USB devices</li>
                                <li>Sound : 20 Watts Output | Dolby Audio</li>
                            </ul>
                        </div>
                    </div>

                    {/* Right: Buy Box */}
                    <div className="flex-1 max-w-[300px]">
                        <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm sticky top-20">
                            <div className="flex items-baseline gap-1 mb-2">
                                <span className="text-xs align-top">₹</span>
                                <span className="text-2xl font-medium">{Math.floor(product.price).toLocaleString()}</span>
                                <span className="text-xs align-top">00</span>
                            </div>

                            <div className="text-sm text-amazon-blue hover:underline mb-2">FREE delivery</div>
                            <div className="text-sm mb-4">
                                <span className="text-green-700 font-medium">In stock</span>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-amazon-blue mb-4">
                                <MapPin className="w-4 h-4 text-gray-500" />
                                <span>Deliver to Mumbai 400001</span>
                            </div>

                            <div className="space-y-3">
                                <button
                                    onClick={addToCart}
                                    className="w-full bg-amazon-yellow hover:bg-yellow-400 rounded-full py-2 text-sm font-medium shadow-sm transition-colors"
                                >
                                    Add to Cart
                                </button>
                                <button className="w-full bg-amazon-orange hover:bg-orange-400 rounded-full py-2 text-sm font-medium shadow-sm transition-colors">
                                    Buy Now
                                </button>
                            </div>

                            <div className="flex items-center gap-2 text-xs text-gray-500 mt-4">
                                <Lock className="w-3 h-3" />
                                <span>Secure transaction</span>
                            </div>

                            <div className="text-xs mt-3 space-y-1">
                                <div className="grid grid-cols-2">
                                    <span className="text-gray-500">Ships from</span>
                                    <span>Amazon</span>
                                </div>
                                <div className="grid grid-cols-2">
                                    <span className="text-gray-500">Sold by</span>
                                    <span className="text-amazon-blue">Appario Retail Private Ltd</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
