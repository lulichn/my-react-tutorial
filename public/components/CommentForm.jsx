import React from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class CommentForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            author: '',
            commentText: ''
        };
    }

    onChangeAuthor(e) {
        this.setState({ author: e.target.value });
    }

    onChangeCommentText(e) {
        this.setState({ commentText: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();

        const author = this.state.author;
        const text = this.state.commentText;

        if (!text || !author) return;

        this.props.onCommentSubmit({author: author, text: text });

        this.setState({
            author: '',
            commentText: ''
        });

        // this.refs._author.value = '';
        // ReactDOM.findDOMNode(this.refs._author).value = '';
        // this.refs._author.setState({ value: '' });
    }

    render() {
        return (
            <div>
                <TextField
                    name = '_author'
                    ref = '_author'
                    hintText = 'Your Name'
                    value = { this.author }
                    onChange = { this.onChangeAuthor.bind(this) }
                />
                <br />
                <TextField
                    name = '_commentText'
                    ref = '_commentText'
                    hintText = 'Comment'
                    value = { this.commentText }
                    onChange = { this.onChangeCommentText.bind(this) }
                />
                <br />
                <RaisedButton
                    label="Submit"
                    onClick = { this.handleSubmit.bind(this) }
                />
            </div>
        );
    }
}