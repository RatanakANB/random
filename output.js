import { loadExcelData, clearDatabase, cardData, getCategoryTitle } from './database.js';
import { drawRandomCards } from './drawlots.js';

const broadcastChannel = new BroadcastChannel('cardUpdates');
let mirrorWindow = null;

document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.getElementById('fileInput');
    const startButton = document.getElementById('startButton');
    const clearButton = document.getElementById('clearButton');
    const againButton = document.getElementById('againButton');
    const cardContainer = document.getElementById('card-container');
    const categoryTitleContainer = document.getElementById('category-title-container'); // New container for category title

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            loadExcelData(file);
            if (!mirrorWindow || mirrorWindow.closed) {
                mirrorWindow = window.open('mirror.html', '_blank');
            }
        }
    });

    document.getElementById('extendButton').addEventListener('click', () => {
        window.open('mirror.html', '_blank');
    });

    document.addEventListener('dataLoaded', () => {
        displayCategoryTitle(); // Display category title
        displayCards();
        broadcastChannel.postMessage({ action: 'dataLoaded', data: { cardData, categoryTitle: getCategoryTitle() } });
    });

    startButton.addEventListener('click', () => {
        displayRandomCards();
    });

    clearButton.addEventListener('click', () => {
        clearDatabase();
        cardContainer.innerHTML = '';
        categoryTitleContainer.innerHTML = ''; // Clear category title
        broadcastChannel.postMessage({ action: 'clearDatabase' });
    });

    againButton.addEventListener('click', () => {
        displayRandomCards();
    });

    function displayCategoryTitle() {
        const title = getCategoryTitle();
        categoryTitleContainer.innerHTML = `<p class="text-xl font-bold my-4">${title}</p>`;
    }

    function displayCards() {
        cardContainer.innerHTML = '';
        cardContainer.classList.remove('flex', 'justify-center', 'grid-cols-2', 'gap-8');
        cardContainer.classList.add('grid', 'grid-cols-5', 'gap-4');

        cardData.forEach(card => {
            const cardElement = document.createElement('my-card');
            cardElement.setAttribute('id', card.id.toString());
            cardContainer.appendChild(cardElement);
        });
    }

    function displayRandomCards() {
        const selectedCards = drawRandomCards();
        cardContainer.innerHTML = '';

        selectedCards.forEach(card => {
            const cardElement = document.createElement('my-card');
            cardElement.setAttribute('id', card.id.toString());
            cardElement.classList.add('selected', 'py-20');
            cardContainer.appendChild(cardElement);
        });

        cardContainer.classList.add('grid', 'grid-cols-2', 'gap-8', 'justify-center');
        cardContainer.classList.remove('grid-cols-5');

        broadcastChannel.postMessage({ action: 'drawRandomCards', data: selectedCards });
    }
});
