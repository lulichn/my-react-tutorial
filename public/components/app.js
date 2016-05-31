import CommentBox from './CommentBox';

export default function App() {
    return (
        <CommentBox url='api/comments' pollInterval = { 2000 } />
    );
}
