import { useContext, useEffect, useState } from 'react';
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
import { getUserInfoByIdRequest } from '../../api/get-user-info-by-id';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import Linkify from 'react-linkify';
import AuthContext from '../../context/auth-context';
import DislikeButton from '../like/DislikeButton';

const PostItem = (props: {
  post: PostDto;
  removePostItem: (postId: number) => void;
}) => {
  const locale = 'en-US'; // TODO: get from local storage or cookie
  const authContext = useContext(AuthContext);

  const [poster, setPoster] = useState<UserInfoDto>();
  const [isLiked, setIsLiked] = useState(
    !!props.post.Liked.filter((userId) => userId === authContext.user.id).length
  );
  const [isDisliked, setIsDisliked] = useState(
    !!props.post.Disliked.filter((userId) => userId === authContext.user.id)
      .length
  );
  const [fetchingLike, setFetchingLike] = useState(false);
  const [fetchingDislike, setFetchingDislike] = useState(false);
  const [likesCount, setLikesCount] = useState(
    props.post.Liked ? props.post.Liked.length : 0
  );
  const [dislikesCount, setDislikesCount] = useState(
    props.post.Disliked ? props.post.Disliked.length : 0
  );
  const [isUsersWhoLikedPostPopupHidden, setIsUsersWhoLikedPostPopupHidden] =
    useState(true);
  const [
    isUsersWhoDislikedPostPopupHidden,
    setIsUsersWhoDislikedPostPopupHidden,
  ] = useState(true);

  useEffect(() => {
    const fetchPoster = async () => {
      const response = await getUserInfoByIdRequest(props.post.PosterId);

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

  const componentDecorator = (href: any, text: any, key: any) => (
    <a href={href} key={key} target='_blank' className='text-blue-800'>
      {text}
    </a>
  );

  const likePost = async (): Promise<boolean> => {
    let success = false;
    setFetchingLike(true);

    const response = await fetch('/api/Post/like/' + props.post.Id, {
      method: 'POST',
    });

    setFetchingLike(false);

    switch (response.status) {
      case HttpStatusCode.OK:
        if (isDisliked) {
          setDislikesCount(dislikesCount - 1);
          setIsDisliked(false);
        }
        setLikesCount(likesCount + 1);
        setIsLiked(true);
        success = true;
        break;
      default:
    }

    return success;
  };

  const dislikePost = async (): Promise<boolean> => {
    let success = false;
    setFetchingDislike(true);

    const response = await fetch('/api/Post/dislike/' + props.post.Id, {
      method: 'POST',
    });

    setFetchingDislike(false);

    switch (response.status) {
      case HttpStatusCode.OK:
        if (isLiked) {
          setLikesCount(likesCount - 1);
          setIsLiked(false);
        }
        setDislikesCount(dislikesCount + 1);
        setIsDisliked(true);
        success = true;
        break;
      default:
    }

    return success;
  };

  return (
    <div className='bg-white mt-5 w-screen md:w-614px rounded shadow-lg'>
      <UserListPopup
        title='Likes'
        users={props.post.Liked}
        isHidden={isUsersWhoLikedPostPopupHidden}
        toggle={() =>
          setIsUsersWhoLikedPostPopupHidden(!isUsersWhoLikedPostPopupHidden)
        }
        incrementPage={() => {}}
        fetchingUsers={false}
      />
      <UserListPopup
        title='Dislikes'
        users={props.post.Disliked}
        isHidden={isUsersWhoDislikedPostPopupHidden}
        toggle={() =>
          setIsUsersWhoDislikedPostPopupHidden(
            !isUsersWhoDislikedPostPopupHidden
          )
        }
        incrementPage={() => {}}
        fetchingUsers={false}
      />
      <div className='flex justify-between'>
        {poster && (
          <div className='flex flex-row items-center'>
            <Link to={`/users/${poster.Username}`} className='m-2'>
              <UserImage userId={poster.Id} width={50} height={50} />
            </Link>
            <div>
              <Link to={`/users/${poster.Username}`} className='font-bold'>
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
        <p className='text-left mx-4 mb-1 leading-5'>
          <Linkify componentDecorator={componentDecorator}>
            {props.post.Text}
          </Linkify>
        </p>
      </div>
      <div>
        <div className='flex flex-row items-center mb-1'>
          <div className='mt-1 ml-4 mr-2'>
            <LikeButton
              isLiked={isLiked}
              likePost={likePost}
              fetching={fetchingLike}
            />
          </div>
          <button
            className='mr-4 hover:underline'
            onClick={() => setIsUsersWhoLikedPostPopupHidden(false)}
          >
            {likesCount} likes
          </button>
          <div className='mt-1 ml-4 mr-2'>
            <DislikeButton
              isDisliked={isDisliked}
              dislikePost={dislikePost}
              fetching={fetchingDislike}
            />
          </div>
          <button
            className='mr-4 hover:underline'
            onClick={() => setIsUsersWhoDislikedPostPopupHidden(false)}
          >
            {dislikesCount} dislikes
          </button>
          <p className='flex-grow  text-right mx-4'>
            {props.post.Comments.length} comments
          </p>
        </div>
      </div>
      <CommentSection postId={props.post.Id} comments={props.post.Comments} />
    </div>
  );
};

export default PostItem;
