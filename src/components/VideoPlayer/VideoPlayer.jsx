import React from 'react';
import './VideoPlayer.css'


const VideoPlayer = () => {
    return (


        <div>
            <div className="row row-cols">
                <div className="col">
                    <div className="card">
                        <img src={require("../../Photos/record.jpg")} className="card-img-top" alt="random"></img>
                        <div className="card-body">
                            <h5 className="card-title">Song Title</h5>
                            <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className="card">
                        <img src={require("../../Photos/record.jpg")} className="card-img-top" alt="random"></img>
                        <div className="card-body">
                            <h5 className="card-title">Song Title</h5>
                            <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className="card">
                        <img src={require("../../Photos/record.jpg")} className="card-img-top" alt="random"></img>
                        <div className="card-body">
                            <h5 className="card-title">Song Title</h5>
                            <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className="card">
                        <img src={require("../../Photos/record.jpg")} className="card-img-top" alt="random"></img>
                        <div className="card-body">
                            <h5 className="card-title">Song Title</h5>
                            <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className="card">
                        <img src={require("../../Photos/record.jpg")} className="card-img-top" alt="random"></img>
                        <div className="card-body">
                            <h5 className="card-title">Song Title</h5>
                            <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                        </div>
                    </div>
                </div>
            </div>



            <div className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title">Comments</h5>
                    <p className="card-text">Anonymous242</p>
                    <p className="card-text">This song is my favorite!! I listen to it all the time when I code!</p>
                </div>
            </div>
        </div>
    )
}

export default VideoPlayer;