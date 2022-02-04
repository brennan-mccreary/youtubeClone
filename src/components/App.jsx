import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import SearchBar from './SearchBar/SearchBar';
import VideoPlayer from './VideoPlayer/VideoPlayer';
import SearchResults from './SearchResults/SearchResults';
import key from '../APIKey';
import RelatedVideos from './RelatedVideos/RelatedVideos';
import Test from './Test/Test';


class App extends Component {
    constructor() {
        super();
        this.state = {
            search: '', //user inputted search term
            searchResults: [], //search results and data from youtube
            relatedVideos: [],
            selectedVideo: null
        };
    }

    ////GET Initial Test
        getInit = async () => {
            await axios
                .get('http://localhost:5002/')
                .then((res) => {
                    console.log(res.data);
                })
        };

    ////HANDLERS
    //update search bar 
    handleChange = (event) => {
        this.setState({
            search: event.target.value
        })
    }

    //handle submission of search result
    handleSubmit = (event) => {
        event.preventDefault();

        this.getSearchResults(this.state.search, key)
        console.log(this.state.search)
    }

    //Handle video card being clicked
    handleClickCard = (event) => {
        let index = event.target.parentElement.id;
        this.setState({
            selectedVideo: this.state.searchResults[index]
        })

        console.log(this.state.searchResults[index]);

        this.getRelatedVideos(this.state.searchResults[index].id.videoId, key);
    }


    //Handle related video card being clicked
    handleClickRelatedCard = (event) => {
        let index = event.target.parentElement.id;
        this.setState({
            selectedVideo: this.state.relatedVideos[index]
        })

        console.log(this.state.relatedVideos[index]);

        this.getRelatedVideos(this.state.relatedVideos[index].id.videoId, key);
    }

    

    //HTTP REQUESTS 
    //GET search results from Youtube
    getSearchResults = async (query, key) => {
        await axios
            .get(`https://www.googleapis.com/youtube/v3/search?q=${query}&type=video&key=${key}&fields=items(id,snippet(channelTitle,title,description,thumbnails))&part=snippet`)
            .then((res) => {
                const data = this.checkDataIntegrity(res.data.items);
                this.setState({
                    searchResults: data
                })
                console.log(data);
            })
    }

    //GET related videos by id
    getRelatedVideos = async (id, key) => {
        await axios
                .get(`https://www.googleapis.com/youtube/v3/search?relatedToVideoId=${id}&type=video&key=${key}&fields=items(id,snippet(channelTitle,title,description,thumbnails))&part=snippet`)
                .then((res) => {
                    const data = this.checkDataIntegrity(res.data.items)
                    this.setState({
                        relatedVideos: data
                    })
                    console.log(data);
                })
    }


    //Functions
    checkDataIntegrity = (data) => {
        for(let i = 0; i < data.length; i++) {
            if(data[i].snippet === undefined) {
                data.splice(i, 1);
            }
        }
        return data;
    }

    //Run When Component Initially Mounts
    componentDidMount() {
        this.getInit();
    };

   
    //Render
    render() {
        return (
            <div>
                <SearchBar handleChange={this.handleChange} search={this.state.search} handleSubmit={this.handleSubmit} />
                <SearchResults searchResults={this.state.searchResults} handleClick={this.handleClickCard} />
                <VideoPlayer video={this.state.selectedVideo}/>
                <RelatedVideos relatedVideos={this.state.relatedVideos} handleClick={this.handleClickRelatedCard}/>
                <Test/>
            </div>
        )
    }
}

export default App;