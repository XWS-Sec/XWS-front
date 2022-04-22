import PostDto from '../../dtos/post.dto';
import ActionsPopup from '../common/ActionsPopup';

const PostActionsPopup = (props: {
  post: PostDto;
  toggle: () => void;
  removePostItem: (postId: number) => void;
}) => {
  return <ActionsPopup toggle={props.toggle} actions={[]} />;
};

export default PostActionsPopup;
