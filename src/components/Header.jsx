import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="bg-white shadow p-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">TokoKu</Link>
            <Link to="/cart" className="text-blue-600 hover:underline">Keranjang 🛒</Link>
        </header>
    );
}
