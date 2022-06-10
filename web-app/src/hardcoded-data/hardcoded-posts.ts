import { PostType } from '../dtos/post-type.enum';
import PostDto from '../dtos/post.dto';
import { hardcodedUser } from './hardcoded-user';

export const hardcodedPosts: PostDto[] = [
  {
    Id: 'poxzcml',
    HasPicture: false,
    Text: 'Some status post text',
    DateCreated: new Date(),
    Liked: [],
    Disliked: [],
    Comments: [],
    PosterId: hardcodedUser.Id,
  },
  {
    Id: 'wescoxzcml',
    HasPicture: true,
    Text: 'Some photo post text',
    DateCreated: new Date(),
    Liked: [],
    Disliked: [],
    Comments: [],
    PosterId: hardcodedUser.Id,
  },
];
