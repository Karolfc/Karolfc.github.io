import { addUser } from "../../../../../services/dbPost.js";
export class SendToDB extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
        var _a;
        this.render();
        const formCreate = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector("app-postform");
        formCreate.addEventListener("formulario-completo", (evt) => {
            const place = evt.detail.place;
            const photopost = evt.detail.photopost;
            const description = evt.detail.description;
            addUser({ place, photopost, description });
        });
    }
    render() {
        if (!this.shadowRoot)
            return;
        this.shadowRoot.innerHTML = `
        <link href="./public/components/Home/style.css" rel="stylesheet">
        <section id="CreatePostFormContainer">
            <h1 id="TituloCreateNewPost">Create new post</h1>
            <app-postform></app-postform>
        </section>
        `;
    }
}
customElements.define("app-sendtodb", SendToDB);
