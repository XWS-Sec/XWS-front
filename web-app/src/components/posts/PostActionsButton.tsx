import { useState } from 'react';
import PostDto from '../../dtos/post.dto';
import ActionsButton from '../common/ActionsButton';
import PostActionsPopup from './PostActionsPopup';

const PostActionsButton = (props: {
  post: PostDto;
  removePostItem: (postId: number) => void;
}) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  return (
    <div>
      {isPopupVisible && (
        <PostActionsPopup
          post={props.post}
          toggle={togglePopup}
          removePostItem={props.removePostItem}
        />
      )}
      <ActionsButton togglePopup={togglePopup} />
    </div>
  );
};

export default PostActionsButton;
