import { useParams } from "react-router-dom";
import products from "../data/products";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
    const { id } = useParams();
    const product = products.find((p) => p.id === parseInt(id));
    const { addToCart } = useCart();

    if (!product) return <div>Produk tidak ditemukan</div>;

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <img src={product.image} className="rounded-lg w-full mb-4" />
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-gray-700 mt-2">{product.description}</p>
            <p className="text-xl font-bold text-green-600 mt-4">Rp {product.price.toLocaleString()}</p>
            <button
                onClick={() => addToCart(product)}
                className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
                Tambah ke Keranjang
            </button>
        </div>
    );
}
