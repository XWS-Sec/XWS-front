import { useEffect, useState } from 'react';
import ProfileInfo from './ProfileInfo';
import UserIsPrivateSection from './UserIsPrivateSection';
import UserInfoDto from '../../dtos/user-info.dto';
import { useParams } from 'react-router-dom';
import { hardcodedUser } from '../../hardcoded-data/hardcoded-user';
import PostList from '../../components/posts/PostList';
import { hardcodedPosts } from '../../hardcoded-data/hardcoded-posts';
import ProfileTabButton from './ProfileTabButton';
import EditProfileInfo from './EditProfileInfo';
import axios, { AxiosRequestConfig } from 'axios';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import { getUserInfoAsync } from './profileService';
import EditImage from './EditImage';

const EditProfilePage = () => {
	const { username } = useParams();

	const [user, setUser] = useState<any>(null);

	useEffect(() => {
		getUserInfo();
	}, []);

	const getUserInfo = async () => {
		const resp = await getUserInfoAsync();
		if (resp.status == HttpStatusCode.OK) {
			setUser(resp.data);
		}
	};

	return (
		<div className='flex flex-col flex-grow overflow-y-scroll bg-gray-200'>
			<div className='flex flex-col flex-grow bg-gray-200'>
				<div className='flex flex-row self-center'>
					{!!user && <EditProfileInfo user={user} setUser={setUser} />}
					<div className='flex flex-col'>{!!user && <EditImage user={user} />}</div>
				</div>
			</div>
		</div>
	);
};

export default EditProfilePage;
