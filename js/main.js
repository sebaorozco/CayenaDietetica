//***********************************************Desafio 2********************************* */
// function agregarAlCarrito(producto, stock, cantidadDeseada){
//     const stockReal = validarStock(stock);
//     const costoFinal = parseInt(validarCosto(cantidadDeseada, precio));
//     if(stockReal === "Tenemos stock"){
//         if(cantidadDeseada <= stock){
//             console.log("Agregaste "+ cantidadDeseada + " unidades del producto: "+ producto + " al carrito. El costo total es: $" + costoFinal);
//             } else{
//                 console.log("Lo sentimos, no contamos con el stock suficiente del producto seleccionado. Seleccione menos unidades.");
//             } 
//         }else{
//             console.log("Lo sentimos, no contamos con stock del producto seleccionado.");    
//         }
// }

// function validarStock(stock){
//     if(stock > 0){
//         return "Tenemos stock";

//     } else{
//         return "No tenemos stock";
//     }
// }

// function validarCosto(cantidadDeseada, precio){
//     return cantidadDeseada * precio;
// }


// const cantidadStock = prompt("Cuanto de stock tiene este producto?: ")
// const cantidadDeseada = prompt("Cuántas unidades de este producto desea?: ")
// const precio = 550;
// agregarAlCarrito("Dulce de Leche Vegano", cantidadStock, cantidadDeseada);

//******************Desafio 3 - Incorporo ARRAYS***************************************** */

// const carrito = [];

// function agregarAlCarrito(producto, stock, cantidadDeseada){
//     const stockReal = validarStock(stock);
//     const costoFinal = parseInt(validarCosto(cantidadDeseada, precio));
//     if(stockReal === "Tenemos stock"){
//         if(cantidadDeseada <= stock){
//             for(let i=0; i< cantidadDeseada; i++){
//                 carrito.push(producto);    
//             } 
//             console.log("Agregaste "+ cantidadDeseada + " unidades del producto: "+ producto + " al carrito. El costo total es: $" + costoFinal);
//             } else{
//                 console.log("Lo sentimos, no contamos con el stock suficiente del producto seleccionado. Seleccione menos unidades.");
//             } 
//         }else{
//             console.log("Lo sentimos, no contamos con stock del producto seleccionado.");    
//         }

//     console.log(carrito);
// }

// function validarStock(stock){
//     if(stock > 0){
//         return "Tenemos stock";

//     } else{
//         return "No tenemos stock";
//     }
// }

// function validarCosto(cantidadDeseada, precio){
//     return cantidadDeseada * precio;
// }

// function borrarProducto(producto){
//     const indice = carrito.indexOf(carrito);
//     carrito.splice(indice,1);
//     console.log(carrito);
// }

// const cantidadStock = prompt("¿Cuanto de stock tiene el producto Dulce de leche vegano?: ");
// const cantidadDeseada = prompt("¿Cuántas unidades de Dulce de leche vegano desea?: ");
// const precio = 550;
// agregarAlCarrito("Dulce de Leche Vegano", cantidadStock, cantidadDeseada);
// borrarProducto("Dulce de leche Vegano");

// ***************************Primera Entrega Proyecto Final*****************************
// const productos = [ {id: 1, name: "Dulce de leche vegano", price: 550, stock: 10},
// {id: 2, name: "Premezcla para Falafel", price: 920, stock: 15},
// {id: 3, name: "Levadura nutricional", price: 489.99, stock: 20},
// {id: 4, name: "Pasta de almendras s/gluten", price: 370, stock: 5}]

// let carrito = []; 

// const miCompra = parseInt(prompt("Ingrese el id del producto que desea comprar: \n 1-Dulce de leche vegano. \n 2-Premezcla para Falafel. \n 3-Levadura nutricional. \n 4-Pasta de almendras s/gluten."));
// const resultado = productos.find((el) => el.id === miCompra);

// function agregarAlCarrito(producto, cantidadDeseada){

//     let miVenta = {
//         producto: producto.name, stockActual: producto.stock, cantVendida: cantidadDeseada, costo: producto.price * cantidadDeseada
//     }

//     carrito.push(miVenta); 
//     console.log("Usted agregó "+ miVenta.cantVendida +" "+ miVenta.producto + " a su carrito. El costo total es: $" + miVenta.costo);
//     console.log(carrito);
// }

// function validarStock(resultado, cantidadDeseada){
//     if(resultado.stock > 0){
//         if(cantidadDeseada<=resultado.stock){
//             resultado.stock = resultado.stock - cantidadDeseada;
//             return "Tenemos stock";
//         }else{
//             console.log("Lo sentimos, no contamos con el stock suficiente del producto seleccionado. Seleccione menos unidades.");
//         }
//     } else{
//         return "No tenemos stock";
//     }
// }

// if (isNaN(miCompra)){
//     alert("No ingresó un número.");
// }else if((miCompra > 4) || (miCompra === 0)){
//     alert("Ingresó un número incorrecto");
// }else{    
//     const cantidadDeseada = parseInt(prompt("¿Cuántas unidades de "+ resultado.name + " desea?: "));
//     validarStock(resultado, cantidadDeseada);
//     agregarAlCarrito(resultado,cantidadDeseada);
// }
// ***************************Desafio Interactuar con HTML *****************************
// const productos = [ 
//     {id: 1, name: "Dulce de leche vegano", price: 550, stock: 10},
//     {id: 2, name: "Premezcla para Falafel", price: 920, stock: 15},
//     {id: 3, name: "Levadura nutricional", price: 489.99, stock: 20},
//     {id: 4, name: "Pasta de almendras s/gluten", price: 370, stock: 5}]

