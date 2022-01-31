const API_URL = 'https://pokeapi.co/api/v2/'

class PokemonService {//declare new class POKEMON
  url = API_URL
  //use _ to instance new class with the first letter in Uppercase
  _domManipulate = new DomManipulate();
  _httpResponse = new HttpResponse();
  //Method to callPokemon
  async getByIdOrName(value) {
    try {
      const response = await this._httpResponse.get(`${this.url}pokemon/${value}`);
      return response;
    } catch (error) {
      console.error('[PokemonService - getByIdOrName]:', error);
    }
  }
  async getAll() {
    try {
      const response = this._httpResponse.get(`${this.url}pokemon`);
      return response;
    } catch (error) {
      console.error('[PokemonService - getAll]:', error)
    }
  }
  async getAbilityDetail(value) {
    try {
      const response = await this._httpResponse.get(`${this.url}ability/${value}`);
      return response;
    } catch (error) {
      console.error('[PokemonService - getAbilityDetail]:', error)
    }
  }

}