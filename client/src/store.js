import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import Song from './models/song'

let itunesApi = Axios.create({
  baseURL: `https://itunes.apple.com/search?term=`,
  timeout: 3000
})
let musicDB = Axios.create({
  baseURL: `//localhost:3000`,
  timeout: 3000
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    songs: undefined
  },
  mutations: {
    setSongs(state, songs){
      state.songs = songs
    }
  },
  actions: {
    getSongs({dispatch, commit}){
      musicDB.get('/songs')
        .then(res => {
          console.log(res)
          commit('setSongs', res.data)
        })
    },
    search({dispatch, commit}, artist) {
      itunesApi.get(`/${artist}`)
        .then(res => {
          let musicArr = res.data.results.map(s => new Song(s))
          console.log(musicArr)
          commit('setSongs', musicArr)          
        })
    }
  }
})
