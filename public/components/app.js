import ReactDOM from 'react-dom';
import CommentBox from './CommentBox';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

ReactDOM.render(
    <CommentBox url='api/comments' pollInterval = { 2000 } />,
    document.getElementById('content')
);
