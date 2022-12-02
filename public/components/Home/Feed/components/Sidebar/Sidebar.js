export var sugAttribute;
(function (sugAttribute) {
    sugAttribute["name"] = "name";
    sugAttribute["photostory"] = "photostory";
})(sugAttribute || (sugAttribute = {}));
class MySuggestions extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    static get observedAttributes() {
        const attrs = {
            name: null,
            photostory: null,
        };
        return Object.keys(attrs);
    }
    connectedCallback() {
        this.render();
    }
    attributeChangedCallback(propName, oldValue, newValue) {
        switch (propName) {
            default:
                this[propName] = newValue;
                break;
        }
        this.render();
    }
    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
            <link href="./public/components/Home/style.css" rel="stylesheet">
            <section id="suggestionscontainer">
                <img width="20px" heigth="20px" id="photoSuggestion" ${this.photostory} 
                <p id="nameSuggestion">${this.name}</p>
                <p id="suggestionText">Followed by michis + 2 more</p>
                <p id="follow">Follow</p>
          </section>
            `;
        }
    }
}
customElements.define("my-suggestions", MySuggestions);
export default MySuggestions;
