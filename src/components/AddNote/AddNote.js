import React, { Component } from 'react'
import ApiContext from '../../ApiContext'
import config from '../../config'
import makeid from '../../makeId'

export default class AddNote extends Component {
  static defaultProps = {
    history: {
      push: () => { }
    },
  }

  static contextType = ApiContext

  handleSubmit = e => {
    e.preventDefault()
    const note = {
      id: makeid(15),
      name: e.target.name.value,
      content: e.target.content.value,
      folderId: e.target.folderId.value,
      modified:Date.now()
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
    const { folders = [] } = this.context
    const options = folders.map(folder => {
      return <option value={folder.id}>{folder.name}</option>
    })
    return (
      <div className="Main">
        <h2 className="center">Add Note</h2>
        <form onSubmit={this.handleSubmit} className="addNote">
          <label htmlFor="name">Name
            <input type="text" name="name" />
          </label>
          <label htmlFor="content">Content
            <textarea name="content" />
          </label>
          <label htmlFor="folderId">Folder
            <select name="folderId">
              {options}
            </select>
          </label>
          <input type="submit" value="Add Note" />
        </form>
      </div>
    )
  }
}