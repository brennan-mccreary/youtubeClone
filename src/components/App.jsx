import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import SearchBar from './SearchBar/SearchBar';
import VideoPlayer from './VideoPlayer/VideoPlayer';
import SearchResults from './SearchResults/SearchResults';
import key from '../APIKey';
import RelatedVideos from './RelatedVideos/RelatedVideos';
import Comments from './Comments/Comments';


class App extends Component {
    constructor() {
        super();
        this.state = {
            search: '', //user inputted search term
            searchResults: [], //search results and data from youtube
            relatedVideos: [], //videos and data related to selected video
            comments: [], //list of comments for selected video
            selectedVideo: null, //video currently displayed in embedded player
            replyText: '', //Text field for reply
            commentText: '' //Text field for comment
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
            .post('http://localhost:5002/api/comments/add', comment)
            .then((res) => {
                this.setState(prevState => {
                    return { comments: [...prevState.comments, res.data] }
                });
            })
    }

    //PUT Like
    putLike = async (id) => {
        await axios
            .put(`http://localhost:5002/api/comments/like/${id}`)
            .then((res) => {
                let target = [...this.state.comments];
                let index = target.findIndex((el) => res.data._id === el._id);
                target[index] = res.data;
                this.setState({
                    comments: target
                });
            })
    }

    //PUT Dislike
    putDislike = async (id) => {
        await axios
            .put(`http://localhost:5002/api/comments/dislike/${id}`)
            .then((res) => {
                let target = [...this.state.comments];
                let index = target.findIndex((el) => res.data._id === el._id);
                target[index] = res.data;
                this.setState({
                    comments: target
                });
            })
    }

    //POST Reply
    postReplyToComment = async (id, reply) => {
        await axios
            .post(`http://localhost:5002/api/comments/reply/${id}`, reply)
            .then((res) => {
                let target = [...this.state.comments];
                let index = target.findIndex(el => res.data._id === el._id);
                target[index] = res.data;
                this.setState({
                    comments: target
                });
            })
    }

    //Integrity and Handler Functions
    //Check for incomplete HTTP responses
    checkDataIntegrity = (data) => {
        for (let i = 0; i < data.length; i++) {
            if (data[i].snippet === undefined) {
                data.splice(i, 1);
            }
        }
        return data;
    }

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

        document.getElementById("comments").hidden = false;

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


    //Handle submit comment
    handleSubmitComment = (event) => {
        event.preventDefault();

        let comment = {
            videoId: this.state.selectedVideo.id.videoId,
            text: this.state.commentText
        }

        this.postComment(comment);

        this.setState({
            commentText: ''
        })
    };

    //Handle submit reply
    handleSubmitReply = (event) => {
        event.preventDefault();

        let reply = { text: this.state.replyText }
        let id = event.target.parentElement.id

        this.postReplyToComment(id, reply);

        this.setState({
            replyText: ''
        })
    };

    //Update comment
    onChangeComment = (event) => {
        this.setState({
            commentText: event.target.value
        })
    };

    //Update reply
    onChangeReply = (event) => {
        this.setState({
            replyText: event.target.value
        })
    };

    //Handle click like
    handleClickLike = (event) => {
        let id = event.target.parentElement.id;

        this.putLike(id);
    };

    //Handle click dislike
    handleClickDislike = (event) => {
        let id = event.target.parentElement.id;

        this.putDislike(id);
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
                <SearchResults searchResults={this.state.searchResults} handleClick={this.handleClickCard} />
                <VideoPlayer video={this.state.selectedVideo} />
                <Comments submitComment={this.handleSubmitComment} submitReply={this.handleSubmitReply} changeComment={this.onChangeComment} changeReply={this.onChangeReply} commentText={this.state.commentText} replyText={this.state.replyText} comments={this.state.comments} clickLike={this.handleClickLike} clickDislike={this.handleClickDislike} />
                <RelatedVideos relatedVideos={this.state.relatedVideos} handleClick={this.handleClickRelatedCard} />

            </div>
        )
    }
}

export default App;