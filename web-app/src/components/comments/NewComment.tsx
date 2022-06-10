import { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/auth-context';
import authContext, { unsignedUser } from '../../context/auth-context';
import CommentDto from '../../dtos/comment.dto';
import { CreateCommentDto } from '../../dtos/create-comment.dto';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import LoadingSpinner from '../common/LoadingSpinner';

const NewComment = (props: {
  postId: string;
  appendComment: (comment: CommentDto) => void;
}) => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [fetching, setFetching] = useState(false);
  const textInputRef = useRef<HTMLTextAreaElement>(null);

  const textChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const createComment = async () => {
    setFetching(true);

    const response = await fetch('/api/Post/comment/' + props.postId, {
      method: 'POST',
      headers: [['Content-type', 'application/json']],
      body: JSON.stringify({ text: text }),
    });

    switch (response.status) {
      case HttpStatusCode.OK:
        textInputRef.current!.value = '';
        setText('');
        const reply = await response.json();
        props.appendComment(JSON.parse(reply.Message));
        break;
      case HttpStatusCode.UNAUTHORIZED:
        localStorage.clear();
        navigate('/');
        authContext.updateAuthContext(unsignedUser);
    }

    setFetching(false);
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
            <button className='btnGreenWhite ml-2 py-1' onClick={createComment}>
              Post
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewComment;
