const API_URL = "https://earthquake.usgs.gov/fdsnws/event/1/query";

async function consumirAPI(endpoint) {

    const respuesta = await fetch(`${API_URL}${endpoint}`)

    const datos = await respuesta.json();

    return datos;

}


async function actividadReciente() {
    const ahora = new Date();
    const hace24h = new Date(ahora.getTime() - 24 * 60 * 60 * 1000);

    let endpoint = `?format=geojson&starttime=${hace24h.toISOString().split("T")[0]}&endtime=${ahora.toISOString().split("T")[0]}`;

    const datos = await consumirAPI(endpoint);

    
    mostrarResultados(datos)

}

function mostrarResultados(datos){
    
    console.log(datos.features)
    const resultado = document.querySelector(".resultados");
    resultado.innerHTML = datos.features.map(feature => `
    <div class="sismos">
        <h3>${feature.properties.mag}</h3>
        <p>${feature.properties.place}</p>
        <p>${new Date(feature.properties.time).toLocaleDateString()}</p>

    </div>
`).join("");
    
}

async function buscarPorMagnitud(param) {

    const magnitud = document.getElementById("input_magnitud").value

    let endpoint = `?format=geojson&minmagnitude=${magnitud}`

    const datos = await consumirAPI(endpoint);

    mostrarResultados(datos)
}

async function buscarPorRango(rango){

    const inicio = document.getElementById("input_inicio").value;
    const final = document.getElementById("input_final").value;

    let endpoint = `?format=geojson&starttime=${inicio}&endtime=${final}`;

    const datos = await consumirAPI(endpoint);

    mostrarResultados(datos)

}