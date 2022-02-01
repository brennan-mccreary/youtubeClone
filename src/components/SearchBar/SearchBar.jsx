import React from 'react';
import './SearchBar.css';

const SearchBar = (props) => {
    return (
        <div>
            <div>
                <nav className="navbar navbar-light">
                    <div className="container-fluid">
                        <form className="d-flex" onSubmit={props.handleSubmit}>
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={props.handleChange} value={props.search} />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default SearchBar;