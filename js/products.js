const prodFiltrado = document.getElementById("cards-productos-filtrados");
const contentCarrito = document.getElementById("tbody");
const botonVaciarCarrito = document.getElementById("vaciarCarrito");
const leyendaCarritoVacio = document.getElementById("leyenda-carrito-vacio");

let carrito = [];

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("carrito")){
        carrito = JSON.parse(localStorage.getItem("carrito"));
        actualizarModalCarrito();
    }
});


// *********************/ Hacer dinamico el filtro por categorias /************************//

const listCategoria = document.getElementsByClassName("filtrar-category");

for (const nodoHTML of listCategoria){
    nodoHTML.addEventListener("click", (event) =>{
        const categoria = event.target.getAttribute("data-category");
        console.log(categoria);
        filtrarProductosPorCategoria(categoria);
    })
}

// *********************/ Generar cards de Productos Filtrados/************************//

function filtrarProductosPorCategoria(categoria) {
    
    fetch("/productos.json")
        .then((response) => response.json())
        .then((prod) => {
            const productosFiltrados = prod.filter((producto) => producto.category === categoria);
            console.log(productosFiltrados);
            prodFiltrado.innerHTML = "";
            productosFiltrados.forEach((producto) =>{
                prodFiltrado.innerHTML += `
                <div class="col-lg-3 col-md-6 col-sm-12">
                    <div class="card prod__card" style="width: 25rem">
                        <img src=${producto.img} class="card-img-top prod__foto img-fluid" alt="">
                        <div class="card-body">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item prod__descripcion">
                                <h3 class="card-title">${producto.name}</h3>
                                </li>
                                <li class="list-group-item prod__descripcion">${producto.marca}</li>
                                <li class="list-group-item prod__precio">$${producto.price}</li>
                            </ul>
                        </div>
                        <div class="card-footer p-4 pt-0 mt-4 border-top-0 text-center">
                            <button id="add-cart${producto.id}" class="btn btn-outline-dark mt-auto boton__carrito">
                            Agregar al carrito
                            </button>    
                        </div>
                    </div>
                </div>
                `   
            })
            productosFiltrados.forEach((producto) => {
                const botonAgregar = document.getElementById(`add-cart${producto.id}`);
                botonAgregar.addEventListener("click", () => {
            
                    Swal.fire({
                        title: '¡Producto agregado!',
                        text: '',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
            
                    agregarProdAlCarrito(producto.id);
                })
            });
            
        })

}

//*********************/ Generar cards de Productos /************************//

const generarCardsProductos = () => {
    fetch("/productos.json")
        .then((response) => response.json())
        .then((data) => {
            let acumulador = ``;
            data.forEach((producto) =>{
                acumulador += `
                <div class="col-lg-3 col-md-3 col-sm-12">
                    <div class="card prod__card" style="width: 25rem">
                        <img src=${producto.img} class="card-img-top prod__foto img-fluid" alt="">
                        <div class="card-body">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item prod__descripcion">
                                <h3 class="card-title">${producto.name}</h3>
                                </li>
                                <li class="list-group-item prod__descripcion">${producto.marca}</li>
                                <li class="list-group-item prod__precio">$${producto.price}</li>
                            </ul>
                        </div>
                        <div class="card-footer p-4 pt-0 mt-4 border-top-0 text-center">
                            <button id="add-cart${producto.id}" class="btn btn-outline-dark mt-auto boton__carrito">
                            Agregar al carrito
                            </button>    
                        </div>
                    </div>
                </div>`
                
            })
            document.getElementById("cards-productos-filtrados").innerHTML = acumulador;
        })
}
generarCardsProductos();

// *********************/ Llamar a la funcion Agregar al Carrito/************************//
fetch("/productos.json")
    .then((resp) => resp.json())
    .then(data => {
        productosVarios = data;
        productosVarios.forEach((producto) => {
            const botonAgregar = document.getElementById(`add-cart${producto.id}`);
            botonAgregar.addEventListener("click", () => {
        
                Swal.fire({
                    title: '¡Producto agregado!',
                    text: '',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
        
                agregarProdAlCarrito(producto.id);
            })
        });
    
    })

// *****************/ Funcion Agregar al carrito /**********************//

const agregarProdAlCarrito = (prodId) => {
    
    const existeProd = carrito.some ((prod) => prodId === prod.id);
        
    if(existeProd){
        const prodActualizado = carrito.map((el) => {
            
            return prodId === el.id ? {id: el.id, 
                                        name: el.name, 
                                        marca: el.marca, 
                                        price: el.price, 
                                        img: el.img, 
                                        stock: el.stock,
                                        cant: el.cant+1}:el; 
        })
        carrito = prodActualizado;
        
    } else {
        const item = productosVarios.find((prod) => prod.id === prodId);
        carrito.push(item);
    }
    actualizarModalCarrito();
}; 

//************/ Actualizar Modal del carrito /****************//
const actualizarModalCarrito = () => {
    contentCarrito.innerHTML = "";

    carrito.forEach((prod) => {
        contentCarrito.innerHTML +=
                                    `
                                    <td scope="row">#</td>
                                    <td class="table__img">
                                        <img src=/${prod.img} alt="">
                                    </td>
                                    <td>
                                        <p class="table__name">${prod.name}</p><br>
                                        <p class="table__marca">${prod.marca}</p> 
                                    </td>
                                    <td class="table__precio"><p>$${prod.price}</p></td>
                                    <td class="table__cantidad">
                                        <span class="input-group-btn"> 
                                            <button class="btn btn-md btn-danger button__font minus" onclick="decrementarCant(${prod.id})" type="button">-</button> 
                                        </span>
                                        <input type="text" style="width: 8rem; text-align:center" min="1" value= ${prod.cant} oninput="sumaCantidad(${prod.id})">
                                        <span class="input-group-btn"> 
                                            <button class="btn btn-md btn-success button__font plus" onclick="incrementarCant(${prod.id})" type="button">+</button> 
                                        </span>
                                    </td>
                                    <td>
                                        <button onclick="eliminarProd(${prod.id})" class="btn btn-transparent">
                                            <img  class="trash" src="/images/Icon/delete.png" alt="Icono eliminar item del carrito" />
                                        </button>
                                    </td>`
    })  
    localStorage.setItem("carrito", JSON.stringify(carrito));
    document.getElementById("total-carrito").innerText = carrito.length;
    document.getElementById("precioTotal").innerText = carrito.reduce((acc,el) => acc + (el.price*el.cant), 0);
    pintarFooterCarrito();
};


//************/ Actualizar input cantidad del carrito /****************//
const sumaCantidad = (itemId) => {
    const item = carrito.find((prod) => prod.id === itemId);
    const indice = carrito.indexOf(item);
    const nuevaCant = parseInt(document.getElementsByTagName("input")[indice].value);
       
    const cantActualizado = carrito.map((el) => {
        
        return itemId === el.id ? {id: el.id, 
                                    name: el.name, 
                                    marca: el.marca, 
                                    price: el.price, 
                                    img: el.img, 
                                    stock: el.stock,
                                    cant: nuevaCant}:el; 
    })
    if(isNaN(nuevaCant) || nuevaCant < 0){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No ingresaste una cantidad válida!',
            footer: 'Intenta de nuevo.'
          })
        
    }else{
        carrito = cantActualizado;
        actualizarModalCarrito();
    }
}

//****************/ Vaciar el carrito /****************//
botonVaciarCarrito.addEventListener("click", () => {
    Swal.fire({
        title: '¿Está seguro de vaciar el carrito?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, seguro',
        cancelButtonText: 'No, no quiero'
    }).then((result) => {

        if (result.isConfirmed) {
            Swal.fire({
                title: 'Listo!',
                icon: 'success',
                text: 'Se ha vaciado el carrito'
            })
            carrito.splice(0, carrito.length);
            console.log(carrito);
            localStorage.removeItem("carrito");
            actualizarModalCarrito();
        }
    })

})

//************/ Eliminar un producto del carrito /****************//
const eliminarProd = (itemId) => {
    Swal.fire({
        title: '¿Está seguro de eliminar el producto?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, seguro',
        cancelButtonText: 'No, no quiero'
    }).then((result) => {

        if (result.isConfirmed) {
            Swal.fire({
                title: 'Borrado!',
                icon: 'success',
                text: 'El producto ha sido eliminado.'
            })
            const item = carrito.find((prod) => prod.id === itemId);
            const indice = carrito.indexOf(item);
            carrito.splice(indice, 1);
            actualizarModalCarrito();
        }
    })
    console.log(carrito);
};



//*********************** / Mostrar carrito vacío en Modal / **************************************/
const pintarFooterCarrito = () => {
    leyendaCarritoVacio.innerHTML = "";
    if(carrito.length === 0){
        leyendaCarritoVacio.innerHTML = `<p> <b> Su carrito está vacío. </b></p> <img class="cart"  src="/images/Icon/empty-cart.png">`;
    }
}

//************/ Incrementar cantidad con input /****************//
function incrementarCant(itemId){
    const item = carrito.find((prod) => prod.id === itemId);
    const indice = carrito.indexOf(item);
    let campoCantidad = document.getElementsByTagName("input")[indice];
    campoCantidad.value = parseInt(campoCantidad.value) + 1;  
    item.cant++;
   
    actualizarModalCarrito();
}


//************/ Decrementar cantidad con input /****************//
function decrementarCant(itemId){
    const item = carrito.find((prod) => prod.id === itemId);
    const indice = carrito.indexOf(item);
    let campoCantidad = document.getElementsByTagName("input")[indice];
    if(campoCantidad.value < 2){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No ingresaste una cantidad válida!',
            footer: 'Intenta de nuevo.'
          })
        
    }else{
        campoCantidad.value = parseInt(campoCantidad.value) - 1;  
        item.cant--;  
        actualizarModalCarrito();
    }
}
