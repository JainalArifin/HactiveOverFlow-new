import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import swal from 'sweetalert'

const http = axios.create({
  baseURL: 'http://localhost:3000/'
})

Vue.use(Vuex)

const state = {
  allQuestion: [],
  users: [],
  answerId: []
}

const mutations = {
  setQuestion (state, payload) {
    state.allQuestion = payload
  },
  masukRegisteer (state, payload) {
    state.users.push(payload)
  },
  tambahQuestion (state, payload) {
    // alert(JSON.stringify(payload))
    state.allQuestion.push(payload)
    // console.log('---->', JSON.stringify(state.allQuestion))
    // state.allQuestion.unshift(payload)
  },
  removeQuestion (state, payload) {
    const idx = state.allQuestion.findIndex((question) => question._id === payload)
    console.log(idx)
    state.allQuestion.splice(idx, 1)
  },
  dataDapat (state, payload) {
    state.answerId = payload
    this.$router.push('/answer')
  },
  mutationsEdit (state, payload) {
    state.allQuestion = payload
  }
}

const actions = {
  getQuestion ({ commit }) {
    http.get('/question')
    .then(({ data }) => {
      commit('setQuestion', data)
    })
    .catch((err) => console.error(err))
  },
  register ({ commit }, dataRegister) {
    // console.log('tombol register bisa')
    http.post('/users/register', dataRegister)
    .then(({ data }) => {
      console.log('data register yang daftar', data)
      swal('Succes!', 'Data anda sudah di save silahkan CLOSE <===', 'success')
      commit('masukRegisteer', data)
    })
    .catch((err) => console.error(err))
  },
  questionAdd ({ commit }, newQuestion) {
    console.log('log question sudah masu di store', newQuestion)
    http.post('/question', newQuestion, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .then(({ data }) => {
      swal('berhasil menambahkan question', 'silahkan klik  CLOSE <===', 'success')
      console.log('data yang di then ', data)
      commit('tambahQuestion', data)
    })
    .catch((err) => {
      console.error(err)
      swal('anda belum login', 'Silahkan login terlebih dahulu  CLOSE <===', 'warning')
    })
  },
  hapusQuestion ({ commit }, questionId) {
    // console.log(' data yang di dapat', questionId)
    http.delete('/question/' + questionId, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .then(({ data }) => {
      // console.log('ini data yang di dapat -->', data)
      if (data === 'anda tidak boleh meng akses ini') {
        swal('anda tidak punya akses ini', 'terimkasi', 'error')
      } else if (data.msg === 'berhasil di hapus') {
        console.log(data, '<------')
        commit('removeQuestion', data._id)
      } else {
        swal('anda belum login', 'silahkan login terlebih dahulu', 'error')
      }
    })
    .catch((err) => {
      swal('anda tidak punya akses ini', 'terimkasi', 'error')
      console.log('masuk sini')
      console.log(err)
    })
  },
  questionById ({ commit }, dataId) {
    console.log('data id yang tersimpan', dataId)
    // http.get('/question/' + dataId)
    // .then(({ data }) => {
    //   commit('dataDapat', data)
    // })
    // .catch((err) => console.error(err))
    // this.$router.push('/answer')
    // this.answerId.push(dataId)
  },
  editQuestion ({ commit }, dataEdit) {
    // console.log(' masuk sini editnya --->', dataEdit)
    http.put(`/question/${dataEdit._id}`, dataEdit, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .then(({ data }) => {
      // console.log('ketika hasilnya sudah di prose', data)
      if (data === 'anda belum login') {
        swal('anda belum login ', 'silahkan login terlebih dahulu', 'warning')
      } else {
        commit('mutationsEdit', data)
        swal('data berhasil di update', 'silahkan CLICK CLOSE <===', 'success')
      }
    })
    .catch((err) => console.error(err))
  },
  hapusAnswer ({ commit }, dapatId) {
    console.log('------>', dapatId)
    http.delete(`/answer/${dapatId}`, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .then(({ data }) => {
      console.log('hapus answer', data)
      if (data === 'anda tidak boleh meng akses ini') {
        swal('anda tidak boleh meng akses ini', 'ini bukan answer anda silahkan hapus punya anda sendiri', 'error')
      } else if (data === 'anda belum login') {
        swal('anda belum login', 'trimakasi', 'warning')
      } else {
        // console.log('berhasil masuk sini')
        swal('Answer di hapus', 'trimakasi', 'success')
      }
    })
    .catch((err) => {
      console.error(err)
      swal('masuk kesini', 'ke error', 'error')
    })
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
