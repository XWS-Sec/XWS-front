import { format } from 'date-fns';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { sendMessage } from '../../api/changePassword';
import { getFollowRequest, getMessages } from '../../api/get-following';
import { getUserInfoByUsernameRequest } from '../../api/get-user-info-by-username';
import { getUsersPosts } from '../../api/get-users-posts';
import UserImage from '../../components/common/UserImage';
import PostList from '../../components/posts/PostList';
import AuthContext from '../../context/auth-context';
import UserInfoDto from '../../dtos/user-info.dto';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import { ProfilePicture } from '../profile/profile-picture/ProfilePicture';
import ProfileInfo from '../profile/ProfileInfo';
import UserDoesNotExist from '../profile/UserDoesNotExist';

enum ProfileTab {
	POSTS,
	EXPERIENCE,
	SKILLS,
	JOB_OFFERS,
}

const ChatPage = () => {
	const { username } = useParams();
	const authContext = useContext(AuthContext);
	const navigate = useNavigate();

	const [user, setUser] = useState<UserInfoDto>();
	const [sending, setSending] = useState<boolean>(false);
	const [conversations, setConversations] = useState<any[]>([]);
	const [selectedMessages, setSelectedMessages] = useState<any[]>([]);
	const [message, setMessage] = useState<string>('');
	const [userExists, setUserExists] = useState(true);
	const [userPrivateSectionVisible, setUserPrivateSectionVisible] = useState(false);
	const [selectedTab, setSelectedTab] = useState(ProfileTab.POSTS);
	const [posts, setPosts] = useState<any>();
	const [selectedConversation, setSelectedConversation] = useState<any>(null);

	const fetchFollow = async () => {
		const response = await getFollowRequest();

		switch (response.status) {
			case HttpStatusCode.OK:
				const message = await response.json();
				console.log(message);
				setConversations(message.Followers);
				break;
			default:
				console.log('TT');
		}
	};

	useEffect(() => {
		if (!username) {
			return;
		}

		const fetchUserInfo = async () => {
			const response = await getUserInfoByUsernameRequest(username);

			switch (response.status) {
				case HttpStatusCode.OK:
					const user = await response.json();
					setUser(user);
					break;
				case HttpStatusCode.NO_CONTENT:
					setUserExists(false);
					break;
				default:
					alert('Unknown error occurred');
			}
		};

		fetchUserInfo();
	}, [username]);

	const selectChat = async (chat: any) => {
		setSelectedConversation(chat);
		setSelectedMessages([]);
		loadMessages(chat);
	};

	const loadMessages = async (chat: any) => {
		const response = await getMessages(0, chat.Id);

		switch (response.status) {
			case HttpStatusCode.OK:
				const message = await response.json();
				setSelectedMessages(message.Messages);
				break;
			default:
				console.log('TT');
		}
	};

	useEffect(() => {
		const fetchPosts = async () => {
			if (!user) {
				return;
			}

			const response = await getUsersPosts(user.Id, 0);

			switch (response.status) {
				case HttpStatusCode.OK:
					const reply = await response.json();
					setPosts(reply.Posts);
					break;
				case HttpStatusCode.BAD_REQUEST:
					setUserPrivateSectionVisible(true);
					break;
				default:
					alert('Unknown error occurred');
			}
		};
		fetchFollow();
		fetchPosts();
	}, [user]);

	const send = async () => {
		const data = {
			receiverId: selectedConversation.Id,
			message: message,
		};
		setMessage('');
		setSending(true);
		const resp = await sendMessage(data);
		setSending(false);
		loadMessages(selectedConversation);
		// Dobijam Bad Request kao response
	};

	return (
		<div className='flex flex-col flex-grow overflow-y-scroll'>
			<div className='flex flex-row flex-grow bg-gray-100 w-100 p-10'>
				<div className='flex w-96 bg-grey-200 flex-col'>
					<h1>Chat</h1>
					{conversations.map((conversation: any, i: number) => {
						return (
							<div
								key={i}
								className='my-2 bg-white p-3 rounded-md cursor-pointer flex flex-row items-center'
								onClick={() => {
									selectChat(conversation);
								}}
							>
								<div className='mr-4'>
									<UserImage userId={conversation.Id} width={40} height={40} />
								</div>
								<div>
									<p className='font-bold'>
										{conversation.Name} {conversation.Surname}
									</p>
									<label htmlFor=''>{conversation.Username}</label>
								</div>
							</div>
						);
					})}
				</div>
				<div className='flex-1  p-10 -mt-9  flex flex-col'>
					{selectedConversation && (
						<div className='flex flex-1 flex-col'>
							<div className='mb-10 bg-white rounded-md flex flex-row p-4 items-center'>
								{/* Headline */}
								<div className='mr-4'>
									<UserImage userId={selectedConversation.Id} width={80} height={80} />
								</div>
								<div>
									<p className='font-bold'>
										{selectedConversation.Name} {selectedConversation.Surname}
									</p>
									<label htmlFor=''>{selectedConversation.Username}</label>
								</div>
							</div>

							<div className='flex flex-row'>
								<input
									className='border-2 border-gray-300 bg-white h-10 px-3 pr-10 rounded-lg text-sm focus:outline-none flex-1 '
									type='text'
									placeholder='New message'
									onChange={(event: any) => {
										setMessage(event.target.value);
									}}
									value={message}
								/>
								<button className='ml-2' onClick={send}>
									Send
								</button>
							</div>
							{sending && <div className='text-sm text-gray-300'>Message is sending</div>}
							<div className='flex-1 overflow-y-auto'>
								{selectedMessages.map((message: any, index: number) => {
									const isSender = message.SenderId !== selectedConversation?.Id;
									return (
										<div className={` flex flex-col ${isSender ? 'items-end' : 'items-start'} my-2`}>
											<div className='bg-white w-10/12 p-4 rounded-md'>
												<div>{message.Text}</div>
												<div className='text-sm text-gray-300 -mb-2'>{format(new Date(message?.DateCreated), 'dd. MMM yy HH:mm')}</div>
											</div>
										</div>
									);
								})}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ChatPage;
