import { PostType } from '../dtos/post-type.enum';
import PostDto from '../dtos/post.dto';
import { hardcodedUser } from './hardcoded-user';

export const hardcodedPosts: PostDto[] = [
  {
    id: 'poxzcml',
    postType: PostType.STATUS,
    text: 'Some status post text',
    fileLocation: '',
    dateCreated: new Date(),
    likes: [],
    dislikes: [],
    comments: [],
    isLikedByPrincipal: false,
    posterId: hardcodedUser.id,
  },
  {
    id: 'wescoxzcml',
    postType: PostType.PHOTO,
    text: 'Some photo post text',
    fileLocation:
      'https://andscape.com/wp-content/uploads/2021/05/GettyImages-3128062-e1621276844472.jpg?w=1500',
    dateCreated: new Date(),
    likes: [],
    dislikes: [],
    comments: [],
    isLikedByPrincipal: false,
    posterId: hardcodedUser.id,
  },
];
