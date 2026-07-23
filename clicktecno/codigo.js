const productos = [
    {
        id: 1,
        nombre: "Auriculares Gamer",
        precio: 25000,
        stock: 5,
        imagen: "https://m.media-amazon.com/images/I/71xNjrzG69L.jpg"
    },
    {
        id: 2,
        nombre: "Teclado Mecánico",
        precio: 45000,
        stock: 3,
        imagen: "https://tse3.mm.bing.net/th/id/OIP.RHyIEu5k30UgnOIONMTwjwHaEK?r=0&pid=Api&P=0&h=180"
    },
    {
        id: 3,
        nombre: "Mouse RGB",
        precio: 18000,
        stock: 8,
        imagen: "https://m.media-amazon.com/images/I/61EjNRNwaZL.jpg"
    },
    {
        id: 4,
        nombre: "Monitor Gamer 24",
        precio: 120000,
        stock: 4,
        imagen: "https://m.media-amazon.com/images/I/71MlcO29QOL._AC_SL1500_.jpg"
    },
    {
        id: 5,
        nombre: "Silla Gamer",
        precio: 150000,
        stock: 2,
        imagen: "https://tse3.mm.bing.net/th/id/OIP.rJCqQJBpqgmk-ef-nmbnBQHaHa?r=0&pid=Api&P=0&h=180"
    },
    {
        id: 6,
        nombre: "Webcam HD",
        precio: 32000,
        stock: 6,
        imagen: "https://tse2.mm.bing.net/th/id/OIP.O4lLEclxJjKRCVwICF_AzQHaGX?r=0&pid=Api&P=0&h=180"
    },
    {
        id: 7,
        nombre: "Parlantes RGB",
        precio: 28000,
        stock: 5,
        imagen: "https://tse4.mm.bing.net/th/id/OIP._HiQYm6yICyo0rvOUpuWTgHaHa?r=0&pid=Api&P=0&h=180"
    },
    {
        id: 8,
        nombre: "Mousepad XL",
        precio: 12000,
        stock: 10,
        imagen: "https://tse3.mm.bing.net/th/id/OIP.AMrJ2-8NsXPhCB9YM7UyBgHaHK?r=0&pid=Api&P=0&h=180"
    },
    {
        id: 9,
        nombre: "Microfono USB",
        precio: 55000,
        stock: 4,
        imagen: "https://tse1.mm.bing.net/th/id/OIP.xJcKWaPty6cjW-EZ8wbavQHaHe?r=0&pid=Api&P=0&h=180"
    },
    {
        id: 10,
        nombre: "Joystick Inalámbrico",
        precio: 48000,
        stock: 7,
        imagen: "https://tse4.mm.bing.net/th/id/OIP.qi8C7W6Im9PYbuRgK3byawHaGI?r=0&pid=Api&P=0&h=180"
    }
];

let carrito = [];
let mostrarTodos = false;

const productsGrid = document.getElementById("products-grid");
const verTodosBtn = document.getElementById("ver-todos");
const cart = document.getElementById("cart");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");



function renderizarProductos() {
    productsGrid.innerHTML = "";

    const productosAMostrar = mostrarTodos ? productos : productos.slice(0, 8);

    productosAMostrar.forEach(producto => {
        productsGrid.innerHTML += `
            <div class="product">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>$${producto.precio}</p>
                <p>Stock: ${producto.stock}</p>
                <div class="cantidad-container">
                    <input 
                        type="number" 
                        id="cantidad-${producto.id}"
                        min="1" 
                        max="${producto.stock}" 
                        value="1"
                        class="cantidad-input"
                        ${producto.stock === 0 ? "disabled" : ""}
                    >

                    <button onclick="agregarAlCarrito(${producto.id})"
                        ${producto.stock === 0 ? "disabled" : ""}>
                        ${producto.stock === 0 ? "Sin stock" : "Agregar al carrito"}
                    </button>
                </div>
            </div>
        `;
    });

    verTodosBtn.textContent = mostrarTodos
        ? "Mostrar menos"
        : "Ver todos los productos";
}

verTodosBtn.addEventListener("click", () => {
    mostrarTodos = !mostrarTodos;
    renderizarProductos();
});

// Agregar al carrito
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    const cantidadInput = document.getElementById(`cantidad-${id}`);
    const cantidad = parseInt(cantidadInput.value);

    if (cantidad > 0 && cantidad <= producto.stock) {
        producto.stock -= cantidad;

        const item = carrito.find(p => p.id === id);

        if (item) {
            item.cantidad += cantidad;
        } else {
            carrito.push({ ...producto, cantidad });
        }

        renderizarProductos();
        renderizarCarrito();
    } else {
        alert("Cantidad no válida o stock insuficiente");
    }
}

// Mostrar carrito
function renderizarCarrito() {
    cartItems.innerHTML = "";

    if (carrito.length === 0) {
        cartItems.innerHTML = "<p>El carrito está vacío.</p>";
        cartTotal.textContent = "$0";
        cartCount.textContent = "0";
        return;
    }

    let total = 0;
    let cantidadTotal = 0;

    carrito.forEach(item => {
        total += item.precio * item.cantidad;
        cantidadTotal += item.cantidad;

        cartItems.innerHTML += `
            <div class="cart-item">
                <img src="${item.imagen}" alt="${item.nombre}" width="60">
                <div>
                    <h4>${item.nombre}</h4>
                    <p>$${item.precio} x ${item.cantidad}</p>
                </div>
                <button class="remove-btn" onclick="eliminarDelCarrito(${item.id})">✖</button>
            </div>
        `;
    });

    cartTotal.textContent = `$${total}`;
    cartCount.textContent = cantidadTotal;
}

function eliminarDelCarrito(id) {
    const item = carrito.find(p => p.id === id);
    const producto = productos.find(p => p.id === id);

    if (item && producto) {
        // Devuelve el stock
        producto.stock += item.cantidad;

        // Elimina el producto del carrito
        carrito = carrito.filter(p => p.id !== id);

        // Actualiza la vista
        renderizarProductos();
        renderizarCarrito();
    }
}


// Abrir y cerrar carrito
document.getElementById("cart-btn").addEventListener("click", () => {
    cart.classList.toggle("active");
});

document.getElementById("close-cart").addEventListener("click", () => {
    cart.classList.remove("active");
});

const menuBtn = document.getElementById("menu-btn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
    nav.classList.toggle("active");
});


const buscador = document.getElementById("buscador");

buscador.addEventListener("input", () => {
    const texto = buscador.value.toLowerCase().trim();

    const productosFiltrados = productos.filter(producto =>
        producto.nombre.toLowerCase().startsWith(texto)
    );

    // Si no hay productos encontrados
    if (productosFiltrados.length === 0 && texto !== "") {
        productsGrid.innerHTML = "<p class='sin-productos'>No se encontró el producto</p>";
    } else {
        renderizarProductos(productosFiltrados);
    }
});


// Inicializar
renderizarProductos();