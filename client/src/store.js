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
  timeout: 3000
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    songs: [],
    playlist: {}
  },
  mutations: {
    setSongs(state, songs) {
      state.songs = songs
    },
    setPlaylist(state, playlist) {
      state.playlist = playlist
    }
  },
  actions: {
    getSongs({ dispatch, commit }) {
      musicDB.get('/songs')
        .then(res => {
          commit('setSongs', res.data)
        })
    },
    search({ dispatch, commit }, artist) {
      itunesApi.get(`/${artist}`)
        .then(res => {
          let musicArr = res.data.results.map(s => new Song(s))
          commit('setSongs', musicArr)
        })
    },
    addToPlaylist({ dispatch, commit }, obj) {
      musicDB.post("/songs", obj.song)
        .then(res => {
          if (!obj.playlistId) {
            dispatch('newPlaylist', res)
          }
          else {
            dispatch('modifyPlaylist', {
              song: res.data,
              playlistId: obj.playlistId
            })
          }
        })
    },
    newPlaylist({ dispatch, commit }, promise) {
      let playlistArr = []
      playlistArr.push(promise.data)
      musicDB.post('/playlists', { songs: playlistArr })
        .then(res => {
          commit('setPlaylist', res.data)
        })
    },
    modifyPlaylist({dispatch, commit, state}, obj){
      if(state.playlist.songs.find(s => s.tempId == obj.song.tempId)){
        return alert("this song is already in your playlist")
      }
      state.playlist.songs.push(obj.song)
      musicDB.put(`/playlists/${obj.playlistId}`, state.playlist.songs)
    },
    removeFromPlaylist({dispatch, commit, state}, obj){
      state.playlist.songs.splice(obj.index, 1)
      musicDB.put(`/playlists/modify/${obj.playlistId}`, state.playlist.songs)
    },
    modifyVote({dispatch, commit, state}, obj){
      state.playlist.songs.splice(obj.index, 1)
      state.playlist.songs.push(obj.song)
      state.playlist.songs.sort((a, b) => {
        return b.vote - a.vote
      })
      musicDB.put(`/playlists/${obj.playlistId}`, state.playlist.songs)
    }
  }
})
