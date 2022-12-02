export var Attribute;
(function (Attribute) {
    Attribute["name"] = "name";
    Attribute["place"] = "place";
    Attribute["photopost"] = "photopost";
    Attribute["views"] = "views";
    Attribute["description"] = "description";
    Attribute["comments"] = "comments";
    Attribute["date"] = "date";
})(Attribute || (Attribute = {}));
class MyProfile extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    static get observedAttributes() {
        const attrs = {
            name: null,
            place: null,
            photopost: null,
            views: null,
            description: null,
            comments: null,
            date: null,
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
            <section id="container">
                <img id="fotoPerfil" src="./components/Home/Feed/components/Profile/images/fotoPerfil.jpg" alt="fotoperfil" width="23px" height="23px">
                <h1 id="name">${this.name}</h1>
                <h2 id="place">${this.place}</h2>
                <img id="photopost" ${this.photopost} 
                <h3 id="views">${this.views}</h3>
                <span id="description"><strong>${this.name}</strong> ${this.description}</span>
                <p id="comments">${this.comments}</p>
                <p id="date">${this.date}</p>

                <section >
                    <img id="moreIcon" src="./components/Home/Feed/components/Profile/images/more.png" alt="moreicon" width="10px" height="10px">
                    <img id="saveIcon" src="./components/Home/Feed/components/Profile/images/save.png" alt="saveicon" width="13px" height="13px">
                    <img id="sendIcon" src="./components/Home/Feed/components/Profile/images/send.png" alt="sendicon" width="12px" height="12px">
                    <img id="likeIcon" src="./components/Home/Feed/components/Profile/images/like.png" alt="likeicon" width="13px" height="13px">
                    <img id="commentIcon" src="./components/Home/Feed/components/Profile/images/comment.png" alt="commenticon" width="16px" height="16px">
                </section>
          </section>
            `;
        }
    }
}
customElements.define("my-profile", MyProfile);
export default MyProfile;
