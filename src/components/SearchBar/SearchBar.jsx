import React from 'react';
import './SearchBar.css';

const SearchBar = (props) => {
    return (
        <div>
            <div>
                <nav className="navbar navbar-light">
                    <div className="container-fluid">
                        <form className="d-flex" onSubmit={props.handleSubmit}>
                            <input className="search-box" type="search" placeholder="Search" aria-label="Search" onChange={props.handleChange} value={props.search} />
                            <input className='search-icon' type="image" id='image' alt='search icon' img src={require('../../Photos/search.jpg')}></input>

                        </form>
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default SearchBar;