import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import SearchBar from './SearchBar/SearchBar';
import VideoPlayer from './VideoPlayer/VideoPlayer';
import APIKey from '../APIKey';
import SearchResults from './SearchResults/SearchResults';
import key from '../APIKey';


class App extends Component {
    constructor() {
        super();
        this.state = {
            search: '',
            hasSearched: false,
            searchResults: []
        };
    }

    handleChange = (event) => {
        this.setState({
            search: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            hasSearched: true
        })
        this.getSearchResults(this.state.search, key)
        console.log(this.state.search)
    }

    ////GET Initial Test
    getInit = async () => {
        await axios
            .get('http://localhost:5002/')
            .then((res) => {
                console.log(res.data);
            })
    };

    //HTTP Requests 
    //get search results from Youtube
    getSearchResults = async (search, key) => {
        await axios
            .get(`https://www.googleapis.com/youtube/v3/search?q=${search}&type=video&key=${key}`)
            .then((res) => {
                let data = this.extractData(res.data);
                this.setState({
                    searchResults: data
                })
                console.log(data[0])
            })
    }

    //Run When Component Initially Mounts
    componentDidMount() {
        this.getInit();
    };

    //functions 
    //extract data from Youtube API
    extractData = (data) => {
        let extractedData = data.items.map((el) => {
            let temp = el.id.videoId
            return temp
        })
        return extractedData
    }


    //Render
    render() {
        return (
            <div>
                <SearchBar handleChange={this.handleChange} search={this.state.search} handleSubmit={this.handleSubmit} />
                < VideoPlayer />
                <SearchResults hasSearched={this.state.hasSearched} />
            </div>
        )
    }
}

export default App;