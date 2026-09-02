const whatsappNumber = '573242016455';
const toast = document.getElementById('toast');

function showToast(message) {
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');

    clearTimeout(showToast.timeoutId);
    showToast.timeoutId = setTimeout(() => {
        toast.classList.remove('show');
    }, 1800);
}

function openWhatsApp(productName) {
    const message = encodeURIComponent(`Hola, quiero comprar el producto: ${productName}`);
    const url = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(url, '_blank', 'noopener,noreferrer');
}

document.querySelectorAll('.buy-btn').forEach((button) => {
    button.addEventListener('click', () => {
        const productName = button.dataset.product || 'producto';
        showToast(`${productName} añadido al pedido`);
        openWhatsApp(productName);
    });
});

document.querySelectorAll('.secondary-btn').forEach((button) => {
    button.addEventListener('click', () => {
        const card = button.closest('.card');
        const title = card?.querySelector('h2')?.textContent || 'Producto';
        showToast(`Más detalles de ${title}`);
    });
});