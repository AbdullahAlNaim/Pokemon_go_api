async function gottem(url = "") {
    const response = await fetch(url)
    const data = await response.json();
    console.log(data);
}

gottem('https://pogoapi.net/api/v1/pokemon_names.json');

gottem('https://pogoapi.net/api/v1/released_pokemon.json');