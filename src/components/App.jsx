//import { render } from '@testing-library/react';
import React, { Component } from 'react';
import './App.css';
import SearchBar from './SearchBar/SearchBar';

class App extends Component {
    constructor() {
        super();
        this.state = {
            search: ''
        };
    }

    handleChange = (event) => {
        this.setState({
            search: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.search)
    }

    render() {
        return (
            <div>
                <SearchBar handleChange={this.handleChange} search={this.state.search} handleSubmit={this.handleSubmit} />
            </div>
        )
    }
}

export default App;