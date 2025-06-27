import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
    const {
        cartItems,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
    } = useCart();

    if (cartItems.length === 0) {
        return <div className="p-6">Keranjang kosong.</div>;
    }

    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const handleCheckout = async () => {
        const order_id = "ORDER-" + Date.now();
        const gross_amount = cartItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );

        const items = cartItems.map((item) => ({
            id: item.id,
            price: item.price,
            quantity: item.quantity,
            name: item.name,
        }));

        const res = await fetch("http://localhost:5000/create-transaction", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ order_id, gross_amount, items }),
        });

        const data = await res.json();

        if (data.token) {
            window.snap.pay(data.token, {
                onSuccess: function (result) {
                    alert("Pembayaran berhasil!");
                    clearCart();
                },
                onPending: function (result) {
                    alert("Menunggu pembayaran...");
                },
                onError: function (result) {
                    alert("Pembayaran gagal.");
                },
            });
        } else {
            alert("Gagal membuat transaksi.");
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Isi Keranjang</h1>
            <ul className="space-y-4">
                {cartItems.map((item) => (
                    <li
                        key={item.id}
                        className="flex justify-between items-center bg-white p-4 rounded shadow"
                    >
                        <div>
                            <h2 className="font-bold">{item.name}</h2>
                            <p className="text-sm text-gray-600">
                                Rp {item.price.toLocaleString()} x {item.quantity}
                            </p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => decreaseQty(item.id)}
                                className="bg-gray-300 px-2 py-1 rounded"
                            >
                                -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                                onClick={() => increaseQty(item.id)}
                                className="bg-gray-300 px-2 py-1 rounded"
                            >
                                +
                            </button>
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-500 hover:text-red-700 ml-4"
                            >
                                Hapus
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="mt-6 text-right font-bold text-xl">
                Total: Rp {total.toLocaleString()}
            </div>

            <div className="mt-4 text-right">
                <button
                    onClick={clearCart}
                    className="px-4 py-2 mr-4 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Kosongkan
                </button>
                <button
                    onClick={handleCheckout}
                    className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                    Checkout Sekarang
                </button>

            </div>
        </div>
    );
}
