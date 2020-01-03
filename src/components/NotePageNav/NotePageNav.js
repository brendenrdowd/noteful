import React from 'react';
import { Link } from 'react-router-dom';

class NotePageNav extends React.Component {

  render() {
    return (
      <div className="Sidebar">
        <Link to='/'>Go Back</Link>
        <h2>Current Folder: {this.props.name}</h2>
      </div>
    );
  }

}

export default NotePageNav;