export class PostForm extends HTMLElement{
    place = "";
    photopost = "";
    description = "";

    constructor(){
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback(){
        this.render();

        const btn = this.shadowRoot?.querySelector("button");
        btn?.addEventListener("click",()=>{
            const event: CustomEvent<{place:string, photopost: string, description: string}> = 
            new CustomEvent("formulario-completo",{
                detail: {place: this.place, photopost: this.photopost, description: this.description},
                composed: true
            });

            this.dispatchEvent(event);
        });

        const placeInput = this.shadowRoot?.querySelector('input[type="place"]');
        const photopostInput = this.shadowRoot?.querySelector('input[type="photopost"]');
        const descriptionInput = this.shadowRoot?.querySelector('input[type="description"]');
        
        placeInput?.addEventListener("change",(evt) => {
            const value: string = (evt.target as HTMLInputElement).value || "";
            this.place = value;
        });

        photopostInput?.addEventListener("change",(evt) => {
            const value: string = (evt.target as HTMLInputElement).value || "";
            this.photopost = value;
        });

        descriptionInput?.addEventListener("change",(evt) => {
            const value: string = (evt.target as HTMLInputElement).value || "";
            this.description = value;
        })
    }

    render(){
        if(!this.shadowRoot) return;
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
        `
    }
}

customElements.define("app-postform",PostForm);