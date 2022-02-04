import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import SearchBar from './SearchBar/SearchBar';
import VideoPlayer from './VideoPlayer/VideoPlayer';
import SearchResults from './SearchResults/SearchResults';
import key from '../APIKey';
import RelatedVideos from './RelatedVideos/RelatedVideos';
import Test from './Test/Test';
import Comments from './Comments/Comments';


class App extends Component {
    constructor() {
        super();
        this.state = {
            search: '', //user inputted search term
            searchResults: [], //search results and data from youtube
            relatedVideos: [],
            comments: [],
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
    }

    //Handle video card being clicked
    handleClickCard = (event) => {
        let index = event.target.parentElement.id;
        this.setState({
            selectedVideo: this.state.searchResults[index]
        })

        console.log(this.state.searchResults[index].id.videoId);
        this.getCommentsByVideoId(this.state.searchResults[index].id.videoId);
        this.getRelatedVideos(this.state.searchResults[index].id.videoId, key);
    }


    //Handle related video card being clicked
    handleClickRelatedCard = (event) => {
        let index = event.target.parentElement.id;
        this.setState({
            selectedVideo: this.state.relatedVideos[index]
        })

        console.log(this.state.relatedVideos[index].id.videoId);
        this.getCommentsByVideoId(this.state.relatedVideos[index].id.videoId);
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

                })
    }

    //GET comments for video by id
    getCommentsByVideoId = async (id) => {
        await axios 
                .get(`http://localhost:5002/api/comments/fetch/${id}`)
                .then((res) => {
                    console.log(id);
                    console.log(res.data);
                    this.setState({
                        comments: res.data
                    });
                })
    }    

    //POST Comment
    postComment = async (comment) => {
        await axios 
                .get('http://localhost:5002/api/comments/add', comment)
                .then((res) => {
                    this.setState({
                        comments: [...prevState.comments, res.data]
                    });
                })
    }

    //PUT Like
    putLike = async (id) => {
        await axios
                .get(`http://localhost:5002/api/comments/like/${id}`)
                .then((res) => {
                    let target = [...this.state.comments];
                    let index = target.findIndex(el => res.data._id === this.state.comments[el]._id);
                    target[index] = res.data;
                    this.setState({
                        comments: target
                    });
                })
    }

    //PUT Dislike
    putDislike = async (id) => {
        await axios
                .get(`http://localhost:5002/api/comments/dislike/${id}`)
                .then((res) => {
                    let target = [...this.state.comments];
                    let index = target.findIndex(el => res.data._id === this.state.comments[el]._id);
                    target[index] = res.data;
                    this.setState({
                        comments: target
                    });
                })
    }

    //POST Reply
    postReplyToComment = async (id, reply) => {
        await axios
                .get(`http://localhost:5002/api/comments/reply/${id}`, reply)
                .then((res) => {
                    let target = [...this.state.comments];
                    let index = target.findIndex(el => res.data._id === this.state.comments[el]._id);
                    target[index] = res.data;
                    this.setState({
                        comments: target
                    });
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
                <Comments comments={this.state.comments}/>
                <Test/>
            </div>
        )
    }
}

export default App;