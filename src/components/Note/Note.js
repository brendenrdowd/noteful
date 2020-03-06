import React from 'react';
import { Link } from 'react-router-dom';
import ApiContext from '../../ApiContext';
import config from '../../api/config'
import PropTypes from 'prop-types'



class Note extends React.Component {
  static defaultProps = {
    history: {
      push: () => { }
    }
  }

  static contextType = ApiContext;

  handleClickDelete = e => {
    e.preventDefault()
    const noteId = this.props.id

    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + config.API_TOKEN
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return
      })
      .then(() => {
        this.props.history.push('/');
        this.context.deleteNote(noteId);
      })
      .catch(error => {
        console.error({ error });
      })
  }


  render() {
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
    const modified = formatDate(new Date(this.props.modified));
    return (
      <li className="Note">
        <Link to={`/notes/${this.props.id}`}>{this.props.name}</Link>
        <div>
          <p>Last modified: {modified}</p>
          <button onClick={this.handleClickDelete}>Delete Note</button>
        </div>
      </li>
    );
  }
}

Note.propTypes = {
  modified:PropTypes.string,
  id:PropTypes.number,
  content:PropTypes.string,
  name:PropTypes.string,
  folder_id:PropTypes.number
}

export default Note;