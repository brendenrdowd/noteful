import React from 'react';
import { Link } from 'react-router-dom';
import ApiContext from '../../ApiContext'
class NotePageNav extends React.Component {

  static contextType = ApiContext

  render() {
    const { notes,folders } = this.context
    const selectedFolderId = notes.find(
      note => note.id === this.props.match.params.noteId
    ).folderId

    const selectedFolder = folders.find(
      folder => folder.id === selectedFolderId
    )

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