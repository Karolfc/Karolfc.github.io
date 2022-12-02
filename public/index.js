import "./components/index.js";
var Screens;
(function (Screens) {
    Screens[Screens["register"] = 0] = "register";
    Screens[Screens["login"] = 1] = "login";
    Screens[Screens["home"] = 2] = "home";
})(Screens || (Screens = {}));
class ScreenContainer extends HTMLElement {
    constructor() {
        super();
        this.screen = Screens.register;
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        var _a, _b;
        this.render();
        const GoSignUp = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector("app-register");
        GoSignUp === null || GoSignUp === void 0 ? void 0 : GoSignUp.addEventListener("register-success", () => {
            var _a;
            this.screen = Screens.login;
            this.render();
            const login = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector("app-login");
            login === null || login === void 0 ? void 0 : login.addEventListener("login-success", () => {
                this.screen = Screens.home;
                this.render();
            });
        });
        const login = (_b = this.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector("app-login");
        login === null || login === void 0 ? void 0 : login.addEventListener("login-success", () => {
            this.screen = Screens.home;
            this.render();
        });
    }
    render() {
        if (!this.shadowRoot)
            return;
        switch (this.screen) {
            case Screens.home:
                this.shadowRoot.innerHTML = "<app-home></app-home>";
                break;
            case Screens.login:
                this.shadowRoot.innerHTML = "<app-login></app-login>";
                break;
            case Screens.register:
                this.shadowRoot.innerHTML = "<app-register></app-register>";
                break;
            default:
                break;
        }
    }
}
customElements.define("screen-container", ScreenContainer);
