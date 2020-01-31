import React, { Component } from 'react'
import ApiContext from '../../ApiContext'
import config from '../../../api/config'
import makeid from '../../makeId'
import ValidationError from '../ValidationError/ValidationError'

export default class AddFolder extends Component {
  state = {
    name: {
      value: "",
      touched: false
    }
  }

  static defaultProps = {
    history: {
      push: () => { }
    },
  }

  static contextType = ApiContext;

  validateName() {
    const name = this.state.name.value;
    if (name.length === 0) {
      return 'Please enter name';
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

  handleAddFolder = e => {
    e.preventDefault()
    const folder = {
      name: this.state.name.value,
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
    const nameError = this.validateName();
    return (
      <div className="Main">
        <form onSubmit={this.handleAddFolder}>
          <h3>Add Folder</h3>
          <label htmlFor="name">Folder Name</label>
          <input type="text" name="name" onChange={e => this.updateName(e.target.value)} />
          {this.state.name.touched && <ValidationError message={nameError}></ValidationError>}
          <button type="submit" disabled={this.validateName()}>Add Folder</button>
        </form>
      </div>
    )
  }
}
