export default class Song {
    constructor(data) {
        this.name = data.trackName,
        this.albumArt = data.artworkUrl60.replace(/60x60/g, "500x500"),
        this.artist = data.artistName,
        this.album = data.collectionName,
        this.audioPreview = data.previewUrl,
        this.vote = 0,
        this.tempId = data.trackId
    }
}