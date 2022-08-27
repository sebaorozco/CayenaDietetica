//*********************/ Proyecto Cayena Almacén Dietético - E-commerce /******************************** *//

const contentCarrito = document.getElementById("tbody");
const botonVaciarCarrito = document.getElementById("vaciarCarrito");

let carrito = [];

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("carrito")){
        carrito = JSON.parse(localStorage.getItem("carrito"));
      
        actualizarModalCarrito();
    }
});


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


// *********************/ Generar cards de Productos Destacados/************************//
const generarCardsDestacados = () => {
    fetch("productosDestacados.json")
        .then((response) => response.json())
        .then((informacion) => {
            let acumulador = ``;
            informacion.forEach((producto) =>{
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
            document.getElementById("cards-productos-destacados").innerHTML = acumulador;
        })
}

generarCardsDestacados();

// *********************/ Llamar a la funcion Agregar al Carrito/************************//
fetch("productosDestacados.json")
    .then((resp) => resp.json())
    .then(data => {
        productosDestacados = data;
        productosDestacados.forEach((producto) => {
            const botonAgregar = document.getElementById(`add-cart${producto.id}`);
            botonAgregar.addEventListener("click", () => {
        
                Swal.fire({
                    title: '¡Producto agregado!',
                    text: '',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
        
                agregarAlCarrito(producto.id);
            })
        });
    
    })

// *****************/ Funcion Agregar al carrito /**********************//

const agregarAlCarrito = (prodId) => {
    
    const existeProd = carrito.some ((prod) => prodId === prod.id);
    console.log(existeProd);
        
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
        const item = productosDestacados.find((prod) => prod.id === prodId);
        carrito.push(item);
    }
    
    actualizarModalCarrito();
}; 

//************/ Eliminar producto del carrito /****************//
         
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

};


//************/ Actualizar Modal del carrito /****************//
const actualizarModalCarrito = () => {
    contentCarrito.innerHTML = "";

    carrito.forEach((prod) => {
        contentCarrito.innerHTML +=
                                    `
                                    <td scope="row">#</td>
                                    <td class="table__img">
                                        <img src=${prod.img} alt="">
                                    </td>
                                    <td>
                                        <p class="table__name">${prod.name}</p><br>
                                        <p class="table__marca">${prod.marca}</p> 
                                    </td>
                                    <td class="table__precio"><p>$${prod.price}</p></td>
                                    <td class="table__cantidad">
                                        <input type="number" min="1" value= "${prod.cant}" oninput="sumaCantidad(${prod.id})">
                                    </td>
                                    <td>
                                        <button onclick="eliminarProd(${prod.id})" class="btn btn-transparent">
                                            <img  class="trash" src="images/Icon/delete.png" alt="Icono eliminar item del carrito" />
                                        </button>
                                    </td>`
    localStorage.setItem("carrito", JSON.stringify(carrito));
    })  
    document.getElementById("total-carrito").innerText = carrito.length;
    document.getElementById("precioTotal").innerText = carrito.reduce((acc,el) => acc + (el.price*el.cant), 0);
    
    
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