import { useEffect, useState } from 'react';
import { getFeedRequest } from '../../api/get-feed';
import PostList from '../../components/posts/PostList';
import PostDto from '../../dtos/post.dto';
import { hardcodedPosts } from '../../hardcoded-data/hardcoded-posts';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import PostUploadSection from './PostUploadSection';

const HomePage = () => {
  const [posts, setPosts] = useState<PostDto[]>();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getFeedRequest(0);

      switch (response.status) {
        case HttpStatusCode.OK:
          const message = await response.json();
          setPosts(message.Posts);
          break;
        default:
          alert('Unknown error occurred');
      }
    };

    fetchPosts();
  }, []);

  const appendPostItem = (post: PostDto) => {
    setPosts([post, ...(posts || [])]);
  };

  return (
    <div className='bg-gray-300 '>
      <PostUploadSection appendPostItem={appendPostItem} />
      {posts && <PostList isFeed posts={posts} removePostItem={() => {}} />}
    </div>
  );
};

export default HomePage;
