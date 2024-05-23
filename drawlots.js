import { cardData } from './database.js';

export function drawRandomCards() {
    if (cardData.length < 2) return [];

    const randomIndices = [];
    while (randomIndices.length < 2) {
        const randomIndex = Math.floor(Math.random() * cardData.length);
        if (!randomIndices.includes(randomIndex)) {
            randomIndices.push(randomIndex);
        }
    }

    return randomIndices.map(index => cardData[index]);
}
