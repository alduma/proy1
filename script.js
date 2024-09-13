//variables
let allContainerCart = document.querySelector('.products');
let containerBuyCart = document.querySelector('.card-items');
let priceTotal = document.querySelector('.price-total')
let amountProduct = document.querySelector('.count-product');


let buyThings = [];
let totalCard = 0;
let countProduct = 0;

//functions
loadEventListenrs();
function loadEventListenrs(){
    allContainerCart.addEventListener('click', addProduct);

    containerBuyCart.addEventListener('click', deleteProduct);
}

function addProduct(e){
    e.preventDefault();
    if (e.target.classList.contains('btn-add-cart')) {
        const selectProduct = e.target.parentElement; 
        readTheContent(selectProduct);
    }
}

function deleteProduct(e) {
    if (e.target.classList.contains('delete-product')) {
        const deleteId = e.target.getAttribute('data-id');

        buyThings.forEach(value => {
            if (value.id == deleteId) {
                let priceReduce = parseFloat(value.price) * parseFloat(value.amount);
                totalCard =  totalCard - priceReduce;
                totalCard = totalCard.toFixed(2);
            }
        });
        buyThings = buyThings.filter(product => product.id !== deleteId);
        
        countProduct--;
    }
    //FIX: El contador se quedaba con "1" aunque ubiera 0 productos
    if (buyThings.length === 0) {
        priceTotal.innerHTML = 0;
        amountProduct.innerHTML = 0;
    }
    loadHtml();
}

function readTheContent(product){
    const infoProduct = {
        image: product.querySelector('div img').src,
        title: product.querySelector('.title').textContent,
        price: product.querySelector('div p span').textContent,
        id: product.querySelector('a').getAttribute('data-id'),
        amount: 1
    }

    totalCard = parseFloat(totalCard) + parseFloat(infoProduct.price);
    totalCard = totalCard.toFixed(2);

    const exist = buyThings.some(product => product.id === infoProduct.id);
    if (exist) {
        const pro = buyThings.map(product => {
            if (product.id === infoProduct.id) {
                product.amount++;
                return product;
            } else {
                return product
            }
        });
        buyThings = [...pro];
    } else {
        buyThings = [...buyThings, infoProduct]
        countProduct++;
    }
    loadHtml();
    //console.log(infoProduct);
}

function loadHtml(){
    clearHtml();
    buyThings.forEach(product => {
        const {image, title, price, amount, id} = product;
        const row = document.createElement('div');
        row.classList.add('item');
        row.innerHTML = `
            <img src="${image}" alt="">
            <div class="item-content">
                <h7>Descripcion: <h8>${title}</h8></h7>
                
                <h7>Cantidad: <h8>${amount}</h8></h7>
                <h7>Precio: <h8>${price}</h8></h7>
            </div>
            <span class="delete-product" data-id="${id}">X</span>
        `;

        containerBuyCart.appendChild(row);

        priceTotal.innerHTML = totalCard;

        amountProduct.innerHTML = countProduct;
    });
}
 function clearHtml(){
    containerBuyCart.innerHTML = '';
 }

 function showOrderForm() {
    // Obtener el contenedor del formulario
    const orderForm = document.getElementById('order-form');
    // Mostrar el formulario
    orderForm.style.display = 'block';

    // Obtener los detalles de los productos seleccionados
    const cartItems = document.querySelectorAll('.card-items .item'); // Asegúrate de que este selector coincida con los elementos de tu lista
    let orderDetails = '';

    cartItems.forEach(item => {
        const itemName = item.querySelector('.item-content h8').textContent; // Ajusta según la estructura de HTML
        const itemQuantity = item.querySelector('.item-content h7:nth-child(2) h8').textContent; // Ajusta según la estructura de HTML
        orderDetails += `${itemName} - ${itemQuantity}\n`; // Ajusta el formato según lo necesites
    });

    // Actualizar el campo de detalles del pedido
    document.getElementById('order-details').value = orderDetails;
}

// Función para cerrar el formulario de pedido
function closeOrderForm() {
    const orderForm = document.getElementById('order-form');
    orderForm.style.display = 'none';
}



document.querySelectorAll('.image-container').forEach(container => {
    const hoverImages = container.querySelectorAll('.hover-image');

    let index = 0;
    let interval;

    container.addEventListener('mouseover', () => {
        interval = setInterval(() => {
            hoverImages[index].style.opacity = '0'; // Oculta la imagen actual
            index = (index + 1) % hoverImages.length; // Cambia al siguiente índice
            hoverImages[index].style.opacity = '1'; // Muestra la siguiente imagen
        }, 1000); // Cambia la imagen cada segundo
    });

    container.addEventListener('mouseout', () => {
        clearInterval(interval); // Detiene el cambio de imágenes al quitar el mouse
        hoverImages.forEach(image => image.style.opacity = '0'); // Oculta todas las imágenes
        index = 0;
        hoverImages[index].style.opacity = '1'; // Vuelve a la imagen inicial
    });
});


// Función para manejar el envío del formulario
function handleFormSubmit(event) {
    event.preventDefault(); // Prevenir el envío por defecto

    // Obtener el formulario y el contenedor del mensaje de éxito
    const form = event.target; // El formulario que desencadenó el evento
    const successMessage = document.getElementById('success-message');
    const overlay = document.getElementById('overlay');

    // Muestra el mensaje de éxito y el overlay
    overlay.style.display = 'block';
    successMessage.style.display = 'flex';

    // Oculta el mensaje de éxito después de 3 segundos y luego envía el formulario
    setTimeout(function() {
        successMessage.style.display = 'none';
        overlay.style.display = 'none';
        form.submit(); // Envía el formulario
    }, 1500);
}

// Añadir el evento a todos los formularios cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });
});




