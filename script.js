const API_URL = "https://earthquake.usgs.gov/fdsnws/event/1/query";

async function consumirAPI(endpoint) {

    const respuesta = await fetch(`${API_URL}${endpoint}`)

    const datos = await respuesta.json();

    return datos;

}


async function ActividadReciente() {
    const ahora = new Date();
    const hace24h = new Date(ahora.getTime() - 24 * 60 * 60 * 1000);

    let endpoint = `format=geojson&starttime=${hace24h.toISOString().split("T")[0]}&endtime=${ahora.toISOString().split("T")[0]}`;

    const datos = await consumirAPI(endpoint);

}