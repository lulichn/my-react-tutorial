import React from 'react';
import $ from 'jquery';

import CommentList from './CommentList';
import CommentForm from './CommentForm';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const darkMuiTheme = getMuiTheme(darkBaseTheme);

export default class CommentBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };

        this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
    }

    loadCommentsFromServer() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: data => { this.setState({ data: data }); },
            error: (xhr, status, err) => { console.error(this.props.url, status, err.toString()); }
        });
    }

    handleCommentSubmit(comment) {
        const comments = this.state.data;
        const newComments = comments.concat([comment]);
        this.setState({ data: newComments });

        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: comment,
            success: data => { this.setState({data: data}); },
            error: (xhr, status, err) => {
                this.setState({ data: comments });
                console.error(this.props.url, status, err.toString());
            }
        });
    }

    componentDidMount() {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    }

    render() {
        return (
            <MuiThemeProvider muiTheme = { darkMuiTheme }>
                <div className = "commentBox">
                    <h1>Comments</h1>
                    <CommentList data = { this.state.data } />
                    <CommentForm onCommentSubmit = { this.handleCommentSubmit.bind(this) } />
                </div>
            </MuiThemeProvider>
        );
    }
}