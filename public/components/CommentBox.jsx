import React from 'react';
import $ from 'jquery';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';


import CommentList from './CommentList';
import CommentForm from './CommentForm';

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
            <div className = "commentBox">
                <Table
                    height = { 300 }
                    fixedHeader = { true } >
                    <TableHeader
                        displaySelectAll = { false }
                        adjustForCheckbox = { false } >
                        <TableRow>
                            <TableHeaderColumn>Author</TableHeaderColumn>
                            <TableHeaderColumn>Comment</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox = { false } >
                        <CommentList data = { this.state.data } />
                    </TableBody>
                </Table>
                <br />
                <CommentForm onCommentSubmit = { this.handleCommentSubmit.bind(this) } />
            </div>
        );
    }
}