import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

function App() {
    return (
        <Router>
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/product/:id" element={<ProductDetails />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                    </Routes>
                </main>

                <footer className="bg-amazon-light text-white text-center py-8 mt-auto">
                    <div className="bg-amazon-light brightness-125 py-4 mb-8 cursor-pointer hover:bg-opacity-90">
                        Back to top
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-left px-4">
                        <div>
                            <h3 className="font-bold mb-2">Get to Know Us</h3>
                            <ul className="text-sm space-y-1 text-gray-300">
                                <li className="hover:underline cursor-pointer">About Us</li>
                                <li className="hover:underline cursor-pointer">Careers</li>
                                <li className="hover:underline cursor-pointer">Press Releases</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold mb-2">Connect with Us</h3>
                            <ul className="text-sm space-y-1 text-gray-300">
                                <li className="hover:underline cursor-pointer">Facebook</li>
                                <li className="hover:underline cursor-pointer">Twitter</li>
                                <li className="hover:underline cursor-pointer">Instagram</li>
                            </ul>
                        </div>
                        {/* More columns... */}
                    </div>
                    <div className="mt-8 border-t border-gray-600 pt-8 text-sm text-gray-400">
                        © 1996-2024, Amazon.com, Inc. or its affiliates
                    </div>
                </footer>
            </div>
        </Router>
    );
}

export default App;
