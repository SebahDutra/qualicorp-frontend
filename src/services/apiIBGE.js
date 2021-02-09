import axios from 'axios'

const api = axios.create({
  baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades'
})

const handlerRequestError = (error) => {
  if (error.response) {
    return new Error(error.response.message || error.message)
  }
  return error
}

const getUfs = async () => {
  try {
    const response = await api.get('/estados')
    const ufs = response.data.map((estado) => {
      return {
        id: estado.id,
        sigla: estado.sigla
      }
    })
    return ufs
  } catch (error) {
    throw handlerRequestError(error)
  }
}

const getCidades = async (idUf) => {
  try {
    const response = await api.get(`estados/${idUf}/municipios`)
    const cidades = response.data.map((cidade) => {
      return {
        id: cidade.id,
        nome: cidade.nome
      }
    })
    return cidades
  } catch (error) {
    throw handlerRequestError(error)
  }
}

export default {
  getUfs,
  getCidades
}
