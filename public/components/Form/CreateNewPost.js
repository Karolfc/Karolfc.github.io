export class PostForm extends HTMLElement {
    constructor() {
        super();
        this.place = "";
        this.photopost = "";
        this.description = "";
        this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
        var _a, _b, _c, _d;
        this.render();
        const btn = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector("button");
        btn === null || btn === void 0 ? void 0 : btn.addEventListener("click", () => {
            const event = new CustomEvent("formulario-completo", {
                detail: { place: this.place, photopost: this.photopost, description: this.description },
                composed: true
            });
            this.dispatchEvent(event);
        });
        const placeInput = (_b = this.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector('input[type="place"]');
        const photopostInput = (_c = this.shadowRoot) === null || _c === void 0 ? void 0 : _c.querySelector('input[type="photopost"]');
        const descriptionInput = (_d = this.shadowRoot) === null || _d === void 0 ? void 0 : _d.querySelector('input[type="description"]');
        placeInput === null || placeInput === void 0 ? void 0 : placeInput.addEventListener("change", (evt) => {
            const value = evt.target.value || "";
            this.place = value;
        });
        photopostInput === null || photopostInput === void 0 ? void 0 : photopostInput.addEventListener("change", (evt) => {
            const value = evt.target.value || "";
            this.photopost = value;
        });
        descriptionInput === null || descriptionInput === void 0 ? void 0 : descriptionInput.addEventListener("change", (evt) => {
            const value = evt.target.value || "";
            this.description = value;
        });
    }
    render() {
        if (!this.shadowRoot)
            return;
        this.shadowRoot.innerHTML = `
        <article class="Form">
        <link href="./public/Style.css" rel="stylesheet">
            <div id="inputplace">
                <input type="place" placeholder="Add location"/>
            </div>
            <div>
                <input type="photopost" placeholder="Enter image URL"/>
            </div>
            <div>
                <input type="description" placeholder="Write a caption..."/>
            </div>
            <button type="submit">Enter</button>
        </article>
        `;
    }
}
customElements.define("app-postform", PostForm);
