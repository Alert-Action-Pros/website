document.addEventListener("DOMContentLoaded", function () {
    if (!localStorage.getItem("cookieConsent")) {
        const banner = document.createElement("div");
        banner.id = "cookie-banner";
        banner.innerHTML = `
            <div class="cookie-banner-content">
                <span>
                    This website uses cookies to ensure you get the best experience. Allow cookies?
                </span>
                <button id="acceptCookies" class="btn btn-small">Allow</button>
                <button id="declineCookies" class="btn btn-small btn-outline">Decline</button>
            </div>
        `;
        document.body.appendChild(banner);

        document.getElementById("acceptCookies").onclick = function () {
            localStorage.setItem("cookieConsent", "allowed");
            banner.remove();
        };
        document.getElementById("declineCookies").onclick = function () {
            localStorage.setItem("cookieConsent", "declined");
            banner.remove();
        };
    }
});