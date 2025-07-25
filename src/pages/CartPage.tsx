import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // en haut de ton fichier
import { useCartStore } from '../store/cartStore';
import { X, MinusCircle, PlusCircle, ShoppingBag, ArrowLeft } from 'lucide-react';
import {useState} from "react";

const CartPage: React.FC = () => {
  const { items, removeFromCart, updateQuantity, getTotalPrice } = useCartStore();
  const isFormValid = () => {
    return (
        customerInfo.name.trim() &&
        customerInfo.email.trim() &&
        customerInfo.phone.trim() &&
        customerInfo.address.trim()
    );
  };

  if (items.length === 0) {
    return (
      <div className="pt-24 pb-16 container-custom">
        <div className="flex flex-col items-center justify-center text-center py-16">
          <ShoppingBag className="h-16 w-16 text-neutral-700 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-neutral-400 mb-8 max-w-md">
            Looks like you haven't added any custom gloves to your cart yet.
          </p>
          <button 
            onClick={() => window.location.href = "/customize"}
            className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-3 px-6 rounded-lg text-lg transition"
          >
            Acheter maintenant
          </button>
        </div>
      </div>
    );
  }
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const navigate = useNavigate();
  const handleCheckout = async () => {
    try {
      // 1. Générer le JSON à envoyer par mail
      const customerData = {
        customer: customerInfo,
        order: items.map((item) => ({
          name: "Custom Boxing Gloves", // ou item.name si dispo
          quantity: item.quantity,
          price: item.price,
        })),
        total: getTotalPrice(),
      };

      // 2. L’envoyer au backend pour l’envoi de mail
      await fetch(`${import.meta.env.VITE_API_URL}/send-order-mail`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customerData),
      });
      console.log("🧾 Infos client envoyées :", customerInfo);

      // 3. Créer la session Stripe
      const res = await fetch(`${import.meta.env.VITE_API_URL}/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, customer: customerInfo }),
      });

      const data = await res.json();
      if (data?.url) {
        sessionStorage.setItem('orderData', JSON.stringify(items));
        window.location.href = data.url;
      } else {
        alert("Erreur lors de la création de la session de paiement.");
      }

    } catch (err) {
      console.error("Erreur checkout :", err);
      alert("Impossible de procéder au paiement.");
    }
  };




  return (
    <div className="pt-24 pb-16 container-custom">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">Shopping Cart</h1>
        <Link to="/customize" className="text-neutral-400 hover:text-white flex items-center gap-2 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Continue Shopping
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-neutral-800 rounded-xl overflow-hidden">
            <div className="p-6">
              <div className="grid grid-cols-12 text-sm text-neutral-400 pb-4 border-b border-neutral-700">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              {items.map((item) => (
                <div 
                  key={item.id} 
                  className="grid grid-cols-12 items-start py-6 border-b border-neutral-700"
                >
                  <div className="col-span-6 flex gap-4">
                    <div className="bg-neutral-700 rounded-lg h-24 w-24 flex items-center justify-center overflow-hidden">
                      <div
                        className="h-16 w-16 rounded shadow-inner border border-white"
                        style={{
                          background: `linear-gradient(135deg, ${item.glove?.fingersColor?.hex || '#111'}, ${item.glove?.outerPalmColor?.hex || '#333'})`
                        }}
                        title="Glove preview"
                      />
                    </div>

                    <div>
                      <h3 className="font-semibold mb-1">Custom Boxing Gloves</h3>
                      <ul className="text-sm text-neutral-400 space-y-1">
                        <li>Size: {item.glove?.size || '—'}</li>
                        <li>Fingers: {item.glove?.fingersColor?.name || '—'}</li>
                        <li>Outer Palm: {item.glove?.outerPalmColor?.name || '—'}</li>
                        <li>Inner Palm: {item.glove?.innerPalmColor?.name || '—'}</li>
                        <li>Strap: {item.glove?.strapColor?.name || '—'}</li>
                        <li>Wrist: {item.glove?.wristColor?.name || '—'}</li>
                      </ul>

                      {/* ✅ Texts */}
                      {item.textZones && (
                        <div className="mt-2 text-xs text-neutral-400">
                          <p className="font-medium">Texts:</p>
                          <ul className="list-disc ml-4 space-y-1">
                            {Object.entries(item.textZones).map(([zone, text]) =>
                              text?.text ? (
                                <li key={zone}>
                                  {zone}: "{text.text}" (color: {text.color}, size: {text.size})
                                </li>
                              ) : null
                            )}
                          </ul>
                        </div>
                      )}

                      {/* ✅ Images */}
                      {item.customImages && (
                        <div className="mt-2 text-xs text-neutral-400">
                          <p className="font-medium">Images:</p>
                          <ul className="list-disc ml-4 space-y-1">
                            {Object.entries(item.customImages).map(([zone, images]) =>
                              images.length > 0 ? (
                                <li key={zone}>
                                  {zone}:
                                  <div className="flex gap-2 mt-1">
                                    {images.map((img) => (
                                      <img
                                        key={img.id}
                                        src={img.url}
                                        alt={`custom ${zone}`}
                                        className="h-8 w-8 object-cover rounded border"
                                      />
                                    ))}
                                  </div>
                                </li>
                              ) : null
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-span-2 text-center">
                    ${Number(item.price || 0).toFixed(2)}
                  </div>

                  <div className="col-span-2 flex items-center justify-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="text-neutral-400 hover:text-white transition-colors"
                    >
                      <MinusCircle className="h-4 w-4" />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="text-neutral-400 hover:text-white transition-colors"
                    >
                      <PlusCircle className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="col-span-2 text-right flex items-center justify-end gap-4">
                    <span>${(Number(item.price || 0) * Number(item.quantity || 1)).toFixed(2)}</span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-neutral-500 hover:text-red-500 transition-colors"
                      aria-label="Remove item"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>

        <div>
          <div className="bg-neutral-800 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-neutral-400">Subtotal</span>
                <span>${Number(getTotalPrice() || 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Taxes</span>
                <span>Calculated at checkout</span>
              </div>
            </div>

            <div className="border-t border-neutral-700 pt-4 mb-6">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${Number(getTotalPrice() || 0).toFixed(2)}</span>
              </div>
            </div>
            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-semibold text-white">Informations client</h3>
              <input
                  type="text"
                  placeholder="Nom complet"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                  className="w-full p-2 rounded bg-neutral-700 text-white placeholder:text-neutral-400"
              />
              <input
                  type="email"
                  placeholder="Email"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                  className="w-full p-2 rounded bg-neutral-700 text-white placeholder:text-neutral-400"
              />
              <input
                  type="tel"
                  placeholder="Téléphone"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                  className="w-full p-2 rounded bg-neutral-700 text-white placeholder:text-neutral-400"
              />
              <input
                  type="text"
                  placeholder="Adresse de livraison"
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                  className="w-full p-2 rounded bg-neutral-700 text-white placeholder:text-neutral-400"
              />
            </div>

            <button
                className={`btn btn-primary w-full py-3 ${
                    !isFormValid() ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={handleCheckout}
                disabled={!isFormValid()}
            >
              Proceed to Checkout
            </button>


            <div className="mt-6 text-sm text-neutral-400 text-center">
              <p>Free shipping on all orders over $150</p>
              <p className="mt-2">30-day satisfaction guarantee</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
