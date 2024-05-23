import { cardData } from './database.js';

class MyCard extends HTMLElement {
    connectedCallback() {
        const id = this.getAttribute('id');
        const cardDataItem = cardData.find(card => card.id === parseInt(id, 10));

        if (!cardDataItem) return;

        const cardColor = cardDataItem.id % 2 === 0 ? 'bg-purple-500' : 'bg-pink-500';
        const cardHeight = 'py-[50px]'; // Adjusted height to accommodate weight display
        const selectedClass = this.classList.contains('selected') ? '' : ''; // No scaling effect

        this.innerHTML = `
            <div class="p-4 ${cardColor} ${cardHeight} ${selectedClass} text-white rounded-lg shadow-md text-center text-lg">
                <h2 class="text-lg font-bold text-2xl">${cardDataItem.name}</h2>
                <p>ID: ${cardDataItem.id}</p>
                <p>Weight: ${cardDataItem.weight}</p>
            </div>
        `;
    }
}

customElements.define('my-card', MyCard);
