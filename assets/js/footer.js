document.addEventListener("DOMContentLoaded", function () {
    const footerHTML = `
        <footer class="content-footer">
            <p>&copy; 2025 STELLAR AI. Todos los derechos reservados.</p>
            <div class="footer-links">
                <a href="terms.html">Términos y Condiciones</a>
                <a href="privacy.html">Política de Privacidad</a>
                <a href="support.html">Soporte</a>
            </div>
        </footer>
    `;

    const mainContent = document.querySelector(".main-content");
    if (mainContent) {
        mainContent.insertAdjacentHTML("beforeend", footerHTML);
    }
});
