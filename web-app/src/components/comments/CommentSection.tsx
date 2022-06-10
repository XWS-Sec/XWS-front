import CommentItem from './CommentItem';
import NewComment from './NewComment';
import { useState } from 'react';
import LoadingSpinner from '../common/LoadingSpinner';
import CommentDto from '../../dtos/comment.dto';

const CommentSection = (props: { postId: string; comments: any }) => {
  const [comments, setComments] = useState<any>(props.comments);
  const [page, setPage] = useState(1);
  const [fetching, setFetching] = useState(false);

  const appendComment = (comment: any) => {
    setComments([...comments!, comment]);
  };

  return (
    <div className='bg-gray-200 pt-2'>
      {comments ? (
        comments.map((comment: any) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            removeCommentItem={() => {}}
          />
        ))
      ) : (
        <div className='flex justify-center'>
          <LoadingSpinner />
        </div>
      )}
      <NewComment postId={props.postId} appendComment={appendComment} />
    </div>
  );
};

export default CommentSection;
