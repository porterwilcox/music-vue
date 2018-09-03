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
    playlist: {},
    user: {}
  },
  mutations: {
    setSongs(state, songs) {
      state.songs = songs
    },
    setPlaylist(state, playlist) {
      state.playlist = playlist
    },
    register(state, user){
      state.user = user
    },
    login(state, user){
      state.user = user[0]
    }
  },
  actions: {
    //ITUNES
    search({ dispatch, commit }, artist) {
      itunesApi.get(`/${artist}`)
        .then(res => {
          let musicArr = res.data.results.map(s => new Song(s))
          commit('setSongs', musicArr)
        })
    },
    //SONGS
    getSongs({ dispatch, commit }) {
      musicDB.get('/songs')
        .then(res => {
          commit('setSongs', res.data)
        })
    },
    //PLAYLISTS
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
    },
    //USERS
    userExists({}, name){
      musicDB.get(`/users/exists/${name}`)
        .then(res => {
          if(res.data.length){
            return alert('USERNAME TAKEN:\ncreate a different username please')
          }
        })
    },
    register({dispatch, commit}, obj){
      musicDB.post('/users', obj)
        .then(res => {
          commit('register', res.data)
        })
    },
    login({dispatch, commit}, obj){
      musicDB.get(`/users/${obj.username}/${obj.password}`)
        .then(res => {
          if(res.data.length){
            return commit('login', res.data)
          }
          return alert("username or password incorrect")
        })
    }
  }
})
