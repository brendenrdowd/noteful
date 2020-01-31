import React, { Component } from 'react'
import ApiContext from '../../ApiContext'
import config from '../../api/config'
import makeid from '../../makeId'
import ValidationError from '../ValidationError/ValidationError'


export default class AddNote extends Component {
  state = {
    name: {
      value: "",
      touched: false
    },
    content: {
      value: "",
      touched: false
    },
    folderId: {
      value: "",
      touched: false
    }
  }

  static defaultProps = {
    history: {
      push: () => { }
    },
  }

  static contextType = ApiContext

  validateName() {
    const name = this.state.name.value;
    if (name.length === 0) {
      return 'Please enter a name';
    }
  }

  updateName(name) {
    this.setState({
      name: {
        value: name,
        touched: true
      }
    });
  }

  validateContent() {
    const content = this.state.content.value;
    if (content.length < 5) {
      return 'Please enter some content';
    } else {
      return ""
    }
  }

  updateContent(content) {
    this.setState({
      content: {
        value: content,
        touched: true
      }
    });
  }

  validateFolder() {
    const folder = this.state.folderId.value;
    if (folder === "") {
      return 'Please select a folder';
    }
  }

  updateFolder(folderId) {
    this.setState({
      folderId: {
        value: folderId,
        touched: true
      }
    });
  }

  handleSubmit = e => {
    e.preventDefault()
    const note = {
      id: makeid(15),
      name: this.state.name.value,
      content: this.state.content.value,
      folderId: e.target.folderId.value,
      modified: Date.now()
    }
    fetch(`${config.API_ENDPOINT}/notes/`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(note)
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(() => {
        this.context.addNote(note)
        this.props.history.push(`/notes/${note.id}`)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    const nameError = this.validateName();
    const contentError = this.validateContent();
    const folderError = this.validateFolder();
    const { folders = [] } = this.context
    const options = folders.map(folder => {
      return <option key={makeid(3)} value={folder.id}>{folder.name}</option>
    })

    return (
      <div className="Main">
        <h2 className="center">Add Note</h2>
        <form onSubmit={this.handleSubmit} className="addNote">
          <label htmlFor="name">Name
            <input type="text" name="name" onChange={e => this.updateName(e.target.value)} />
          </label>
          {this.state.name.touched && <ValidationError message={nameError}></ValidationError>}
          <label htmlFor="content">Content
            <textarea name="content" onChange={e => this.updateContent(e.target.value)} />
          </label>
          {this.state.content.touched && <ValidationError message={contentError}></ValidationError>}
          <label htmlFor="folderId">Folder
            <select name="folderId">
              {options}
            </select>
          </label>
          {this.state.folderId.touched && <ValidationError message={folderError}></ValidationError>}
          <button type="submit" disabled={this.validateName() || this.validateContent()}>Add Note</button>
        </form>
      </div>
    )
  }
}