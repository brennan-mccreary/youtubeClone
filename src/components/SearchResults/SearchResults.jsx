import React from 'react';
import './SearchResults.css';

const SearchResults = (props) => {
    return (
        <div>
            {(props.hasSearched === true) ?


                <div id='search-results'>hello</div>
                : null}



        </div>

    );
}

export default SearchResults;
