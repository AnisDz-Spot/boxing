import { useState } from 'react';
import GloveViewer from "../../../components/GloveViewer.tsx";
import { loadCustomizationFromJson } from "../../../utils/loadCustomization.ts";

export default function OrderJsonLoader() {
    const [jsonInput, setJsonInput] = useState('');
    const [error, setError] = useState('');
    const [fileName, setFileName] = useState('');

    const handleLoad = () => {
        try {
            const parsed = JSON.parse(jsonInput);
            const gloveData = Array.isArray(parsed) ? parsed[0] : parsed;
            if (!gloveData) throw new Error("Objet vide");

            loadCustomizationFromJson(
                gloveData.glove,
                gloveData.textZones,
                gloveData.customImages
            );
            setError('');
        } catch (err) {
            console.error(err);
            setError(' JSON invalide ou incomplet');
        }
    };

    const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type === "application/json") {
            const reader = new FileReader();
            reader.onload = (event) => {
                const content = event.target?.result as string;
                setJsonInput(content);
                setFileName(file.name);
            };
            reader.readAsText(file);
        } else {
            setError(" Seuls les fichiers .json sont acceptés");
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    return (
        <div
            className="p-4 bg-gray-900 min-h-screen text-white"
            style={{ marginTop: "5%" }}
            onDrop={handleFileDrop}
            onDragOver={handleDragOver}
        >
            <h1 className="text-2xl font-bold mb-4">Charger un gant depuis un JSON</h1>

            <div className="mb-2">
                {fileName && <p className="text-sm text-green-400"> Fichier chargé : {fileName}</p>}
            </div>

            <textarea
                className="w-full h-64 p-3 border border-gray-700 rounded mb-4 bg-gray-800 text-white"
                placeholder="Colle ici le JSON complet de la commande ou glisse le fichier"
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
            />

            <button
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                onClick={handleLoad}
            >
                Charger
            </button>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            <div className="mt-8 w-full h-[600px] border border-gray-600 rounded overflow-hidden">
                <GloveViewer />
            </div>
        </div>
    );
}
