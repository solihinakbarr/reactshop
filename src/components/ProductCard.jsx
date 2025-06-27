import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
    const { addToCart } = useCart();

    return (
        <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-4">
            <img src={product.image} alt={product.name} className="rounded mb-2" />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-green-600 font-bold">Rp {product.price.toLocaleString()}</p>
            <div className="mt-4 space-x-2">
                <Link to={`/product/${product.id}`}>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Detail
                    </button>
                </Link>
                <button
                    onClick={() => addToCart(product)}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Tambah
                </button>
            </div>
        </div>
    );
}
