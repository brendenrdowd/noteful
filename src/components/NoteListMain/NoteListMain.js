import React from 'react';
import { Link } from 'react-router-dom';
import Note from '../Note/Note';
import ApiContext from '../../ApiContext'

class NoteListMain extends React.Component {

  static contextType = ApiContext;

  render() {
    const { folder_id } = this.props.match.params
    const { notes = [] } = this.context
    const noteList = (!folder_id)
      ? notes
      : notes.filter(note => note.folder_id === Number(folder_id))

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
        <Link to='/add/note'>
          <button>New Note</button>
        </Link>
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