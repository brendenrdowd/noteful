import React from 'react';
import './App.css';
import NoteListNav from './components/NoteListNav/NoteListNav'
import NoteListMain from './components/NoteListMain/NoteListMain'
import NotePageMain from './components/NotePageMain/NotePageMain'
import NotePageNav from './components/NotePageNav/NotePageNav'
import { Route, Link } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = props.store
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1><Link to={'/'}>Noteful</Link></h1>
        </header>

        <aside>
          <Route
            exact
            path='/'
            render={() =>
              <NoteListNav folders={this.state.folders} />
            }
          />
          {/* Folder Route */}
          <Route
            exact
            path='/folders/:folderId'
            render={(props) =>
              <NoteListNav folders={this.state.folders} selected={props.match.params.folderId} />
            }
          />
          {/* Note Route */}
          <Route
            exact
            path='/notes/:noteId'
            render={(props) => {
              const selectedFolderId = this.state.notes.find(
                note => note.id === props.match.params.noteId
              ).folderId

              const selectedFolder = this.state.folders.find(
                folder => folder.id === selectedFolderId
              )

              return (
                <NotePageNav {...selectedFolder} />
              )
            }}
          />
        </aside>

        <main>
          {/* Show/hide components in 'MAIN' section based on route */}
          {/* Main Route */}
          <Route
            exact
            path='/'
            render={() =>
              <NoteListMain notes={this.state.notes} />
            }
          />
          {/* Folder Route */}
          <Route
            exact
            path='/folders/:folderId' 
            render={(props) => {
              return (
                <NoteListMain
                  notes={this.state.notes.filter(
                    note => note.folderId === props.match.params.folderId
                  )}
                />
              )
            }}
          />
          {/* Note Route */}
          <Route
            exact
            path='/notes/:noteId'
            render={(props) => {
              const selectedNote = this.state.notes.find(
                note => note.id === props.match.params.noteId
              )
              return (
                <NotePageMain {...selectedNote}/>
              )
            }}
          />
        </main>
      </div>
    );
  }
}

export default App;
