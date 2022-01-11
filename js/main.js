const d = document,
    $main = d.querySelector("main"),
    $links = d.querySelector(".links");
let pokemons = "https://pokeapi.co/api/v2/pokemon/?offset=40&limit=20";

async function loadPokemons(url) {
    try {

        $main.innerHTML = `<img class="loader" src= "assets/rings.svg" alt ="Cargando..">`;
        let res = await fetch(url),
            json = await res.json(),
            $template = "",
            $prevLink, $nextlink;

        if (!res.ok) throw { status: res.status, statusText: res.statusText }
        for (let i = 0; i < json.results.length; i++) {
            //   console.log(json.results[i]);
            try {
                let res = await fetch(json.results[i].url),
                    pokemon = await res.json();

                if (!res.ok) throw { status: res.status, statusText: res.statusText }
                $template += `
                <figure>
                <img src="${pokemon.sprites.front_default}" alt= "${pokemon.name}">
                <figcaption>${pokemon.name}</figcaption>
                </figure>`;

            } catch (error) {
                console.log(err);
                let msg = err.statusText || "Ocurrio un error";
                $template += `
                <figure>
                <figcaption>${err.status} ${err.msg}</figcaption>
                </figure>`;

            }
        }

        $main.innerHTML = $template;
    } catch (err) {
        console.log(err);
        let msg = err.statusText || "Ocurrio un error";
        $main.innerHTML = ` < p > $ { err.status }: $ { msg } < /p>`
    }
}

d.addEventListener("DOMContentLoaded", e => loadPokemons(pokemons));