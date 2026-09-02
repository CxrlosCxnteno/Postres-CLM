const whatsappNumber = '573242016455';
const nequiNumber = '3001234567'; // reemplaza por tu número real de Nequi
const toast = document.getElementById('toast');
const themeToggle = document.getElementById('theme-toggle');
const nequiButton = document.getElementById('nequi-button');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.body.classList.remove('dark');
    if (themeToggle) {
        themeToggle.textContent = '🌙 Modo oscuro';
    }
} else {
    document.body.classList.add('dark');
    if (themeToggle) {
        themeToggle.textContent = '☀️ Modo claro';
    }
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');

        const isDark = document.body.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        themeToggle.textContent = isDark ? '☀️ Modo claro' : '🌙 Modo oscuro';
    });
}

if (nequiButton) {
    nequiButton.addEventListener('click', () => {
        const message = encodeURIComponent(
            `Hola, quiero pagar por Nequi. Mi número de Nequi es ${nequiNumber}. Por favor, indícame cómo confirmar el pago.`
        );

        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
    });
}

function showToast(message) {
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');

    clearTimeout(showToast.timeoutId);
    showToast.timeoutId = setTimeout(() => {
        toast.classList.remove('show');
    }, 1800);
}

function getProductData(card) {
    const title = card?.querySelector('h2')?.textContent?.trim() || 'Producto';
    const select = card?.querySelector('.flavor-select');
    const flavor = select?.value || 'No especificado';

    return { title, flavor };
}

function openWhatsApp(productName, flavor) {
    const message = encodeURIComponent(
        `Hola, quiero comprar: ${productName}. Sabor: ${flavor}. Forma de pago: Nequi.`
    );
    const url = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(url, '_blank', 'noopener,noreferrer');
}

document.querySelectorAll('.buy-btn').forEach((button) => {
    button.addEventListener('click', () => {
        const card = button.closest('.card');
        const { title, flavor } = getProductData(card);

        showToast(`${title} - ${flavor}`);
        openWhatsApp(title, flavor);
    });
});

document.querySelectorAll('.secondary-btn').forEach((button) => {
    button.addEventListener('click', () => {
        const card = button.closest('.card');
        const detail = card?.querySelector('.product-detail');
        if (!detail) return;

        detail.classList.toggle('open');
        button.textContent = detail.classList.contains('open') ? 'Ocultar' : 'Detalles';
    });
});