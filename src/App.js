import React from 'react';
import './App.css';
import NoteListNav from './components/NoteListNav/NoteListNav'
import NoteListMain from './components/NoteListMain/NoteListMain'
import NotePageMain from './components/NotePageMain/NotePageMain'
import NotePageNav from './components/NotePageNav/NotePageNav'
import AddNote from './components/AddNote/AddNote'
import AddFolder from './components/AddFolder/AddFolder'
import { Route, Link } from 'react-router-dom';
import ApiContext from './ApiContext'
import config from './api/config'
import ErrorPage from './components/ErrorPage/ErrorPage'
require('dotenv').config();


class App extends React.Component {
  state = {
    notes: [],
    folders: [],
  };

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`, {
        method: 'get',
        headers: new Headers({
          'Authorization': 'Bearer ' + config.API_TOKEN,
          'Content-Type': 'application/json'
        })
      }),
      fetch(`${config.API_ENDPOINT}/folders`, {
        method: 'get',
        headers: new Headers({
          'Authorization': 'Bearer ' + config.API_TOKEN,
          'Content-Type': 'application/json'
        })
      })
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok)
          return notesRes.json().then(e => Promise.reject(e))
        if (!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e))
        return Promise.all([
          notesRes.json(),
          foldersRes.json(),
        ])
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders })
      })
      .catch(error => {
        console.error({ error })
      })
  }

  // Handlers
  handleAddFolder = folder => {
    this.setState({
      folders: [...this.state.folders, folder]
    })
  }

  handleAddNote = note => {
    this.setState({
      notes: [...this.state.notes, note]
    })
  }

  handleDeleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    })
  }

  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      addFolder: this.handleAddFolder,
      addNote: this.handleAddNote,
      deleteNote: this.handleDeleteNote,
    }
    return (
      <ApiContext.Provider value={value}>
        <div className="App">
          <header className="App-header">
            <h1><Link to={'/'}>Noteful</Link></h1>
          </header>

          <ErrorPage>
            <aside>
              <Route
                exact
                path='/'
                component={NoteListNav}
              />
              {/* Folder Route */}
              <Route
                exact
                path='/folders/:folderId'
                render={(props) =>
                  <NoteListNav selected={props.match.params.folderId} />
                }
              />
              {/* Note Route */}
              <Route
                exact
                path='/notes/:noteId'
                component={NotePageNav}
              />
            </aside>

            <main>
              {/* Show/hide components in 'MAIN' section based on route */}
              {/* Main Route */}
              {/* Folder Route */}
              <Route
                exact
                path='/'
                component={NoteListMain}
              />
              <Route
                exact
                path='/folders/:folderId'
                component={NoteListMain}
              />
              {/* Note Route */}
              <Route
                exact
                path='/notes/:noteId'
                component={NotePageMain}
              />
              <Route
                exact
                path='/folders/add'
                component={AddFolder}
              />
              <Route
                exact
                path='/add/note'
                component={AddNote}
              />
            </main>
          </ErrorPage>
        </div>
      </ApiContext.Provider>
    );
  }
}

export default App;
