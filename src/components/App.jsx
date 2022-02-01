import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import SearchBar from './SearchBar/SearchBar';
import VideoPlayer from './VideoPlayer/VideoPlayer';
import APIKey from '../APIKey';


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

    //HTTP Requests
    ////GET Initial Test
    getInit = async () => {
        await axios
            .get('http://localhost:5002/')
            .then((res) => {
                console.log(res.data);
            })
    };

    //Run When Component Initially Mounts
    componentDidMount() {
        this.getInit();
    };

    //Render
    render() {
        return (
            <div>
                <SearchBar handleChange={this.handleChange} search={this.state.search} handleSubmit={this.handleSubmit} />
                < VideoPlayer />
            </div>
        )
    }
}

export default App;