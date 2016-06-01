import React from 'react';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import Comment from './Comment';

export default class CommentList extends React.Component {
    render() {
        const commentNodes = this.props.data.map(comment => {
            return (
                <Comment author = { comment.author } >
                    { comment.text }
                </Comment>
            );
        });

        return (
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
                    { commentNodes }
                </TableBody>
            </Table>
        );
    }
}