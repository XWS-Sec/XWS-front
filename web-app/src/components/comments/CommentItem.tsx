import { dateTimeFormatOptions } from '../../utils/date-time-format-options';
import UserImage from '../common/UserImage';
import { Link } from 'react-router-dom';
import CommentActionsButton from './CommentActionsButton';
import CommentDto from '../../dtos/comment.dto';
import { useEffect, useState } from 'react';
import { getUserInfoByIdRequest } from '../../api/get-user-info-by-id';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import UserInfoDto from '../../dtos/user-info.dto';

const CommentItem = (props: {
  comment: any;
  removeCommentItem: (commentId: number) => void;
}) => {
  const locale = 'en-US'; // TODO: get from local storage or cookie
  const [poster, setPoster] = useState<UserInfoDto>();

  useEffect(() => {
    const fetchPoster = async () => {
      const response = await getUserInfoByIdRequest(props.comment.CommenterId);

      switch (response.status) {
        case HttpStatusCode.OK:
          const poster = await response.json();
          setPoster(poster);
          break;
        default:
          alert('Unknown error occurred');
      }
    };

    fetchPoster();
  }, [props.comment]);

  return (
    <div className='flex'>
      {poster && (
        <Link to={poster.Username} className='m-2 mt-0 flex-2'>
          <UserImage userId={poster.Id} width={50} height={50} />
        </Link>
      )}
      <div className='flex flex-1 justify-between bg-gray-100 mr-2 mb-2 rounded-md'>
        <div className='flex flex-col flex-grow'>
          <div className='text-1xl text-left pl-2 pb-1 break-words leading-5'>
            <div className='flex'>
              {poster && (
                <Link to={poster.Username}>
                  <p className='font-bold'>{poster.Username}</p>
                </Link>
              )}
            </div>
            {props.comment.Text}
            <div className='flex justify-end'>
              <p className='text-xs text-gray-600 mb-1'>
                {new Date(props.comment.DateCreated).toLocaleString(
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
