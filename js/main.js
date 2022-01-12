const d = document,
    $shows = d.getElementById("shows"),
    $template = d.getElementById('show-template').content,
    $fragment = d.createDocumentFragment();

d.addEventListener("keypress", async e => {
    if (e.target.matches("#search")) {
        if (e.key === "Enter") { //get-api
            try {
                $shows.innerHTML = `<img class ="loader" src="./assets/circles.svg" alt="Cargando ...">`;
                let query = e.target.value.toLowerCase(),
                    api = `https://api.tvmaze.com/search/shows?q=${query}`;
                res = await fetch(api),
                    json = await res.json();

                console.log(api, res, json);
                if (!res.ok) throw { status: res.status, statusText: res.statusText }
                if (json.length === 0) {
                    $shows.innerHTML = `<h2>No existen resultados para el criterio de busqueda : <mark>${query}</mark></h2>`
                } else {
                    json.forEach(element => {
                        $template.querySelector("h3").textContent = element.show.name;
                        $template.querySelector("div").innerHTML = element.show.summary ? element.show.summary : "Sin descripción";
                        $template.querySelector("img").src = element.show.image ? element.show.image.medium : "Sin imagen"
                        $template.querySelector("img").alt = element.show.name;
                        $template.querySelector("img").style.maxWidth = "100%";
                        $template.querySelector("a").href = element.show.url ? element.show.url : "#";
                        $template.querySelector("a").target = element.show.url ? "__blank" : "_self";
                        $template.querySelector("a").textContent = element.show.url ? "Ver mas" : "";


                        let $clone = d.importNode($template, true);
                        $fragment.appendChild($clone);
                    });
                    $shows.innerHTML = "";
                    $shows.appendChild($fragment);
                }
            } catch (error) {
                console.log(error);
                let mensaje = error.statusText || "Ocurrio un error";
                $shows.innerHTML = `<p>Error ${error.status} : ${mensaje}</p>`;
            }
        }
    }
})