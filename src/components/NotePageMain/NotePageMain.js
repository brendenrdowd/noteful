import React from 'react';
// import { Link } from 'react-router-dom';
import Note from '../Note/Note';
import ApiContext from '../../ApiContext'

class NotePageMain extends React.Component {

  static contextType = ApiContext;


  render() {
    const {notes=[]} = this.context
    let note = {}
    //need to clean up
    if(notes.length){
      const { noteId } = this.props.match.params
      note = notes.find(
        note => note.id === noteId
      )
    }
    return (
      <div className="Main">
        <Note
        {...this.props} 
        modified={note.modified} 
        id={note.id } 
        name={note.name} />
        <p>{note.content}</p>
      </div>
    );
  }

}

export default NotePageMain;