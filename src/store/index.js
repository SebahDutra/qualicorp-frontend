import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    parametros: {
      uf: null,
      cidade: null,
      profissao: null,
      entidade: null,
      dataNascimento: null
    },
    planos: []
  },

  mutations: {
    setUf (state, uf) {
      state.parametros.uf = uf
    },
    setCidade (state, cidade) {
      state.parametros.cidade = cidade
    },
    setProfissao (state, profissao) {
      state.parametros.profissao = profissao
    },
    setEntidade (state, entidade) {
      state.parametros.entidade = entidade
    },
    setDataNascimento (state, dataNascimento) {
      state.parametros.dataNascimento = dataNascimento
    },
    setParametros (state, parametros) {
      state.parametros = parametros
    },
    setPlanos (state, planos) {
      state.planos = planos
    }
  }
})
