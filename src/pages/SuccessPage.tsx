import React from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="pt-24 pb-16 container-custom max-w-xl mx-auto text-white text-center">
            <div className="bg-neutral-900 p-8 rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold mb-4">Merci pour votre commande !</h1>
                <p className="text-neutral-400 mb-6">
                    Votre commande a été confirmée. Un e-mail de confirmation vous sera envoyé sous peu.
                </p>
                <button
                    onClick={() => navigate('/')}
                    className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-3 px-6 rounded-lg text-lg transition"
                >
                    Retour à l’accueil
                </button>
            </div>
        </div>
    );
};

export default SuccessPage;
