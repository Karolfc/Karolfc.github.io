export enum NewAttribute {
    "uid" = "uid",
    "place" = "place",
    "photopost" = "photopost",
    "description" = "description",
}

class NewPost extends HTMLElement{
    uid?: string;
    place?: string;
    photopost?: string;
    description?: string;

    static get observedAttributes(){
        const attrs: Record<NewAttribute,null> = {
            uid: null,
            place: null,
            photopost: null,
            description: null,
        };
        return Object.keys(attrs);
    }

    constructor(){
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback(){
        this.render();

        const buttonDelete = this.shadowRoot.querySelector('#moreIcon');
        buttonDelete?.addEventListener('click', () => {
            const evt: CustomEvent<{uid:string,place:string,photopost:string,description:string}> = new CustomEvent('delete-user',{
                detail: {uid: this.uid},
                composed: true,
            });
            this.dispatchEvent(evt);

        })
    }

    attributeChangedCallback(
        propName: NewAttribute,
        oldValue: string | undefined,
        newValue: string | undefined,
        ){
            switch (propName) {            
                default:
                    this[propName] = newValue;
                    break;
            }
            this.render();
        }

    render(){
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = `
            <link href="./public/components/Home/style.css" rel="stylesheet">
            <section id="container">
                <img id="fotoPerfil" src="./components/Home/Feed/components/Profile/images/fotoPerfil.jpg" alt="fotoperfil" width="23px" height="23px">
                <h1 id="name">LittleMonkey22</h1>
                <h2 id="place">${this.place}</h2>
                <img id="photopost" src="${this.photopost}"> 
                <h3 id="views">0 views</h3>
                <span id="description"><strong>LittleMonkey22</strong> ${this.description}</span>
                <p id="comments">No comments yet</p>
                <p id="date">1s ago</p>

                <section >
                    <img id="moreIcon" src="./components/Home/Feed/components/Profile/images/more.png" alt="moreicon" width="10px" height="10px">
                    <img id="saveIcon" src="./components/Home/Feed/components/Profile/images/save.png" alt="saveicon" width="13px" height="13px">
                    <img id="sendIcon" src="./components/Home/Feed/components/Profile/images/send.png" alt="sendicon" width="12px" height="12px">
                    <img id="likeIcon" src="./components/Home/Feed/components/Profile/images/like.png" alt="likeicon" width="13px" height="13px">
                    <img id="commentIcon" src="./components/Home/Feed/components/Profile/images/comment.png" alt="commenticon" width="16px" height="16px">
                </section>
          </section>
            `
        }
    }
}

customElements.define("app-newpost", NewPost);
export default NewPost;


import {getUsers, deleteUsers, listenUsers} from "../../../../../services/dbPost.js"

class NewPostContainer extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: "open"});
    }

    async connectedCallback() {

        listenUsers((users) => {
            this.render(users);
    
            const card = this.shadowRoot?.querySelectorAll("app-newpost");
            card?.forEach((cardE) => {
                cardE?.addEventListener('delete-user', async (evt: CustomEvent) => {
                    deleteUsers(evt.detail.uid);
                })
            })
        })
    }

    render(users?) {
        if(!this.shadowRoot) return;
        const cardUser = users.map(e => {
            return `<app-newpost uid="${e.id}" place="${e.data.place}" photopost="${e.data.photopost}" description="${e.data.description}"></app-newpost>`
        });

        this.shadowRoot.innerHTML = cardUser.join('');
    }
}

customElements.define("app-newcard", NewPostContainer);