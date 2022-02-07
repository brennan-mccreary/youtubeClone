import React from 'react';
import '../Test/Test.css'

const Test = () => {
    return (
        <div>
            <div className='container-row'>
                <div className='row row-cols-3'>
                    <div className="card">
                        <div className='col'>
                            <img src={require('../../Photos/record.jpg')} className="card-img-top" alt="Record player" />
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">Click the video to watch!</p>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className='col'>
                            <img src={require('../../Photos/record.jpg')} className="card-img-top" alt="Record player" />
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">Click the video to watch!</p>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className='col'>
                            <img src={require('../../Photos/record.jpg')} className="card-img-top" alt="Record player" />
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">Click the video to watch!</p>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className='col'>
                            <img src={require('../../Photos/record.jpg')} className="card-img-top" alt="Record player" />
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">Click the video to watch!</p>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className='col'>
                            <img src={require('../../Photos/record.jpg')} className="card-img-top" alt="Record player" />
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">Click the video to watch!</p>
                            </div>
                        </div>
                    </div>
                </div >
            </div>
        </div >
    );
}

export default Test
