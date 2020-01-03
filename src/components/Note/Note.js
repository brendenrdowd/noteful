import React from 'react';
import { Link } from 'react-router-dom';

// Found this on stack overflow: https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date
function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return monthNames[monthIndex] + ' ' + day + ', ' + year;
}

class Note extends React.Component {

  render() {
    const modified = formatDate(new Date(this.props.modified));
    console.log(modified)
    return (
      <li className="Note">
        <Link to={`/notes/${this.props.id}`}>{this.props.name}</Link>
        <div>
          <p>Last modified: {modified}</p>
          <button>Delete Note</button>
        </div>
      </li>
    );
  }

}

export default Note;