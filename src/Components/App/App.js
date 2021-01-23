import React from 'react';
import './App.css';
import Playlist from '../Playlist/Playlist'
import SearchBar from '../SearchBar/SearchBar';
import SearchResult from '../SearchResult/SearchResult';
import Spotify from '../../util/Spotify'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {name: 'name1', artist: 'artist1', album: 'album1', id: 1},
        {name: 'name2', artist: 'artist2', album: 'album2', id: 2},
        {name: 'name3', artist: 'artist3', album: 'album3', id: 3}],
      playlistName: 'My Playlist',
      playlistTracks: [
        {name: 'PLTName1', artist: 'PLTArtist1', album: 'PLTAlbum1', id: 4},
        {name: 'PLTName2', artist: 'PLTArtist2', album: 'PLTAlbum2', id: 5},
        {name: 'PLTName3', artist: 'PLTArtist3', album: 'PLTAlbum3', id: 6}
      ]
    }
    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)
    this.updatePlaylistName = this.updatePlaylistName.bind(this)
    this.savePlaylist = this.savePlaylist.bind(this)
    this.search = this.search.bind(this)
  }

  addTrack(track) {
    let newPlaylistTracks = this.state.playlistTracks;
    
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    
    newPlaylistTracks.push(track);
    this.setState({playlistTracks: newPlaylistTracks})
  }

  removeTrack(track) {
    let newPlaylistTracks = this.state.playlistTracks.filter(savedTrack => savedTrack.id !== track.id)
    this.setState({playlistTracks: newPlaylistTracks})
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name})
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri)
  }

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults})
    })
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResult searchResults={this.state.searchResults}
                          onAdd={this.addTrack}
            />
            <Playlist playlistName={this.state.playlistName}
                      playlistTracks={this.state.playlistTracks}
                      onRemove={this.removeTrack}
                      onNameChange={this.updatePlaylistName}
                      onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
