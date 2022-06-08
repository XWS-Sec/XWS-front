import { dateTimeFormatOptions } from '../../utils/date-time-format-options';
import UserImage from '../common/UserImage';
import { Link } from 'react-router-dom';
import CommentActionsButton from './CommentActionsButton';
import CommentDto from '../../dtos/comment.dto';

const CommentItem = (props: {
  comment: CommentDto;
  removeCommentItem: (commentId: number) => void;
}) => {
  const user = props.comment.user;
  const locale = 'en-US'; // TODO: get from local storage or cookie

  return (
    <div className='flex'>
      <Link to={user.Username} className='m-2 mt-0 flex-2'>
        <UserImage src={user.profilePictureLocation} width={50} height={50} />
      </Link>
      <div className='flex flex-1 justify-between bg-gray-100 mr-2 mb-2 rounded-md'>
        <div className='flex flex-col flex-grow'>
          <div className='text-1xl text-left pl-2 pb-1 break-words leading-5'>
            <div className='flex'>
              <Link to={user.Username}>
                <p className='font-bold'>{user.Username}</p>
              </Link>
            </div>
            {props.comment.text}
            <div className='flex justify-end'>
              <p className='text-xs text-gray-600 mb-1'>
                {new Date(props.comment.dateCreated).toLocaleString(
                  locale,
                  dateTimeFormatOptions
                )}
              </p>
            </div>
          </div>
        </div>
        <div className='mt-1'>
          <CommentActionsButton
            comment={props.comment}
            removeCommentItem={props.removeCommentItem}
          />
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
