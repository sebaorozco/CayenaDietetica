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

const carrito = [];

function agregarAlCarrito(producto, stock, cantidadDeseada){
    const stockReal = validarStock(stock);
    const costoFinal = parseInt(validarCosto(cantidadDeseada, precio));
    if(stockReal === "Tenemos stock"){
        if(cantidadDeseada <= stock){
            for(let i=0; i< cantidadDeseada; i++){
                carrito.push(producto);    
            } 
            console.log("Agregaste "+ cantidadDeseada + " unidades del producto: "+ producto + " al carrito. El costo total es: $" + costoFinal);
            } else{
                console.log("Lo sentimos, no contamos con el stock suficiente del producto seleccionado. Seleccione menos unidades.");
            } 
        }else{
            console.log("Lo sentimos, no contamos con stock del producto seleccionado.");    
        }
    
    console.log(carrito);
}

function validarStock(stock){
    if(stock > 0){
        return "Tenemos stock";

    } else{
        return "No tenemos stock";
    }
}

function validarCosto(cantidadDeseada, precio){
    return cantidadDeseada * precio;
}

function borrarProducto(producto){
    const indice = carrito.indexOf(carrito);
    carrito.splice(indice,1);
    console.log(carrito);
}

const cantidadStock = prompt("¿Cuanto de stock tiene el producto Dulce de leche vegano?: ");
const cantidadDeseada = prompt("¿Cuántas unidades de Dulce de leche vegano desea?: ");
const precio = 550;
agregarAlCarrito("Dulce de Leche Vegano", cantidadStock, cantidadDeseada);
borrarProducto("Dulce de leche Vegano");