import { CustomGlove, TextSettings, CustomImage, Zone } from '../store/customizationStore';
import { useCustomizationStore } from '../store/customizationStore';

export function loadCustomizationFromJson(
    gloveData: CustomGlove,
    textZones: Record<Zone, TextSettings>,
    customImages: Record<Zone, CustomImage[]>
) {
    const {
        updateColor,
        updateSize,
        updateTextZone,
        addCustomImage,
        updateImageTransform,
    } = useCustomizationStore.getState();

    // Mise à jour des couleurs
    Object.entries(gloveData).forEach(([key, value]) => {
        if (key.endsWith('Color')) {
            updateColor(key.replace('Color', ''), value);
        }
    });

    // Taille, matière, pattern, trim
    updateSize(gloveData.size);

    // Les autres infos générales (si besoin, tu pourras ajouter updateMaterial etc.)

    // Textes personnalisés
    Object.entries(textZones).forEach(([zone, settings]) => {
        updateTextZone(zone as Zone, settings);
    });

    // Images personnalisées
    Object.entries(customImages).forEach(([zone, images]) => {
        images.forEach((image) => {
            addCustomImage(zone as Zone, image.url);
            updateImageTransform(zone as Zone, image.id, image.transform);
        });
    });
}
