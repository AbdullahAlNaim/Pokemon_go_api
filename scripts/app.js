const finding = document.querySelector('#finding');
const dex = document.querySelector('#dex');

const shinyWild = document.querySelector('#shiny-wild');
const shinyReseach = document.querySelector('#shiny-research');
const shinyRaids = document.querySelector('#shiny-raids');
const shinyEggs = document.querySelector('#shiny-eggs');
const shinyEvo = document.querySelector('#shiny-evo');
const shinyPhoto = document.querySelector('#shiny-photo');

const pokemonName = document.querySelector('#pokemon_name');

const baseAttack = document.querySelector('#base-attack');
const baseDefense = document.querySelector('#base-defense');
const baseStamina = document.querySelector('#base-stamina');

const maxCP = document.querySelector('#maxcp');

const show = document.querySelector('#showImg');

async function gottem() {
    const response = await fetch('https://pogoapi.net/api/v1/pokemon_names.json')
    const data = await response.json()
    return data;
}

async function shinyFound(id) {
    const response = await fetch('https://pogoapi.net/api/v1/shiny_pokemon.json');
    const data = await response.json();
    return data[id];
}

async function baseStats() {
    const response = await fetch('https://pogoapi.net/api/v1/pokemon_stats.json');
    const data = await response.json();
    return data;
}

async function maxcp() {
    const response = fetch('https://pogoapi.net/api/v1/pokemon_max_cp.json')
    const data = (await response).json();
    return data;
}

async function showing(id) {
    const response = fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = (await response).json();
    return data;
}

finding.addEventListener('submit', (e) => {
    e.preventDefault();

    let finder = dex.value;

    const poke = gottem(finder)
        //.then(data => pokemonName.innerHTML = data)
        .then(function (data) {
            //console.log(data['1']);
            for (let x = 1; x < 999; x++) {
                if (data[`${x}`]['name'] == finder) {
                    console.log(data[`${x}`])
                    finder = data[`${x}`]['id'];
                    return finder
                }
            }
        }).then(() => {

            const shine = shinyFound(finder)
                .then(function (data) {
                    shinyWild.innerHTML = data['found_wild'];
                    shinyReseach.innerHTML = data['found_research'];
                    shinyRaids.innerHTML = data['found_raid'];
                    shinyEggs.innerHTML = data['found_egg'];
                    shinyEvo.innerHTML = data['found_evolution'];
                    shinyPhoto.innerHTML = data['found_photobomb'];
                    //console.log(data)
                })
        }).then(() => {

            const stats = baseStats()
                .then(function (data) {
                    //console.log(data)
                    return data;
                }).then(function (data) {
                    for (let x = 1; x < data.length; x++) {
                        if (data[x]['pokemon_id'] == finder) {
                            //console.log(finder, data[x])
                            baseAttack.innerHTML = data[x]['base_attack'];
                            baseDefense.innerHTML = data[x]['base_defense'];
                            baseStamina.innerHTML = data[x]['base_stamina'];
                        }
                    }
                })
        }).then(() => {

            const max = maxcp()
                .then(function (data) {
                    for (let x = 0; x < data.length; x++) {
                        if (data[x]['pokemon_id'] == finder) {
                            maxCP.innerHTML = data[x]['max_cp'];
                        }
                    }
                })
        }).then(() => {



            const img = showing(finder)
                .then(function (data) {
                    show.src = data['sprites']['front_default']
                    //show.src = data;
                })
        })

})

//gottem('https://pogoapi.net/api/v1/released_pokemon.json');