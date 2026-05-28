import { useCart } from '../context/CartContext';
import { FaTimes, FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const CartDrawer = () => {
    const { isCartOpen, setIsCartOpen, cartItems, cartTotal, updateQuantity, removeFromCart } = useCart();

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                        onClick={() => setIsCartOpen(false)}
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[101] shadow-2xl flex flex-col"
                    >
                        <div className="p-6 border-b flex justify-between items-center bg-white">
                            <h2 className="text-2xl font-bold text-green-700 flex items-center">
                                Your Cart <span className="ml-2 text-sm font-normal text-gray-400">({cartItems.length} items)</span>
                            </h2>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <FaTimes size={24} className="text-gray-400" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                            {cartItems.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center">
                                    <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6">
                                        <span className="text-5xl text-green-200">🛒</span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Your cart is empty</h3>
                                    <p className="text-gray-500 mb-8 max-w-[250px]">Looks like you haven't added any fresh farm products yet.</p>
                                    <button
                                        onClick={() => setIsCartOpen(false)}
                                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-bold transition-all transform active:scale-95"
                                    >
                                        Start Shopping
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {cartItems.map((item) => (
                                        <motion.div
                                            layout
                                            key={item.id}
                                            className="flex gap-4 p-3 bg-gray-50 rounded-xl relative overflow-hidden group border border-transparent hover:border-green-100 transition-colors"
                                        >
                                            <img
                                                src={item.images?.[0] || item.image}
                                                alt={item.name}
                                                className="w-24 h-24 object-cover rounded-lg shadow-sm"
                                            />
                                            <div className="flex-1 flex flex-col justify-between py-1">
                                                <div>
                                                    <div className="flex justify-between items-start">
                                                        <h3 className="font-bold text-gray-800 leading-tight">{item.name}</h3>
                                                        <button
                                                            onClick={() => removeFromCart(item.id)}
                                                            className="text-gray-400 hover:text-red-500 transition-colors"
                                                        >
                                                            <FaTrash size={14} />
                                                        </button>
                                                    </div>
                                                    <p className="text-green-600 font-black text-lg">₹{item.price}</p>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center bg-white rounded-lg shadow-sm border overflow-hidden">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, -1)}
                                                            className="w-8 h-8 flex items-center justify-center hover:bg-green-50 transition-colors text-green-700"
                                                        >
                                                            <FaMinus size={10} />
                                                        </button>
                                                        <span className="w-10 text-center font-bold text-gray-700">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, 1)}
                                                            className="w-8 h-8 flex items-center justify-center hover:bg-green-50 transition-colors text-green-700"
                                                        >
                                                            <FaPlus size={10} />
                                                        </button>
                                                    </div>
                                                    <span className="font-bold text-gray-400">Total: ₹{(item.price * item.quantity).toFixed(0)}</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {cartItems.length > 0 && (
                            <div className="p-6 border-t bg-white shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
                                <div className="space-y-2 mb-6">
                                    <div className="flex justify-between text-gray-500">
                                        <span>Subtotal</span>
                                        <span>₹{cartTotal.toFixed(0)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-500">
                                        <span>Shipping</span>
                                        <span className="text-green-600 font-semibold uppercase text-xs">Calculated at checkout</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-2 border-t">
                                        <span className="font-bold text-gray-800 text-lg">Grand Total</span>
                                        <span className="text-3xl font-black text-green-700">₹{cartTotal.toFixed(0)}</span>
                                    </div>
                                </div>
                                <Link
                                    to="/checkout"
                                    className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-black text-lg flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-lg shadow-green-200"
                                    onClick={() => setIsCartOpen(false)}
                                >
                                    Confirm Order
                                </Link>
                                <button
                                    onClick={() => setIsCartOpen(false)}
                                    className="w-full text-center py-3 text-gray-400 hover:text-green-600 font-semibold text-sm transition-colors mt-2"
                                >
                                    Keep Shopping
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
