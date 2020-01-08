import React from 'react';
// import { Link } from 'react-router-dom';
import Note from '../Note/Note';
import ApiContext from '../../ApiContext'

class NoteListMain extends React.Component {

  static contextType = ApiContext;

  render() {
    const { folderId } = this.props.match.params
    const { notes = [] } = this.context
    const noteList = (!folderId)
      ? notes
      : notes.filter(note => note.folderId === folderId)

    return (
      <div className="Main">
        <h2>Notes</h2>
        <ul>
          {noteList.map((note) => {
            return (
              <Note modified={note.modified} key={note.id} id={note.id} name={note.name} />
            )
          })}
        </ul>
        <button>New Note</button>
      </div>
    );
  }
}

NoteListMain.defaultProps = {
  match: {
    params: {}
  }
}

export default NoteListMain;