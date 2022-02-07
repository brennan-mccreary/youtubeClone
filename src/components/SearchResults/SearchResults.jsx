import React from 'react';
import './SearchResults.css';

const SearchResults = (props) => {
    return (
        <div className='container-row'>
            Search Results
            {(props.searchResults.length > 0) ?
                <>
                    <div className='row row-cols-3' id='search-results'>
                        {props.searchResults.map((el, i) =>
                            <div className='card' key={i}>
                                <div className="col">
                                    <div className="card" id={i}>
                                        <img src={(el.snippet.thumbnails.high.url)} onClick={props.handleClick} className="card-img-top" alt="random"></img>
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
                : <div> No search results found. </div>}
        </div>
    );
}

export default SearchResults;
