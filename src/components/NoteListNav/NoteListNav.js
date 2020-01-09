import React from 'react';
import { Link } from 'react-router-dom';
import ApiContext from '../../ApiContext'

class NoteListNav extends React.Component {
  static contextType = ApiContext

  render() {
    const { folders = [] } = this.context
    return (
      <div className="Sidebar">
        <h2>Folders</h2>
        <ul>

          {folders.map((folder) => {
            const classes = this.props.selected === folder.id
              ? 'folder selected'
              : 'folder'

            return (
              <li key={folder.id}>
                <Link className={classes} to={`/folders/${folder.id}`}>{folder.name}</Link>
              </li>
            )
          })}
        </ul>
        <Link to="/folders/add">
          <button type="button">Add Folder</button>
        </Link>
      </div>
    );
  }
}

NoteListNav.defaultProps = {
  folders: []
}

export default NoteListNav;