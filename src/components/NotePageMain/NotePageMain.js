import React from 'react';
// import { Link } from 'react-router-dom';
import Note from '../Note/Note';

class NotePageMain extends React.Component {

  render() {
    return (
      <div className="Main">
        <Note modified={this.props.modified} id={this.props.id } name={this.props.name} />
        <p>{this.props.content}</p>
      </div>
    );
  }

}

export default NotePageMain;