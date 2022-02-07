import React from 'react';
import './VideoPlayer.css'

const VideoPlayer = (props) => {
    return (

        <div className='container'>
            {(props.video !== null) ?
                <>
                    <div className='embed-video'>
                        <iframe width="560" height="315" src={`http://www.youtube.com/embed/${props.video.id.videoId}`} title={props.video.snippet.title}></iframe>
                        <div className='video-content-container'>
                            <h1>{props.video.snippet.title}</h1>
                            <p>{props.video.snippet.description}</p>
                        </div>
                    </div>
                </>
                : null}
        </div>

    )
}

export default VideoPlayer;