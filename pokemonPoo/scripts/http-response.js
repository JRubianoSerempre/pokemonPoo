class HttpResponse {
  async get(url) {
    return await fetch(url).then(data => data.json())
  }
}