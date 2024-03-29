import React from 'react';
import './RelatedVideos.css';

const RelatedVideos = (props) => {
    return (
        <div className='container-row'>
            {(props.relatedVideos.length > 0) ?
                <>
                    <div className='row row-cols-3' id='search-results'>
                        {props.relatedVideos.map((el, i) =>
                            <div className='card' key={i}>
                                <div className="col">
                                    <div className="card" id={i}>
                                        <img src={(el.snippet.thumbnails.high.url)} className="card-img-top" onClick={props.handleClick} alt="random"></img>
                                        <div className="card-body" onClick={props.handleClick} id={i}>
                                            <h5 className="card-title">{(el.snippet.title)}</h5>
                                            <p className="card-text">Click the video to watch!</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </>
                : null}
        </div >
    );
}

export default RelatedVideos;
