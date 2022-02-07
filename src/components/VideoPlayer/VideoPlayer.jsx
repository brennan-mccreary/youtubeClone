import React from 'react';
import './VideoPlayer.css'

const VideoPlayer = (props) => {
    return (
        <div className='top-level'>
            Video player
            {(props.video !== null) ?
                <div>
                    <iframe src={`http://www.youtube.com/embed/${props.video.id.videoId}`} title={props.video.snippet.title}></iframe>
                    <h1>{props.video.snippet.title}</h1>
                    <p>{props.video.snippet.description}</p>
                </div>
                : null}
        </div>
    )
}

export default VideoPlayer;