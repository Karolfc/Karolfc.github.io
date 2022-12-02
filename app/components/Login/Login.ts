import { queryUser } from "../../services/db.js";

export class Login extends HTMLElement{

    constructor(){
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback(){
        this.render();
        const form = this.shadowRoot?.querySelector("app-form");
        form.addEventListener("form-fullfiled", (evt: CustomEvent)=>{
            const email = evt.detail.email;
            const password = evt.detail.password;

            queryUser({email,password}).then(value => {
                if(value){
                    const event: CustomEvent = new CustomEvent("login-success",{
                        composed: true
                    })

                    this.dispatchEvent(event);
                }else{
                    alert("Email or password is incorrect");
                }
            })
        })
    }

    render(){
        if(!this.shadowRoot) return;
        this.shadowRoot.innerHTML = `
        <section class="Login">
        <link href="./public/Style.css" rel="stylesheet">
            <img id="PhoneLogIn" src="./components/Home/Feed/components/Profile/images/PhoneRegister.png">
            <img class="InstaLogo" src="https://logos-download.com/wp-content/uploads/2016/03/Instagram_Logo_2016.png">
            <app-form></app-form>
            <h3 class="GreyOr">OR</h3>
            <h5 class="BlueText">Log in with Facebook</h5>
            <h6 class="BlueText" id="forgotText">Forgot password?</h6>
        </section>
        <section class="GoRegister">
            <p>Don't have an account? <t id="GoSignUp">Register</t></p>
        </section>
        <section class="Download">
            <p>Get the app</p>
            <img class="Store" src="https://www.seekpng.com/png/full/22-227594_download-on-the-app-store-badge-available-on.png">
            <img class="Store" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png">
        </section>
        <section id="letraPequeñaLogInRegister">
            <p>Meta  ·  About  ·  Blog  ·  Jobs  ·  Help  ·  API  ·  Privacy  ·  Terms  ·  Top Accounts  ·  Hashtags  ·  Locations  ·  Instagram  Lite  ·  Contact Uploading & Non-Users</p>
            <p>English ˅  © 2022 Instagram from Meta</p>
        </section>
        `
    }
}

customElements.define("app-login",Login);