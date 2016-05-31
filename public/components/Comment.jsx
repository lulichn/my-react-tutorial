import React from 'react';
import marked from 'marked';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';


export default class Comment extends React.Component {
    rawMarkup() {
        const rawMarkup = marked(this.props.children.toString(), { sanitize: true });
        return { __html: rawMarkup };
    }

    render() {
        return (
            <TableRow
                key = { this.props.author } >
                <TableRowColumn>
                    { this.props.author }
                </TableRowColumn>
                <TableRowColumn>
                    <span dangerouslySetInnerHTML = { this.rawMarkup() } />
                </TableRowColumn>
            </TableRow>
        );
    }
}