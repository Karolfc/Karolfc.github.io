export enum sugAttribute {
    "name" = "name",
    "photostory" = "photostory"
}

class MySuggestions extends HTMLElement{
    name?: string;
    photostory?: string;

    static get observedAttributes(){
        const attrs: Record<sugAttribute,null> = {
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
        propName: sugAttribute,
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
            <section id="suggestionscontainer">
                <img width="20px" heigth="20px" id="photoSuggestion" ${this.photostory} 
                <p id="nameSuggestion">${this.name}</p>
                <p id="suggestionText">Followed by michis + 2 more</p>
                <p id="follow">Follow</p>
          </section>
            `
        }
    }
}

customElements.define("my-suggestions", MySuggestions);
export default MySuggestions;