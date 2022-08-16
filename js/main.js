//*********************************/ 2da entrega del Proyecto /******************************** *//
const productosDestacados = [
    { id: 1, name: "Dulce de leche vegano", marca: "Doña Magdalena.", price: 550, img: "images/Prod/dulce_leche_coco_vegan.jpg", stock: 10, cant: 1},
    { id: 2, name: "Premezcla para Falafel", marca: "Natural Pop.", price: 920, img: "images/Prod/falafel_natural_pop.jpg", stock: 15, cant: 1},
    { id: 3, name: "Levadura nutricional", marca: "Healthy Waw.", price: 489.99, img: "images/Prod/levadura_waw.jpg", stock: 20, cant:1},
    { id: 4, name: "Pasta de almendras s/gluten", marca: "Vrink.", price: 370, img: "images/Prod/pasta_almendras_vrink.jpg", stock: 5, cant:1}
]

const contentCarrito = document.getElementById("tbody");
const botonVaciarCarrito = document.getElementById("vaciarCarrito");





let carrito = [];

window.swal = this.swal = this.Sweetalert2;

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("carrito")){
        carrito = JSON.parse(localStorage.getItem("carrito"));
        console.log(carrito);
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
productosDestacados.forEach((producto) => {
    document.getElementById("cards-productos-destacados").innerHTML +=
        `<div class="card col-lg-4 col-md-3 col-sm-12 prod__card h-100" style="width: 25rem">
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
        </div>`       
});

// *********************/ Llamar a la funcion Agregar al Carrito/************************//

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

// *****************/ Funcion Agregar al carrito /**********************//

const agregarAlCarrito = (prodId) => {
    
    const existeProd = carrito.some ((prod) => prodId === prod.id);
    console.log(existeProd);
        
    if(existeProd){
        const prodActualizado = carrito.map((el) => {
                prodId === el.id && el.cant++; 
        })
    } else {
        console.log(carrito);
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
                                        <input type="number" value= "${prod.cant}">
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
// onchange="cambiarInputCantidad()"
// const cambiarInputCantidad = (e) => {
//     const input = e.target;
//     if(isNaN(input.value) || input.value <= 0){
//         input.value = 1;
//     }             
//     actualizarModalCarrito();
// }
