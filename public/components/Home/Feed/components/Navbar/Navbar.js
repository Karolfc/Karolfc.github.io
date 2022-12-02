class MyNavbar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        this.render();
    }
    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
            <link href="./public/components/Profile/style.css" rel="stylesheet">
            <header id="header">
                <nav id="headerNavbar">
                    <ul id="navbar">
                        <li><img id="logoInstagram"
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png"
                            alt="logoInstagram"></li>
                            <section class="searchgroup">
                                <li id="searchicon"><img src="./public/components/Home/Feed/components/Profile/images/search.png" alt="searchicon" width="19vw" height="19vh"></li>
                                <li id="searchText">Search</li>
                            </section>
                        <li id="homeicon"><img src="https://static.thenounproject.com/png/771236-200.png" alt="homeicon" width="35vw" height="35vh"></li>
                        <li id="messengericon"><img src="https://cdn-icons-png.flaticon.com/512/5948/5948514.png" alt="messengericon" width="21w" height="21vh"></li>
                        <li id="masicon"><img src="https://cdn-icons-png.flaticon.com/512/5948/5948495.png" alt="masicon" width="22vw" height="22vh"></li>
                        <li id="exploreicon"><img src="https://cdn-icons-png.flaticon.com/512/77/77521.png" alt="exploreicon" width="22vw" height="22vh"></li>
                        <li id="likeiconNav"><img src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png" alt="likeiconNav" width="22vw" height="22vh"></li>
                        <li><img id="photoperfilNav" src="./public/components/Home/Feed/components/Profile/images/fotoPerfil.jpg" alt="photoperfilNav" width="24px" height="24px"></li>
                    </ul>
                </nav>
            </header>
            `;
        }
    }
}
customElements.define("my-navbar", MyNavbar);
export default MyNavbar;
