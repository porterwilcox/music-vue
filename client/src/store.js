import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import Axios from 'axios'
import Song from './models/song'

let itunesApi = Axios.create({
  baseURL: `https://itunes.apple.com/search?term=`,
  timeout: 3000
})
let musicDB = Axios.create({
  baseURL: `//localhost:3000`,
  timeout: 3000,
  withCredentials: true
})
let auth = Axios.create({
  baseURL: `//localhost:3000/auth`,
  timeout: 3000,
  withCredentials: true
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    itunesSongs: [],
    songs: [],
    user: {}
  },
  mutations: {
    setItunesSongs(state, songs) {
      state.itunesSongs = songs
    },
    setSongs(state, songs) {
      state.songs = songs
    },
    setUser(state, user) {
      state.user = user
    }
  },
  actions: {
    //ITUNES
    search({ commit }, artist) {
      itunesApi.get(`/${artist}`)
        .then(res => {
          console.log(res)
          let songs = res.data.results.map(s => new Song(s))
          commit('setItunesSongs', songs)
        })
      },
      //USERS
      authenticate({ commit, dispatch }) {
        auth.get('authenticate')
          .then(res => {
            console.log(res)
            commit('setUser', res.data)
            dispatch("getSongs")
          })
          .catch(err => console.error(err))
      },
      register({ commit }, payload) {
        auth.post('/register', payload)
          .then(res => {
            console.log(res)
            commit('setUser', res.data)
          })
      },
      login({ commit, dispatch }, payload) {
        auth.post(`/login`, payload)
          .then(res => {
            console.log(res)
            commit('setUser', res.data)
            dispatch('getSongs')
          })
          .catch(() => alert("username or password incorrect"))
      },
      logout({ commit }) {
        auth.delete('logout')
          .then(res => {
            commit("setUser", {});
          })
      },
    //SONGS
    getSongs({ commit }, uid) {
      musicDB.get(`/songs`)
        .then(res => {
          console.log(res)
          commit('setSongs', res.data)
        })
        .catch(e => console.error(e))
    },
    addSong({ commit }, song) {
      musicDB.post(`/songs`, song)
        .then(res => {
          commit('addSong', res.data)
        })
        .catch(e => console.error(e))
    }
  }
})
