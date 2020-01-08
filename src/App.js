import React from 'react';
import './App.css';
import NoteListNav from './components/NoteListNav/NoteListNav'
import NoteListMain from './components/NoteListMain/NoteListMain'
import NotePageMain from './components/NotePageMain/NotePageMain'
import NotePageNav from './components/NotePageNav/NotePageNav'
import { Route, Link } from 'react-router-dom';
import ApiContext from './ApiContext'
import dummyStore from './dummyStore'

class App extends React.Component {
  state = {
    notes: [],
    folders: [],
  };

  componentDidMount() {
    setTimeout(() => this.setState(dummyStore), 600)
  }


  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
    }
    return (
      <ApiContext.Provider value={value}>
        <div className="App">
          <header className="App-header">
            <h1><Link to={'/'}>Noteful</Link></h1>
          </header>

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
              // conponent={NoteListNav}
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
            <Route
              exact
              path='/'
              component={NoteListMain}
            />
            {/* Folder Route */}
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
          </main>
        </div>
      </ApiContext.Provider>
    );
  }
}

export default App;
