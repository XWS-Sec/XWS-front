import axios from 'axios';
import { Dispatch, SetStateAction, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupRequest } from '../../api/signup';
import ErrorLabel from '../../components/common/ErrorLabel';
import InputWithLabel from '../../components/common/InputWithLabel';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import SuccessLabel from '../../components/common/SuccessLabel';
import UserImage from '../../components/common/UserImage';
import FriendshipButtonsSection from '../../components/friendship-buttons/FriendshipButtonsSection';
import { UserListPopupType } from '../../components/user-list/user-list-popup-type.enum';
import UserListPopup from '../../components/user-list/UserListPopup';
import AuthContext, { unsignedUser } from '../../context/auth-context';
import CreateUserDto from '../../dtos/create-user.dto';
import UserInfoDto from '../../dtos/user-info.dto';
import { Gender } from '../../model/enums/gender.enum';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import SignupValidation from '../../utils/signup-validation';
import CountInfoSection from './CountInfoSection';
import { ProfilePicture } from './profile-picture/ProfilePicture';
import ProfileDescription from './ProfileDescription';
import { getUserPictureAsync, removeImageAsync, updateUserInfoAsync, uploadImageAsync } from './profileService';

const defaultImageUrl = 'https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png';

const EditImage = (props: { user: any }) => {
	const navigate = useNavigate();
	const [image, setImage] = useState<string>('');
	const [selectedFile, setSelectedFile] = useState<any>(undefined);
	const [imageRemoved, setImageRemoved] = useState(false);
	const [defaultImage, setDefaultImage] = useState(true);
	const [processing, setProcessing] = useState(false);

	useEffect(() => {
		getUserInfo(props?.user?.id);
	}, [props.user]);

	const getUserInfo = async (id: string) => {
		const resp = await getUserPictureAsync(id);
		if (resp.status == HttpStatusCode.OK) {
			setImage(`/api/userPicture/${id}`);
			setDefaultImage(false);
			setImageRemoved(true);
		} else {
			setImage(defaultImageUrl);
			setDefaultImage(true);
			setImageRemoved(false);
		}
	};

	const onImageChange = (e: any) => {
		if (!e.target.files || e.target.files.length === 0) {
			setSelectedFile(undefined);
			return;
		}
		setDefaultImage(false);
		let file = e.target.files[0];

		const objectUrl = URL.createObjectURL(file);

		setImage(objectUrl);
		setSelectedFile(file);
	};

	const removeImage = async () => {
		setImage(defaultImageUrl);
		const resp = await removeImageAsync();
		if (resp.status === HttpStatusCode.OK) {
			setDefaultImage(true);
			setImageRemoved(false);
		}
	};

	const resetInputValue = (e: any) => {
		e.target.value = null;
	};
	const pressUpload = () => {
		document.getElementById('photo_upload')?.click();
	};

	const uploadFile = async () => {
		setProcessing(true);
		const resp = await uploadImageAsync(selectedFile);
		if (resp.status == HttpStatusCode.OK) {
			setDefaultImage(false);
			setImageRemoved(true);
		}
		setProcessing(false);
	};

	const cancelImage = () => {
		setImage(defaultImageUrl);
		setDefaultImage(true);
		setImageRemoved(false);
	};

	const goToChangePassword = () => {
		navigate('/changePassword');
	};

	return (
		<div className='flex flex-col items-center md:h-screen bg-gray-200 overflow-y-auto'>
			<div className='flex flex-col text-lg bg-white rounded my-3 lg:my-8 mx-3 p-8 shadow-lg md:w-500px'>
				{image && (
					<>
						{' '}
						<div
							style={{
								padding: 10,
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'center',
								alignItems: 'center',
								minHeight: 320,
							}}
						>
							<img style={{ objectFit: 'contain', width: '100%', maxHeight: 320 }} src={image} />
						</div>
					</>
				)}

				{!defaultImage && (
					<div>
						{processing ? (
							<div className='flex justify-center pt-3'>
								<LoadingSpinner />
							</div>
						) : imageRemoved ? (
							<button
								onClick={() => {
									removeImage();
								}}
								className='btnWhiteGreen w-full'
							>
								Remove image
							</button>
						) : (
							<div>
								<button
									onClick={() => {
										cancelImage();
									}}
									className='btnWhiteGreen w-1/2'
								>
									Cancel
								</button>
								<button
									onClick={() => {
										uploadFile();
									}}
									className='btnGreenWhite w-1/2'
								>
									Upload image
								</button>
							</div>
						)}
					</div>
				)}
				{defaultImage && (
					<div style={{ display: 'flex', flexDirection: 'column' }}>
						<button
							className='btnWhiteGreen'
							onClick={(e) => {
								e.preventDefault();
								pressUpload();
							}}
						>
							Add photo
						</button>
					</div>
				)}
				<input title='Add Video / Photo' style={{ display: 'none' }} accept='video/*, image/*' type='file' id='photo_upload' onChange={onImageChange} onClick={resetInputValue} />
			</div>
			<div className='flex flex-col text-lg bg-white rounded  mx-3 p-8 shadow-lg md:w-500px'>
				<button
					className='btnGreenWhite'
					onClick={(e) => {
						e.preventDefault();
						goToChangePassword();
					}}
				>
					Change password
				</button>
			</div>
		</div>
	);
};

export default EditImage;
