import React from 'react';
import './RelatedVideos.css';

const RelatedVideos = (props) => {
    return ( 
        <div>
            {(props.data.length > 0) ?
                <>
                    <div className='video-card-container' id='search-results'>
                        {props.data.map((el, i) =>
                            <div className='video-card' key={i}>
                                <div className="row row-cols">
                                    <div className="col">
                                        <div className="card" id={i}>
                                            <img src={(el[0].snippet.thumbnails.high.url)} onClick={props.handleClick} className="card-img-top" alt="random"></img>
                                                <div className="card-body" onClick={props.handleClick} id={i}>
                                                    <h5 className="card-title">{(el[0].snippet.title)}</h5>
                                                    <p className="card-text">Click the video to watch!</p>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </>
                : null}
        </div>
     );
}
 
export default RelatedVideos;
