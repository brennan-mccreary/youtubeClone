import React from 'react';
import './SearchResults.css';

const SearchResults = (props) => {
    return (
        <div>
            {(props.data.length > 0) ?
                <div className='video-card-container col-xs-12'>
                    {props.data.map((el, i) =>
                        <div className='video-card' id='search-results' key={i}>
                            <div className="row row-cols">
                                <div className="col">
                                    <div className="card">
                                        <img src={(el[0].snippet.thumbnails.high.url)} className="card-img-top" alt="random"></img>
                                        <div className="card-body">
                                            <h5 className="card-title">{(el[0].snippet.title)}</h5>
                                            <p className="card-text">{(el[0].snippet.description)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                : <div> No search results found. </div>}
        </div>
    );
}

export default SearchResults;
