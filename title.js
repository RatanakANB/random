class CardTitle extends HTMLElement {
    connectedCallback() {
        const cardTitle = this.getAttribute('title');
        this.innerHTML = `
            <h2 class="text-lg font-bold">${cardTitle}</h2>
        `;
    }
}

customElements.define('card-title', CardTitle);
