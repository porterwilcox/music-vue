export default class Song {
    constructor(data) {
        this.name = data.trackName,
        this.albumArt = data.artworkUrl100.replace(/100/g, "300"),
        this.artist = data.artistName,
        this.album = data.collectionName,
        this.audioPreview = data.previewUrl,
        this.vote = 0,
        this.itunesId = data.trackId
    }
}