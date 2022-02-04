import React from 'react';
import '../Test/Test.css'

const Test = () => {
    return (
        <div className='container'>
            <div className="row">
                <div className='video-card col'>
                    <div className="row row-cols">
                        <div className="col">
                            <div className="card">
                                <img src={require('../../Photos/record.jpg')} className="card-img-top" alt="random"></img>
                                <div className="card-body" >
                                    <h5 className="card-title">hey</h5>
                                    <p className="card-text">Click the video to watch!</p>
                                </div>
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <h5 className="card-title">Comments</h5>
                                        <p className="card-text">Anonymous242</p>
                                        <p className="card-text">This song is my favorite!! I listen to it all the time when I code!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='video-card col'>
                    <div className="row row-cols">
                        <div className="col">
                            <div className="card">
                                <img src={require('../../Photos/record.jpg')} className="card-img-top" alt="random"></img>
                                <div className="card-body" >
                                    <h5 className="card-title">hey</h5>
                                    <p className="card-text">Click the video to watch!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='video-card col'>
                    <div className="row row-cols">
                        <div className="col">
                            <div className="card">
                                <img src={require('../../Photos/record.jpg')} className="card-img-top" alt="random"></img>
                                <div className="card-body" >
                                    <h5 className="card-title">hey</h5>
                                    <p className="card-text">Click the video to watch!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='video-card col'>
                    <div className="row row-cols">
                        <div className="col">
                            <div className="card">
                                <img src={require('../../Photos/record.jpg')} className="card-img-top" alt="random"></img>
                                <div className="card-body" >
                                    <h5 className="card-title">hey</h5>
                                    <p className="card-text">Click the video to watch!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='video-card col'>
                    <div className="row row-cols">
                        <div className="col">
                            <div className="card">
                                <img src={require('../../Photos/record.jpg')} className="card-img-top" alt="random"></img>
                                <div className="card-body" >
                                    <h5 className="card-title">hey</h5>
                                    <p className="card-text">Click the video to watch!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>





            </div>
        </div>
    );
}

export default Test