// let carrito = []; 


// const miCompra = parseInt(prompt("Ingrese el id del producto que desea comprar: \n 1-Dulce de leche vegano. \n 2-Premezcla para Falafel. \n 3-Levadura nutricional. \n 4-Pasta de almendras s/gluten."));
// const resultado = productos.find((el) => el.id === miCompra);

// function agregarAlCarrito(producto, cantidadDeseada){

//     let miVenta = {
//         producto: producto.name, 
//         stockActual: producto.stock, 
//         cantVendida: cantidadDeseada, 
//         costo: producto.price * cantidadDeseada}


//     carrito.push(miVenta); 
//     let compra = document.querySelector("#botonCarrito");
//     let contenedor = document.createElement("div");
//     contenedor.innerHTML = `<h3> Usted compró: ${miVenta.producto}<h3>
//                             <p> El costo total de su compra es: $ ${miVenta.costo}<p>`
//     compra.appendChild(contenedor);
// }


// function validarStock(resultado, cantidadDeseada){
//     if(resultado.stock > 0){
//         if(cantidadDeseada<=resultado.stock){
//             resultado.stock = resultado.stock - cantidadDeseada;
//             return "Tenemos stock";
//         }else{
//             console.log("Lo sentimos, no contamos con el stock suficiente del producto seleccionado. Seleccione menos unidades.");
//         }
//     } else{
//         return "No tenemos stock";
//     }
// }

// if (isNaN(miCompra)){
//     alert("No ingresó un número.");
// }else if((miCompra > 4) || (miCompra === 0)){
//     alert("Ingresó un número incorrecto");
// }else{    
//     const cantidadDeseada = parseInt(prompt("¿Cuántas unidades de "+ resultado.name + " desea?: "));
//     validarStock(resultado, cantidadDeseada);
//     agregarAlCarrito(resultado,cantidadDeseada);
// }

/*********************************2da entrega del Proyecto******************************** */
const productos = [
    { id: 1, name: "Dulce de leche vegano", description: "Doña Magdalena.", price: 550, img: "images/Prod/dulce_leche_coco_vegan.jpg", stock: 10 },
    { id: 2, name: "Premezcla para Falafel", description: "Natural Pop.", price: 920, img: "images/Prod/falafel_natural_pop.jpg", stock: 15 },
    { id: 3, name: "Levadura nutricional", description: "Healthy Waw.", price: 489.99, img: "images/Prod/levadura_waw.jpg", stock: 20 },
    { id: 4, name: "Pasta de almendras s/gluten", description: "Vrink.", price: 370, img: "images/Prod/pasta_almendras_vrink.jpg", stock: 5 }
]

let total = 0;
const carrito = JSON.parse(localStorage.getItem("carrito")) ?? [];
document.getElementById("total-carrito").innerHTML = carrito.length;


// **********/ Agregar cards de productos /*************//
productos.forEach((producto) => {
    const idButton = `add-cart${producto.id}`;
    document.getElementById("section-cards").innerHTML +=
        `<div class="col-lg-3 col-md-6 col-sm-12 card prod__card h-100" style="width: 25rem">
        <img src=${producto.img} class="card-img-top prod__foto img-fluid" alt="">
        <ul class="list-group list-group-flush">
            <li class="list-group-item prod__descripcion">
                <h3 class="card-title">${producto.name}</h3>
            </li>
            <li class="list-group-item prod__descripcion">${producto.description}</li>
            <li class="list-group-item prod__precio">$${producto.price}</li>
        </ul>
        <div class="card-footer p-4 pt-0 mt-4 border-top-0 bg-transparent">
            <div class="text-center">
                <button class="btn btn-outline-dark mt-auto boton__carrito" id="${idButton}">Agregar al carrito</button>
            </div>
        </div>
    </div>`
});

//************/ Agregar al carrito /****************//
productos.forEach((producto) => {
    const idButton = `add-cart${producto.id}`;
    document.getElementById(idButton).addEventListener("click", () => { 
        const newItem = {
            img: producto.img,
            title: producto.name,
            precio: producto.price,
            cantidad: 1
        } 
        carrito.push(newItem);
        document.getElementById("total-carrito").innerHTML = carrito.length;
        localStorage.setItem("carrito", JSON.stringify(carrito));
        modalCarrito(newItem);
        totalCarrito(newItem);         
    })
})   


//************/ Modal del carrito /****************//
function modalCarrito(item) {
    var content = document.getElementById("tbody").innerHTML +=
                                `
                                <th scope="row">1</th>
                                <td class="table__productos">
                                    <img src=${item.img} alt="">
                                    <h6 class="title">${item.title}</h6>
                                </td>
                                <td class="table__precio"><p>$${item.precio}</p></td>
                                <td class="table__cantidad">
                                    <input type="number" min="1" value=${item.cantidad} id="input__elemento">
                                    <button class="btn btn-transparent" id="delete">
                                        <img class="trash" src="images/Icon/delete.png" alt="Icono eliminar item del carrito" />
                                    </button>
                                </td>`
    // localStorage.setItem("modalCart", JSON.stringify(carrito));  
}

//************/ Acumulador del total a pagar del carrito /****************//
function totalCarrito(item){
    total = total + item.precio;
    const itemCartTotal = document.querySelector('.itemCartTotal')
    itemCartTotal.innerHTML = `<h3 class=" text-black">Total: $${total}</h3>`    
}

//************/ Eliminar producto del carrito /****************//


        



