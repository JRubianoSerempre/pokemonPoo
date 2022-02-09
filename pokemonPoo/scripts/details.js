const url = new URLSearchParams(window.location.search);
const _pokemonService = new PokemonService();
const _domManipulate = new DomManipulate();

const pokemonId = url.get('pokemonId');

if (!pokemonId || !pokemonId.trim().length) {
      window.location.href = '/index.html'
}

function renderPokemonAbilities({name, effect_entries}, domElementFather){
      const tr = document.createElement('tr');
      effect_entries.forEach(item=>{
            const abilityName = document.createElement('td');
                  abilityName.style.fontWeight = 900
                  abilityName.innerHTML = `${name.toUpperCase()}`; 
            if(item.language.name == 'en') {
            const abilityDetail = document.createElement('td');
                  abilityDetail.innerHTML = `${item.effect}`
                  tr.appendChild(abilityName);
                  tr.appendChild(abilityDetail);
            }
      })
      domElementFather.appendChild(tr);
}

async function getAbilities(ability, tbody){
      await _pokemonService.getAbilityDetail(ability)
            .then(data=> renderPokemonAbilities(data,tbody))
            .catch(error => console.error(error))
}


function renderPokemon({ id, name, base_experience, types, weight, sprites, height, abilities, stats}) {

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
            fairy     : '#9D5B9B73',
            steel     : '#9EB7B8',
            ghost     : '#7B62A3'
      }

      const pokemonInfo = document.createElement('div');
            pokemonInfo.classList.add('info');
            pokemonInfo.setAttribute('style',` overflow-y:scroll
                                    `)

            const container = document.createElement('div');
                  container.classList.add('pokemon')
            
            const title = document.createElement('h1');
                  title.textContent = `N.${('00'+id).slice(-3)}: ${name.charAt(0).toUpperCase()+ name.slice(1)}`;
                  title.classList.add('pokemon__title');

            const img = document.createElement('img');
                  img.src = `${sprites.other["official-artwork"].front_default}`;
                  img.setAttribute('style',`
                                          image-rendering: pixelated;
                                          width:300px;
                  `)

            const typesContainer = document.createElement('div')
                  typesContainer.classList.add('pokemon__types')
                  types.forEach(id => {
                  const typeContainer = document.createElement('div');
                        typeContainer.textContent = `${id.type.name.toUpperCase()}`;
                        typeContainer.setAttribute('style',`background: ${colors[id.type.name]};`)
                        typesContainer.appendChild(typeContainer)
                        })
      //Obtaining info from pokemon
            const infoUl = document.createElement('ul');
                  infoUl.classList.add('pokemon__info');
                  const pokemonXp = document.createElement('li');
                        pokemonXp.innerHTML = `<b>XP</b>:\xa0\xa0\xa0 ${base_experience}`;
                  const pokemonWeight = document.createElement('li');
                        pokemonWeight.innerHTML = `<b>Weight</b>:\xa0\xa0\xa0 ${weight / 10} kg`;
                  const pokemonHeight = document.createElement('li');
                        pokemonHeight.innerHTML = `<b>Height</b>:\xa0\xa0\xa0 ${height / 10} m`;
                  const pokemonAbilities = document.createElement('li');
                        pokemonAbilities.classList.add('pokemon__info-abilities');
                        pokemonAbilities.textContent = "ABILITIES";
                        const abilitiesTable = document.createElement('table');
                              const tbody = document.createElement('tbody');
                              abilities.forEach( id =>getAbilities(id.ability.name,tbody))

                              abilitiesTable.appendChild(tbody)  
                        pokemonAbilities.appendChild(abilitiesTable)
                  infoUl.appendChild(pokemonXp)
                  infoUl.appendChild(pokemonWeight)
                  infoUl.appendChild(pokemonHeight)
                  infoUl.appendChild(pokemonAbilities)

      ///BASIC STATS FOR POKEMON
            const basicStatsContainer = document.createElement('div');
                  basicStatsContainer.classList.add('pokemon__stats');
                  const statsTitle = document.createElement('h2');
                        statsTitle.textContent =`Basic Stats`;
                  const statsTable = document.createElement('table');
                        statsTable.classList.add('stats');

                        const tbodyStats =  document.createElement('tbody');
                              const statsValue = stats.map(id =>{
                                    return id.base_stat
                              })
                              let statHigher = statsValue.sort((a, b) => {return b - a;})[0];
                              stats.forEach(id => {
                                    const trStats = document.createElement('tr');
                                          let barFillPercentage = 0;
                                          if(statHigher>100){
                                                barFillPercentage = id.base_stat*100/statHigher;
                                          }else{
                                                barFillPercentage = 1
                                          }
                                          const tdStatName = document.createElement('td');
                                                tdStatName.classList.add('stats__name')
                                                tdStatName.textContent = `${id.stat.name.toUpperCase()}`;

                                          const tdStatValue = document.createElement('td');
                                                tdStatValue.classList.add('stats__value')
                                                const statBar = document.createElement('div');
                                                      statBar.classList.add('stats__bar');
                                                      const statBarFilled = document.createElement('div');
                                                            statBarFilled.classList.add('stats__bar-filled');
                                                            statBarFilled.textContent = `${id.base_stat}`;
                                                            statBarFilled.setAttribute('style',`width: ${statHigher>100 ? barFillPercentage: id.base_stat}%;
                                                                                                background: ${colors[types[0].type.name]};
                                                                                                `)
                                                      statBar.appendChild(statBarFilled);
                                                tdStatValue.appendChild(statBar)

                                          trStats.appendChild(tdStatName);
                                          trStats.appendChild(tdStatValue);
                                    tbodyStats.appendChild(trStats)
                              })
                        statsTable.appendChild(tbodyStats)

                  basicStatsContainer.appendChild(statsTitle)
                  basicStatsContainer.appendChild(statsTable)


            container.appendChild(title);
            container.appendChild(img);
            container.appendChild(typesContainer);
            container.appendChild(infoUl);
            container.appendChild(basicStatsContainer)
            pokemonInfo.appendChild(container);
      _domManipulate.render(pokemonInfo, 'body')
      const body = document.querySelector('body')
            body.setAttribute('style',`background: linear-gradient(${colors[types[0].type.name]},rgb(200, 211, 196))`)
}

_pokemonService.getByIdOrName(pokemonId)
      .then(data => {
      renderPokemon(data)
      })
      .catch(error => console.error(error))