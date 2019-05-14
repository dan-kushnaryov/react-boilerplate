const url = 'https://jsonplaceholder.typicode.com'

export default {
  getAll: async () => {
    const response = await window.fetch(`${url}/todos`)

    return response.json()
  },
}
