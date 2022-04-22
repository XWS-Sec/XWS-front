import CommentDto from '../../dtos/comment.dto';
import ActionsPopup from '../common/ActionsPopup';

const CommentActionsPopup = (props: {
  comment: CommentDto;
  toggle: () => void;
  removeCommentItem: (commentId: number) => void;
}) => {
  return <ActionsPopup toggle={props.toggle} actions={[]} />;
};

export default CommentActionsPopup;
