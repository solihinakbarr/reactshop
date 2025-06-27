import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
    const { cartItems } = useCart();

    return (
        <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">
                🛍️ TokoKeren
            </Link>
            <div className="space-x-4">
                <Link to="/" className="hover:underline">Produk</Link>
                <Link to="/cart" className="relative hover:underline">
                    Keranjang
                    <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full px-2">
                        {cartItems.length}
                    </span>
                </Link>
            </div>
        </nav>
    );
}
