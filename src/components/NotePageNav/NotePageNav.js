import React from 'react';
import { Link } from 'react-router-dom';
import ApiContext from '../../ApiContext'
class NotePageNav extends React.Component {

  static contextType = ApiContext

  render() {
    const { notes, folders } = this.context
    let selectedFolder = {}
    //need to clean up
    if (notes.length && folders.length) {
      const selectedfolder_id = notes.find(
        note => note.id === Number(this.props.match.params.noteId)
      ).folder_id
      selectedFolder = folders.find(
        folder => folder.id === selectedfolder_id
      )
    }

    return (
      <div className="Sidebar">
        <Link to='/'>Go Back</Link>
        <h2>Current Folder: {selectedFolder.name}</h2>
      </div>
    );
  }

  static defaultProps = {
    history: {
      goBack: () => { }
    },
    match: {
      params: {}
    }
  }
}



export default NotePageNav;