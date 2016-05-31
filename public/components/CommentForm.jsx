import React from 'react';
import ReactDOM from 'react-dom';

export default class CommentForm extends React.Component {
    handleSubmit(event) {
        event.preventDefault();
        const author = ReactDOM.findDOMNode(this.refs.author).value.trim();
        const text = ReactDOM.findDOMNode(this.refs.text).value.trim();

        if (!text || !author) return;

        this.props.onCommentSubmit({ author: author, text: text });

        ReactDOM.findDOMNode(this.refs.author).value = '';
        ReactDOM.findDOMNode(this.refs.text).value = '';

        return false;
    }

    render() {
        return (
            <form className = "commentForm" onSubmit = { this.handleSubmit.bind(this) } >
                <input type = "text" placeholder = "Your Name" ref = 'author' />
                <input type = "text" placeholder = "Say something!" ref = 'text'  />
                <input type = "submit" value = "Post" />
            </form>
        );
    }
}