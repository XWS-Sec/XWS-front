import { useState } from 'react';
import CommentDto from '../../dtos/comment.dto';
import ActionsButton from '../common/ActionsButton';
import CommentActionsPopup from './CommentActionsPopup';

const CommentActionsButton = (props: {
  comment: CommentDto;
  removeCommentItem: (commentId: number) => void;
}) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  return (
    <div>
      {isPopupVisible && (
        <CommentActionsPopup
          comment={props.comment}
          toggle={togglePopup}
          removeCommentItem={props.removeCommentItem}
        />
      )}
      <ActionsButton togglePopup={togglePopup} />
    </div>
  );
};

export default CommentActionsButton;
