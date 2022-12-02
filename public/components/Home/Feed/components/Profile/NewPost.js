var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export var NewAttribute;
(function (NewAttribute) {
    NewAttribute["uid"] = "uid";
    NewAttribute["place"] = "place";
    NewAttribute["photopost"] = "photopost";
    NewAttribute["description"] = "description";
})(NewAttribute || (NewAttribute = {}));
class NewPost extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    static get observedAttributes() {
        const attrs = {
            uid: null,
            place: null,
            photopost: null,
            description: null,
        };
        return Object.keys(attrs);
    }
    connectedCallback() {
        this.render();
        const buttonDelete = this.shadowRoot.querySelector('#moreIcon');
        buttonDelete === null || buttonDelete === void 0 ? void 0 : buttonDelete.addEventListener('click', () => {
            const evt = new CustomEvent('delete-user', {
                detail: { uid: this.uid },
                composed: true,
            });
            this.dispatchEvent(evt);
        });
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
            <section id="container">
                <img id="fotoPerfil" src="./public/components/Home/Feed/components/Profile/images/fotoPerfil.jpg" alt="fotoperfil" width="23px" height="23px">
                <h1 id="name">LittleMonkey22</h1>
                <h2 id="place">${this.place}</h2>
                <img id="photopost" src="${this.photopost}"> 
                <h3 id="views">0 views</h3>
                <span id="description"><strong>LittleMonkey22</strong> ${this.description}</span>
                <p id="comments">No comments yet</p>
                <p id="date">1s ago</p>

                <section >
                    <img id="moreIcon" src="./public/components/Home/Feed/components/Profile/images/more.png" alt="moreicon" width="10px" height="10px">
                    <img id="saveIcon" src="./public/components/Home/Feed/components/Profile/images/save.png" alt="saveicon" width="13px" height="13px">
                    <img id="sendIcon" src="./public/components/Home/Feed/components/Profile/images/send.png" alt="sendicon" width="12px" height="12px">
                    <img id="likeIcon" src="./public/components/Home/Feed/components/Profile/images/like.png" alt="likeicon" width="13px" height="13px">
                    <img id="commentIcon" src="./public/components/Home/Feed/components/Profile/images/comment.png" alt="commenticon" width="16px" height="16px">
                </section>
          </section>
            `;
        }
    }
}
customElements.define("app-newpost", NewPost);
export default NewPost;
import { deleteUsers, listenUsers } from "../../../../../services/dbPost.js";
class NewPostContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
        return __awaiter(this, void 0, void 0, function* () {
            listenUsers((users) => {
                var _a;
                this.render(users);
                const card = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelectorAll("app-newpost");
                card === null || card === void 0 ? void 0 : card.forEach((cardE) => {
                    cardE === null || cardE === void 0 ? void 0 : cardE.addEventListener('delete-user', (evt) => __awaiter(this, void 0, void 0, function* () {
                        deleteUsers(evt.detail.uid);
                    }));
                });
            });
        });
    }
    render(users) {
        if (!this.shadowRoot)
            return;
        const cardUser = users.map(e => {
            return `<app-newpost uid="${e.id}" place="${e.data.place}" photopost="${e.data.photopost}" description="${e.data.description}"></app-newpost>`;
        });
        this.shadowRoot.innerHTML = cardUser.join('');
    }
}
customElements.define("app-newcard", NewPostContainer);
