import React, { Component } from 'react'
import ApiContext from '../../ApiContext'
import config from '../../config'
import makeid from '../../makeId'

export default class AddFolder extends Component {
  static defaultProps = {
    history: {
      push: () => { }
    },
  }
  static contextType = ApiContext;

  handleAddFolder = e => {
    e.preventDefault()
    const folder = {
      name: e.target.name.value,
      id: makeid(10)
    }

    fetch(`${config.API_ENDPOINT}/folders/`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(folder)
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(() => {
        this.context.addFolder(folder)
        this.props.history.push(`/folders/${folder.id}`)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    return (
      <div className="Main">
        <form onSubmit={this.handleAddFolder}>
          <h3>Add Folder</h3>
          <label htmlFor="name">Folder Name</label>
          <input type="text" name="name" />
          <input type="submit" value="Add Folder" />
        </form>
      </div>
    )
  }
}
