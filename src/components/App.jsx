//import { render } from '@testing-library/react';
import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    //HTTP Requests
    ////GET Initial Test
    getInit = async () => {
        await axios
            .get('http://localhost:5002/')
            .then((res) => {
                console.log(res.data);
            })
    };

    //Run When Component Initially Mounts
    componentDidMount() {
        this.getInit();
    };

    //Render
    render() {
        return (
            <h1>our Youtube Project</h1>
        )
    }
}

export default App;