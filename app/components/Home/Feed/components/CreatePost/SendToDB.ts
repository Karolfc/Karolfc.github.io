import { addUser } from "../../../../../services/dbPost.js";

export class SendToDB extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback(){
        this.render();
        const formCreate = this.shadowRoot?.querySelector("app-postform");
        formCreate.addEventListener("formulario-completo", (evt: CustomEvent) => {
            const place = evt.detail.place;
            const photopost = evt.detail.photopost;
            const description = evt.detail.description;

            addUser({place, photopost, description});
        })
    }

    render(){
        if(!this.shadowRoot) return;
        this.shadowRoot.innerHTML = `
        <link href="./public/components/Home/style.css" rel="stylesheet">
        <section id="CreatePostFormContainer">
            <h1 id="TituloCreateNewPost">Create new post</h1>
            <app-postform></app-postform>
        </section>
        `
    }
}

customElements.define("app-sendtodb", SendToDB);