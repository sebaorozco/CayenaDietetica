const prodFiltrado = document.getElementById("cards-productos-filtrados");


// *********************/ Hacer dinamico el filtro por categorias /************************//

const listCategoria = document.getElementsByClassName("filtrar-category");

for (const nodoHTML of listCategoria){
    nodoHTML.addEventListener("click", (event) =>{
        const categoria = event.target.getAttribute("data-category");
        filtrarProductosPorCategoria(categoria);
    })
}

// *********************/ Generar cards de Productos Filtrados/************************//

function filtrarProductosPorCategoria(categoria) {
    
    fetch("../productos.json")
        .then((response) => response.json())
        .then((prod) => {
            const productosFiltrados = prod.filter((producto) => producto.category === categoria);
            console.log(productosFiltrados);
            prodFiltrado.innerHTML = "";
            productosFiltrados.forEach((producto) =>{
                prodFiltrado.innerHTML += `
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
                </div>
                `   
            })
            
        })
}

//*********************/ Generar cards de Productos /************************//

const generarCardsProductos = () => {
    fetch("../productos.json")
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
