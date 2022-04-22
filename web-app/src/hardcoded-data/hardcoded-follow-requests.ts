import FollowRequest from '../model/FollowRequest';

export const hardcodedFollowRequests: FollowRequest[] = [
  {
    id: '1',
    sender: {
      id: 'wqaczx21',
      username: 'allen_iverson',
      firstName: 'Allen',
      lastName: 'Iverson',
      profilePictureLocation:
        'https://thespun.com/wp-content/uploads/2019/04/GettyImages-1939608.jpg',
      profileDescription: '',
      isFollowedByPrincipal: false,
      isRequestedByPrincipal: false,
    },
  },
  {
    id: '2',
    sender: {
      id: '23faczcaqwex',
      username: 'kobe',
      firstName: 'Kobe',
      lastName: 'Bryant',
      profilePictureLocation:
        'https://www.billboard.com/wp-content/uploads/media/kobe-bryant-1999-lakers-billboard-650.jpg?w=650',
      profileDescription: '',
      isFollowedByPrincipal: true,
      isRequestedByPrincipal: false,
    },
  },
];
