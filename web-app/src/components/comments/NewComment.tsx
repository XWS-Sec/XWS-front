import { useRef, useState } from 'react';
import CommentDto from '../../dtos/comment.dto';
import LoadingSpinner from '../common/LoadingSpinner';

const NewComment = (props: {
  postId: string;
  appendComment: (comment: CommentDto) => void;
}) => {
  const [text, setText] = useState('');
  const [fetching, setFetching] = useState(false);
  const textInputRef = useRef<HTMLTextAreaElement>(null);

  const textChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  return (
    <div className='w-full p-2'>
      <div className='flex items-center'>
        <textarea
          className='py-1 px-2 input resize-none w-full'
          placeholder='Comment on this...'
          onChange={textChangeHandler}
          maxLength={250}
          disabled={fetching}
          ref={textInputRef}
        ></textarea>
        <div className='flex justify-center items-center w-20'>
          {fetching ? (
            <LoadingSpinner />
          ) : (
            <button className='btnGreenWhite ml-2 py-1' onClick={() => {}}>
              Post
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewComment;
