const _pokemonService = new PokemonService()
const _httpResponse = new HttpResponse()

_pokemonService.getAll()
  .then(data => {
    renderList(data.results)
  }).catch(error => {
    throw new Error(error)
  })

function renderList(list = []) {
  const search = document.createElement('div');
        search.textContent = "Hello";
    document.querySelector('body').appendChild(search)

  const cardContainer = document.querySelector('.cards-container')
  list.forEach(async element => {
    //fetching pokemon info
    const pokemonInfo = await _httpResponse.get(element.url)


    pokemon = {
      name : pokemonInfo.name,
      img  : pokemonInfo.sprites.front_default,
      id   : pokemonInfo.id,
      type : pokemonInfo.types[0].type.name
    } 
    //define colors for any type of pokemon
    const colors = {
      fire      : '#FFA05D',
      grass     : '#8FD594',
      electric  : '#FFE43B',
      water     : '#7E97C0',
      ground    : '#CAAC4D',
      rock      : '#90642D',
      poison    : '#9D5B9B',
      bug       : '#EAFD71',
      dragon    : '#97b3e6',
      psychic   : '#FF96B5',
      flying    : '#CDCDCD',
      fighting  : '#FF5D5D',
      normal    : '#FFFFFF',
      fairy     : '#9D5B9B73'
    }
    //creating card for pokemon
    const card = document.createElement('div')
          card.classList.add('pokemon-card')
          card.setAttribute("style",`background-color: ${colors[pokemon.type]};`)
          
          
    //create image preview for pokemon 
    const image = document.createElement('img')
    image.src=pokemonInfo.sprites.front_default
    //append image to the card
    card.appendChild(image)
    //Create <a> link to info
    const infoLink = document.createElement('a')
    infoLink.href =`/pages/pokemon.html?pokemonId=${pokemonInfo.id}`
    // Creating paragraph for id
    const id = document.createElement('p')
    id.textContent = `N.${('00'+pokemon.id).slice(-3)}`
    // Creating paragraph for name
    const name = document.createElement('p')
    name.textContent = `${pokemon.name.charAt(0).toUpperCase()+ pokemon.name.slice(1)}`
    //append id and name to infoLink
    infoLink.appendChild(id)
    infoLink.appendChild(name)

    //append nameLink to the card
    card.appendChild(infoLink)
    cardContainer.appendChild(card)
  })
}