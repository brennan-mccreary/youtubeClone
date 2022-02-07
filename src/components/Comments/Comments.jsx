import React from 'react';
import './Comments.css';

const Comments = (props) => {
    return ( 
        <div className='top-level'>
            Comments
            {(props.comments.length > 0) ? 
            <div>
                {props.comments.map((el, i) => 
                <div className="card mb-3" key={i}>
                    <div className="card-body" id={el._id}>
                        <h5 className="card-title">Likes: {el.likeCount} and Dislikes: {el.dislikeCount}</h5>
                        <p className="card-text">{el.text}</p>
                        <p className="card-text"></p>
                    </div>
                </div>
                )}
            </div>
            : null}
        </div>
     );
}
 
export default Comments;