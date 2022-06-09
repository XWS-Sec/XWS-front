import { useEffect, useState } from 'react';
import { dateTimeFormatOptions } from '../../utils/date-time-format-options';
import UserImage from '../common/UserImage';
import LikeButton from '../like/LikeButton';
import { Link } from 'react-router-dom';
import PostActionsButton from './PostActionsButton';
import { PostType } from '../../dtos/post-type.enum';
import PostDto from '../../dtos/post.dto';
import UserInfoDto from '../../dtos/user-info.dto';
import UserListPopup from '../user-list/UserListPopup';
import CommentSection from '../comments/CommentSection';
import { getUserInfoById } from '../../api/get-user-info-by-id';
import { HttpStatusCode } from '../../utils/http-status-code.enum';

const PostItem = (props: {
  post: PostDto;
  removePostItem: (postId: number) => void;
}) => {
  const locale = 'en-US'; // TODO: get from local storage or cookie

  const [poster, setPoster] = useState<UserInfoDto>();
  const [isLiked, setIsLiked] = useState(false);
  const [fetchingLike, setFetchingLike] = useState(false);
  const [likesCount, setLikesCount] = useState(
    props.post.Liked ? props.post.Liked.length : 0
  );
  const [usersWhoLikedPost, setUsersWhoLikedPost] = useState<UserInfoDto[]>([]);
  const [usersWhoLikedPostPage, setUsersWhoLikedPostPage] = useState(1);
  const [isUsersWhoLikedPostPopupHidden, setIsUsersWhoLikedPostPopupHidden] =
    useState(true);
  const [fetchingUsersWhoLikedPost, setFetchingUsersWhoLikedPost] =
    useState(false);
  const [reachedLastPage, setReachedLastPage] = useState(false);

  useEffect(() => {
    const fetchPoster = async () => {
      const response = await getUserInfoById(props.post.PosterId);

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
  }, [props.post]);

  return (
    <div className='bg-white mt-5 w-screen md:w-614px rounded shadow-lg'>
      <UserListPopup
        title='Likes'
        users={usersWhoLikedPost}
        isHidden={isUsersWhoLikedPostPopupHidden}
        toggle={() => {}}
        incrementPage={() => {}}
        fetchingUsers={fetchingUsersWhoLikedPost}
      />
      <div className='flex justify-between'>
        {poster && (
          <div className='flex flex-row items-center'>
            <Link to={poster.Username} className='m-2'>
              <UserImage src={undefined} width={50} height={50} />
            </Link>
            <div>
              <Link to={poster.Username} className='font-bold'>
                {poster.Username}
              </Link>
              <p className='text-xs text-gray-600'>
                {new Date(props.post.DateCreated).toLocaleString(
                  locale,
                  dateTimeFormatOptions
                )}
              </p>
            </div>
          </div>
        )}
        <div className='mt-4'>
          <PostActionsButton
            post={props.post}
            removePostItem={props.removePostItem}
          />
        </div>
      </div>
      <div className='flex flex-col items-center bg-black mb-1'>
        {/* TODO: uncomment once HasPicture is available on frontend {props.post.HasPicture && ( */}
        <img src={`/api/PostPicture/${props.post.Id}`} alt='' />
        {/* )} */}
      </div>
      <div>
        <p className='text-left mx-4 mb-1 leading-5'>{props.post.Text}</p>
      </div>
      <div>
        <div className='flex flex-row items-center mb-1'>
          <div className='mt-1 ml-4 mr-2'>
            <LikeButton
              isLiked={isLiked}
              isLikedChangeHandler={async () => false}
              fetching={fetchingLike}
            />
          </div>
          <button className='mr-4 hover:underline' onClick={() => {}}>
            {likesCount} likes
          </button>
          <p className='flex-grow  text-right mx-4'>
            {props.post.Comments.length} comments
          </p>
        </div>
      </div>
      <CommentSection postId={props.post.Id} />
    </div>
  );
};

export default PostItem;
