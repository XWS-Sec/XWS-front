import { useEffect, useState } from 'react';
import PostList from '../../components/posts/PostList';
import PostDto from '../../dtos/post.dto';
import { hardcodedPosts } from '../../hardcoded-data/hardcoded-posts';
import PostUploadSection from './PostUploadSection';

const HomePage = () => {
  const [posts, setPosts] = useState<PostDto[]>();

  useEffect(() => {
    //TODO: fetch feed
    setPosts(hardcodedPosts);
  }, []);

  const appendPostItem = (post: PostDto) => {
    setPosts([post, ...(posts || [])]);
  };

  return (
    <div className='bg-gray-300 '>
      <PostUploadSection appendPostItem={appendPostItem} />
      {posts && (
        <PostList posts={posts} fetching={false} removePostItem={() => {}} />
      )}
    </div>
  );
};

export default HomePage;
