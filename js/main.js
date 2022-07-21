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
const productos = [ {id: 1, name: "Dulce de leche vegano", price: 550, stock: 10},
{id: 2, name: "Premezcla para Falafel", price: 920, stock: 15},
{id: 3, name: "Levadura nutricional", price: 489.99, stock: 20},
{id: 4, name: "Pasta de almendras s/gluten", price: 370, stock: 5}]

let carrito = []; 
   
const miCompra = parseInt(prompt("Ingrese el id del producto que desea comprar: \n 1-Dulce de leche vegano. \n 2-Premezcla para Falafel. \n 3-Levadura nutricional. \n 4-Pasta de almendras s/gluten."));
const resultado = productos.find((el) => el.id === miCompra);

function agregarAlCarrito(producto, cantidadDeseada){
     
    let miVenta = {
        producto: producto.name, stockActual: producto.stock, cantVendida: cantidadDeseada, costo: producto.price * cantidadDeseada
    }

    carrito.push(miVenta); 
    console.log("Usted agregó "+ miVenta.cantVendida +" "+ miVenta.producto + " a su carrito. El costo total es: $" + miVenta.costo);
    console.log(carrito);
}
    
function validarStock(resultado, cantidadDeseada){
    if(resultado.stock > 0){
        if(cantidadDeseada<=resultado.stock){
            resultado.stock = resultado.stock - cantidadDeseada;
            return "Tenemos stock";
        }else{
            console.log("Lo sentimos, no contamos con el stock suficiente del producto seleccionado. Seleccione menos unidades.");
        }
    } else{
        return "No tenemos stock";
    }
}

if (isNaN(miCompra)){
    alert("No ingresó un número.");
}else if((miCompra > 4) || (miCompra === 0)){
    alert("Ingresó un número incorrecto");
}else{    
    const cantidadDeseada = parseInt(prompt("¿Cuántas unidades de "+ resultado.name + " desea?: "));
    validarStock(resultado, cantidadDeseada);
    agregarAlCarrito(resultado,cantidadDeseada);
}
