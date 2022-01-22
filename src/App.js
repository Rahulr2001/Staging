import React, { Component } from 'react';
import './App.css';
import { API, graphqlOperation } from 'aws-amplify'
import { listStagings } from './graphql/queries/list'
import { createStaging } from './graphql/mutations/list'

class App extends Component {
  state = { Name: '', Email: '', Location: '', stagings: [] }
  async componentDidMount() {
    try {
      const apiData = await API.graphql(graphqlOperation(listStagings))
      const stagings = apiData.data.listStagings.items
      this.setState({ stagings })
    } catch (err) {
      console.log('error: ', err)
    }
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })

  }
  createStaging = async () => {
    const { Name, Email, Location } = this.state
    if (Name === '' || Email === '' || Location === '') return
    try {
      const staging = { Name, Email, Location }
      const stagings = [...this.state.stagings, staging]
      this.setState({ stagings, Name:' ', Email:' ', Location:' ' })
      await API.graphql(graphqlOperation(createStaging, {input: staging}))
      console.log('Model successfully created!')
    } catch (err) {
      console.log('error: ', err)
    }
  }
  render() {
    return (
      <div className="App">
        <div style={styles.inputContainer}>
          <input
            name='Name'
            placeholder='Name'
            onChange={this.onChange}
            value={this.state.Name}
            style={styles.input}
          />
          <input
            name='Email'
            placeholder='your Email'
            onChange={this.onChange}
            value={this.state.Email}
            style={styles.input}
          />
           <input
            name='Location'
            placeholder='your Location'
            onChange={this.onChange}
            value={this.state.Location}
            style={styles.input}
          />
        </div>
        <button
          style={styles.button}
          onClick={this.createStaging}
        >Create Model</button>
        {
          this.state.stagings.map((rest, i) => (
            <div key={i} style={styles.item}>
              <p style={styles.Name}>{rest.Name}</p>
              <p style={styles.Email}>{rest.Email}</p>
              <p style={styles.Location}>{rest.Location}</p>
            </div>
          ))
        }
      </div>
    );
  }
}

const styles = {
  inputContainer: {
    margin: '0 auto', display: 'flex', flexDirection: 'column', width: 300
  },
  button: {
    border: 'none', backgroundColor: '#ddd', padding: '10px 30px'
  },
  input: {
    fontSize: 18,
    border: 'none',
    margin: 10,
    height: 35,
    backgroundColor: "#ddd",
    padding: 8
  },
  item: {
    padding: 10,
    borderBottom: '2px solid #ddd'
  },
  Name: { fontSize: 22 },
  Email: { color: 'rgba(0, 0, 0, .45)' },
  Location:{ fontSize: 22}
}

export default App