import React from 'react';
import { Link } from 'react-router-dom';

class NoteListNav extends React.Component {

  render() {
    return (
      <div className="Sidebar">
        <h2>Folders</h2>
        <ul>

          {this.props.folders.map((folder) => {
            const classes = this.props.selected === folder.id
              ? 'folder selected'
              : 'folder'

            return(
              <li key={folder.id}>
                <Link className={classes} to={`/folders/${folder.id}`}>{folder.name}</Link>
              </li>
            )
          })}
        </ul>
        <button>New Folders</button>
      </div>
    );
  }
}

NoteListNav.defaultProps = {
  folders: []
}

export default NoteListNav;