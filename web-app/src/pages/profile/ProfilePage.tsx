import { useEffect, useState } from 'react';
import ProfileInfo from './ProfileInfo';
import UserIsPrivateSection from './UserIsPrivateSection';
import UserInfoDto from '../../dtos/user-info.dto';
import { useParams } from 'react-router-dom';
import { hardcodedUser } from '../../hardcoded-data/hardcoded-user';
import PostList from '../../components/posts/PostList';
import { hardcodedPosts } from '../../hardcoded-data/hardcoded-posts';
import ProfileTabButton from './ProfileTabButton';
import SkillsContainer from './SkillsCointainer';

enum ProfileTab {
	POSTS,
	EXPERIENCE,
	SKILLS,
}

const ProfilePage = () => {
	const { username } = useParams();

	const [user, setUser] = useState<UserInfoDto>();
	const [userPrivateSectionVisible, setUserPrivateSectionVisible] = useState(false);
	const [selectedTab, setSelectedTab] = useState(ProfileTab.POSTS);

	useEffect(() => {
		setUser(hardcodedUser);
	}, [username]);

	return (
		<div className='flex flex-col flex-grow overflow-y-scroll '>
			<div className='flex flex-col flex-grow bg-gray-100'>
				<ProfileInfo user={user} setUser={setUser} />
				{userPrivateSectionVisible ? (
					<UserIsPrivateSection username={user?.username || ''} />
				) : (
					<div className='flex flex-col'>
						<div className='flex self-center justify-around w-full md:w-614px py-3'>
							<ProfileTabButton tabName='Posts' onClick={() => setSelectedTab(ProfileTab.POSTS)} />
							<ProfileTabButton tabName='Experience' onClick={() => setSelectedTab(ProfileTab.EXPERIENCE)} />
							<ProfileTabButton tabName='Skills' onClick={() => setSelectedTab(ProfileTab.SKILLS)} />
						</div>
						{selectedTab === ProfileTab.POSTS && <PostList posts={hardcodedPosts} fetching={false} removePostItem={() => {}} postsCount={hardcodedPosts.length} />}
						{selectedTab === ProfileTab.EXPERIENCE && <div>Experience</div>}
						{selectedTab === ProfileTab.SKILLS && <SkillsContainer />}
					</div>
				)}
			</div>
		</div>
	);
};

export default ProfilePage;
