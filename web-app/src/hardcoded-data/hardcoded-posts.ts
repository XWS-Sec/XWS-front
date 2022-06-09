import { PostType } from '../dtos/post-type.enum';
import PostDto from '../dtos/post.dto';
import { hardcodedUser } from './hardcoded-user';

export const hardcodedPosts: PostDto[] = [
  {
    Id: 'poxzcml',
    postType: PostType.STATUS,
    Text: 'Some status post text',
    fileLocation: '',
    DateCreated: new Date(),
    Likes: [],
    Dislikes: [],
    Comments: [],
    isLikedByPrincipal: false,
    PosterId: hardcodedUser.Id,
  },
  {
    Id: 'wescoxzcml',
    postType: PostType.PHOTO,
    Text: 'Some photo post text',
    fileLocation:
      'https://andscape.com/wp-content/uploads/2021/05/GettyImages-3128062-e1621276844472.jpg?w=1500',
    DateCreated: new Date(),
    Likes: [],
    Dislikes: [],
    Comments: [],
    isLikedByPrincipal: false,
    PosterId: hardcodedUser.Id,
  },
];
