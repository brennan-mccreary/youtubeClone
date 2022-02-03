import React from 'react';
import './VideoPlayer.css'

const VideoPlayer = (props) => {
    return (
        <div hidden={false}>
            {(props.video !== null) ?
                <div>
                    <iframe src={`http://www.youtube.com/embed/${props.video[0].id}`} title={props.video[0].snippet.title}></iframe>
                    <h1>{props.video[0].snippet.title}</h1>
                    <p>{props.video[0].snippet.description}</p>
                </div>
                : null}
            {/* <div className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title">Comments</h5>
                    <p className="card-text">Anonymous242</p>
                    <p className="card-text">This song is my favorite!! I listen to it all the time when I code!</p>
                </div>
            </div> */}
        </div>

    )
}

export default VideoPlayer;