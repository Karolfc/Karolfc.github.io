export enum sAttribute {
    "name" = "name",
    "photostory" = "photostory"
}

class MyStories extends HTMLElement{
    name?: string;
    photostory?: string;

    static get observedAttributes(){
        const attrs: Record<sAttribute,null> = {
            name: null,
            photostory: null,
        };
        return Object.keys(attrs);
    }

    constructor(){
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback(){
        this.render();
    }

    attributeChangedCallback(
        propName: sAttribute,
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
            <section id="storiescontainer">
                <img width="20px" heigth="20px" id="photostory" ${this.photostory} 
                <p id="nameStory">${this.name}</p>
          </section>
            `
        }
    }
}

customElements.define("my-stories", MyStories);
export default MyStories;