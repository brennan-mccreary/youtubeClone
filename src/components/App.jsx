import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import SearchBar from './SearchBar/SearchBar';
import VideoPlayer from './VideoPlayer/VideoPlayer';
import SearchResults from './SearchResults/SearchResults';
import key from '../APIKey';
import RelatedVideos from './RelatedVideos/RelatedVideos';


class App extends Component {
    constructor() {
        super();
        this.state = {
            search: '',
            hasSearched: false,
            searchResults: [],
            searchResultsData: [],
            relatedVideos: [],
            relatedVideosData: [],
            selectedVideoData: null,
            videoSelected: false
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
        this.setState({
            hasSearched: true
        })
        this.getSearchResults(this.state.search, key)
        console.log(this.state.search)
    }

    //Handle video card being clicked
    handleClickCard = (event) => {
        let index = event.target.parentElement.id;
        this.setState({
            selectedVideoData: this.state.searchResultsData[index],
            videoSelected: true
        })
        document.getElementById("search-results").hidden = true

        this.getRelatedVideos(this.state.searchResultsData[index][0].id, key);
    }

    

    //HTTP REQUESTS 
    //GET search results from Youtube
    getSearchResults = async (search, key) => {
        await axios
            .get(`https://www.googleapis.com/youtube/v3/search?q=${search}&type=video&key=${key}`)
            .then((res) => {
                let data = this.extractData(res.data);
                this.formatData(data);
                this.setState({
                    searchResults: data
                })
            })
    }

    //GET related videos
    getRelatedVideos = async (id, key) => {
        await axios
                .get(`https://www.googleapis.com/youtube/v3/search?relatedToVideoId=${id}&type=video&key=${key}`)
                .then((res) => {
                    let data = this.extractData(res.data);
                    this.formatRelatedVideosData(data);
                    this.setState({
                        relatedVideos: data
                    })
                })
    }

    //GET data for each search result
    getSearchResultData = async (id, key) => {
        let data;
        await axios
            .get(`https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${key}&fields=items(id,snippet(channelTitle,title,description,thumbnails))&part=snippet`)
            .then((res) => {
                data = res.data.items
            })
        return data;
    }

    //GET data for each related video
    getRelatedVideosData = async (id, key) => {
        let data;
        await axios
            .get(`https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${key}&fields=items(id,snippet(channelTitle,title,description,thumbnails))&part=snippet`)
            .then((res) => {
                data = res.data.items
            })
        return data;
    }


    //Run When Component Initially Mounts
    componentDidMount() {
        this.getInit();
    };

    //FUNCTIONS
    //extract data from Youtube API
    extractData = (data) => {
        let extractedData = data.items.map((el) => {
            let temp = el.id.videoId
            return temp
        })
        return extractedData;
    }

    //Format data for related videos coming back from API
    formatRelatedVideosData = async (data) => {
        let formattedData = [];
        for(let i = 0; i< data.length; i++) {
            formattedData[i] = await this.getRelatedVideosData(data[i], key)
        }

        console.log(formattedData);
        this.setState({
            relatedVideosData: formattedData
        })
    }

    //Format search result data coming back from API
    formatData = async (data) => {
        let formattedData = [];
        for (let i = 0; i < data.length; i++) {
            formattedData[i] = await this.getSearchResultData(data[i], key)
        };

        this.setState({
            searchResultsData: formattedData
        })
    };


    //Render
    render() {
        return (
            <div>
                <SearchBar handleChange={this.handleChange} search={this.state.search} handleSubmit={this.handleSubmit} />
                <SearchResults data={this.state.searchResultsData} searchResults={this.state.searchResults} handleClick={this.handleClickCard} />
                <VideoPlayer video={this.state.selectedVideoData}/>
                <RelatedVideos data={this.state.relatedVideosData} videoSelected={this.state.videoSelected}/>
            </div>
        )
    }
}

export default App;