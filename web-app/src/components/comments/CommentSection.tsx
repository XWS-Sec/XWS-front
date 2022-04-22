import CommentItem from './CommentItem';
import NewComment from './NewComment';
import { useState } from 'react';
import LoadingSpinner from '../common/LoadingSpinner';
import CommentDto from '../../dtos/comment.dto';

const CommentSection = (props: { postId: string }) => {
  const [comments, setComments] = useState<CommentDto[]>([]);
  const [page, setPage] = useState(1);
  const [fetching, setFetching] = useState(false);

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
      <div className='flex items-center justify-center h-8'>
        {fetching ? (
          <div className='flex justify-center'>
            <LoadingSpinner />
          </div>
        ) : (
          <button
            className='btnWhiteGreen text-sm'
            onClick={() => setPage(page + 1)}
          >
            Load more comments
          </button>
        )}
      </div>
      <NewComment postId={props.postId} appendComment={() => {}} />
    </div>
  );
};

export default CommentSection;
