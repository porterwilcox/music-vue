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
    register(state, user) {
      state.user = user
    },
    login(state, user) {
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
      if (!obj.userId) {
        return alert("REGISTER OR SIGN IN\nto save songs to a playlist")
      }
      if (!obj.playlistId){
        return dispatch('newPlaylist', obj)
      }
      dispatch('modifyPlaylist', obj)
    },
    newPlaylist({ dispatch, commit }, obj) {
      let playlistArr = []
      playlistArr.push(obj.song)
      musicDB.post('/playlists', { songs: playlistArr, userId: obj.userId })
        .then(res => {
          commit('setPlaylist', res.data)
        })
    },
    modifyPlaylist({ dispatch, commit, state }, obj) {
      if (state.playlist.songs.find(s => s.tempId == obj.song.tempId)) {
        return alert("this song is already in your playlist")
      }
      state.playlist.songs.push(obj.song)
      musicDB.put(`/playlists/${obj.playlistId}`, {songs: state.playlist.songs})
    },
    removeFromPlaylist({ dispatch, commit, state }, obj) {
      state.playlist.songs.splice(obj.index, 1)
      musicDB.put(`/playlists/modify/${obj.playlistId}`, {songs: state.playlist.songs})
    },
    modifyVote({ dispatch, commit, state }, obj) {
      state.playlist.songs.splice(obj.index, 1)
      state.playlist.songs.push(obj.song)
      state.playlist.songs.sort((a, b) => {
        return b.vote - a.vote
      })
      musicDB.put(`/playlists/${obj.playlistId}`, {songs: state.playlist.songs})
    },
    //USERS
    userExists({ }, name) {
      musicDB.get(`/users/exists/${name}`)
        .then(res => {
          if (res.data.length) {
            return alert('USERNAME TAKEN:\ncreate a different username please')
          }
        })
    },
    register({ dispatch, commit }, obj) {
      musicDB.post('/users', obj)
        .then(res => {
          commit('register', res.data)
        })
    },
    login({ dispatch, commit }, obj) {
      let userId = ''
      musicDB.get(`/users/${obj.username}/${obj.password}`)
        .then(res => {
          if (res.data.length) {
            userId = res.data[0]._id
            commit('login', res.data)
            musicDB.get(`/playlists/${userId}`)
              .then(res => {
                if(res.data.length){
                commit('setPlaylist', res.data[0])
                }
              })
            return
          }
          return alert("username or password incorrect")
        })
    }
  }
})
