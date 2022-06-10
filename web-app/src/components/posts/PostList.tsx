import PostDto from '../../dtos/post.dto';
import UserInfoDto from '../../dtos/user-info.dto';
import LoadingSpinner from '../common/LoadingSpinner';
import PostItem from './PostItem';

const PostList = (props: {
  isFeed?: boolean;
  posts: PostDto[];
  removePostItem: (postId: number) => void;
  user?: UserInfoDto;
}) => {
  return (
    <div className='bg-gray-300 min-h-screen pb-16 flex flex-col items-center'>
      {props.posts ? (
        <div className='flex flex-col items-center flex-grow'>
          {props.posts.map((post) => (
            <PostItem
              key={post.Id}
              post={post}
              removePostItem={props.removePostItem}
            />
          ))}
          {!props.isFeed && !props.posts.length && (
            <div className='flex flex-col items-center bg-gray-100 md:w-500px p-3 rounded-xl mt-10'>
              {props.user?.Username} hasn't posted anything yet.
            </div>
          )}
        </div>
      ) : (
        <div className='flex flex-grow mt-14'>
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default PostList;
