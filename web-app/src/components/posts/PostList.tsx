import PostDto from '../../dtos/post.dto';
import UserInfoDto from '../../dtos/user-info.dto';
import LoadingSpinner from '../common/LoadingSpinner';
import PostItem from './PostItem';

const PostList = (props: {
  posts: PostDto[];
  fetching: boolean;
  removePostItem: (postId: number) => void;
  user?: UserInfoDto;
  postsCount: number;
}) => {
  return (
    <div className='bg-gray-300 min-h-screen pb-16 flex flex-col items-center'>
      {props.posts.length > 0 || props.fetching ? (
        <div className='flex flex-col items-center flex-grow'>
          {props.posts.map((post) => (
            <PostItem
              key={post.id}
              post={post}
              removePostItem={props.removePostItem}
            />
          ))}
          {props.fetching && (
            <div className='flex flex-grow mt-14'>
              <LoadingSpinner />
            </div>
          )}
        </div>
      ) : (
        <div>
          {props.postsCount === 0 && (
            <div className='flex flex-col items-center bg-gray-100 md:w-500px p-3 rounded-xl mt-10'>
              {props.user?.username} hasn't posted anything yet.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostList;
