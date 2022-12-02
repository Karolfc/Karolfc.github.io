export var sAttribute;
(function (sAttribute) {
    sAttribute["name"] = "name";
    sAttribute["photostory"] = "photostory";
})(sAttribute || (sAttribute = {}));
class MyStories extends HTMLElement {
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
            <section id="storiescontainer">
                <img width="20px" heigth="20px" id="photostory" ${this.photostory} 
                <p id="nameStory">${this.name}</p>
          </section>
            `;
        }
    }
}
customElements.define("my-stories", MyStories);
export default MyStories;
