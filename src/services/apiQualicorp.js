import axios from 'axios'

const api = axios.create({
  baseURL: 'http://lb-aws-1105894158.sa-east-1.elb.amazonaws.com'
})

const handlerRequestError = (error) => {
  if (error.response) {
    return new Error(error.response.data.message || error.response.message || error.message)
  }
  return error
}

const getProfissoes = async (uf, cidade) => {
  try {
    const params = { 'api-key': 'ddd70c32-fc98-4618-b494-a9698f824353' }
    const response = await api.get(`/profissao/${uf}/${cidade.replace("'", '')}`, { params })
    return response.data.map((el) => el.profissao)
  } catch (error) {
    throw handlerRequestError(error)
  }
}

const getEntidades = async (profissao, uf, cidade) => {
  try {
    const params = { 'api-key': '4b94dba2-5524-4632-939b-92df1c50a645' }
    const response = await api.get(`/entidade/${profissao}/${uf}/${cidade.replace("'", '')}`, { params })
    return response.data.map((el) => el.NomeFantasia)
  } catch (error) {
    throw handlerRequestError(error)
  }
}

const getPlanos = async (uf, cidade, entidade, dataNascimento) => {
  try {
    const options = {
      headers: { 'Content-Type': 'application/json' },
      params: { 'api-key': '261fd4d0-fd9f-468a-afa9-f5a89ed3701c' }
    }
    const body = {
      uf,
      cidade,
      entidade,
      datanascimento: [dataNascimento]
    }
    console.log(body)
    const response = await api.post('/plano', body, options)
    return response.data.planos
  } catch (error) {
    throw handlerRequestError(error)
  }
}

export default {
  getProfissoes,
  getEntidades,
  getPlanos
}
