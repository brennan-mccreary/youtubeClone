import React from 'react';
import './Comments.css';

const Comments = (props) => {
    return (
        <div className='top-level' id='comments' hidden={true}>
            Add a comment
            <form className="comment-box" onSubmit={props.submitComment}>
                <textarea rows="1" value={props.commentText} onChange={props.changeComment}></textarea>
                <div className='button'>
                    <button>Post</button>
                </div>
            </form>
            {(props.comments.length > 0) ?
                <div>
                    {props.comments.map((el, i) =>
                        <div className="card mb-3" key={i}>
                            <div className="card-body" id={el._id}>
                                <p className="card-text">{el.text}</p>
                                <p className="card-text">Likes: {el.likeCount} and Dislikes: {el.dislikeCount}</p>
                                <button onClick={props.clickLike}>Like</button>
                                <button onClick={props.clickDislike}>Dislike</button>
                                <div>
                                    {(el.replies.length > 0) ?
                                        <div>
                                            {el.replies.map((el, i) =>
                                                <div key={i}>
                                                    <div className='reply-box'>
                                                        <p key={i} className="card-text">-{el.text}</p>
                                                    </div>
                                                    <div className='reply-spacer'></div>
                                                </div>
                                            )}
                                        </div>
                                        : null}
                                </div>
                                <form onSubmit={props.submitReply}>
                                    <textarea rows="1" value={props.replyText} onChange={props.changeReply}></textarea>
                                    <button>Reply</button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
                : null}
        </div>
    );
}

export default Comments;