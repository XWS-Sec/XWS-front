import { format } from 'date-fns';
import React, { useContext, useEffect, useState } from 'react';
import ErrorLabel from '../../components/common/ErrorLabel';
import InputWithLabel from '../../components/common/InputWithLabel';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import AuthContext from '../../context/auth-context';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import { addExperienceAsync, deleteExperienceAsync, getUserInfoAsync, getUserInterestsAsync, getUserSkillsAsync, updateInterestsAsync, updateSkillsAsync } from './profileService';

const ExperienceContainer = () => {
	const { user } = useContext(AuthContext);
	const [newExperienceContainerVisible, setNewExperienceContainerVisible] = useState(false);
	const [userData, setUserData] = useState<any>({});
	const [title, setTitle] = useState<any>('');
	const [description, setDescription] = useState<any>('');
	const [company, setCompany] = useState<any>('');
	const [startDate, setStartDate] = useState<any>('');
	const [endDate, setEndDate] = useState<any>('');
	const [experiences, setExperiences] = useState<any[]>([]);
	const [fetching, setFetching] = useState(false);

	useEffect(() => {
		getUserInfo();
	}, []);

	const getUserInfo = async () => {
		const resp = await getUserInfoAsync();
		if (resp.status === HttpStatusCode.OK) {
			console.log(resp);

			setUserData(resp?.data);
			setExperiences(resp?.data?.experiences ?? []);
		}
	};

	const showNewExperienceModal = () => {
		setNewExperienceContainerVisible(true);
	};

	// [
	// 	{
	// 		startDateTime: '2022-06-10T04:13:26.953Z',
	// 		endDateTime: '2022-06-10T04:13:26.953Z',
	// 		title: 'string',
	// 		organizationName: 'string',
	// 		description: 'string',
	// 	},
	// 	{
	// 		startDateTime: '2022-06-10T04:13:26.953Z',
	// 		endDateTime: '2022-06-10T04:13:26.953Z',
	// 		title: 'HR ',
	// 		organizationName: 'Levi9',
	// 		description: 'Ima pikado',
	// 	},
	// 	{
	// 		startDateTime: '2022-06-10T04:13:26.953Z',
	// 		endDateTime: '2022-06-10T04:13:26.953Z',
	// 		title: 'Developer',
	// 		organizationName: 'VEGA IT',
	// 		description: 'Ima ananas',
	// 	},
	// ];

	const handleTitleChange = (e: any) => {
		setTitle(e.target.value);
	};
	const handleCompanyNameChange = (e: any) => {
		setCompany(e.target.value);
	};
	const handleDescriptionChange = (e: any) => {
		setDescription(e.target.value);
	};
	const startDateHandler = (e: any) => {
		setStartDate(e.target.value);
	};
	const endDateHandler = (e: any) => {
		setEndDate(e.target.value);
	};

	const addNewExperience = async () => {
		setFetching(true);
		const data = {
			startDateTime: startDate,
			endDateTime: endDate,
			title: title,
			organizationName: company,
			description: description,
		};

		const resp = await addExperienceAsync(data);
		if (resp.status === HttpStatusCode.OK) {
			// setExperiences([...experiences, data]);
			getUserInfo();
			setNewExperienceContainerVisible(false);
			setFetching(false);
		}
	};

	const deleteExperience = async (experience: any) => {
		const data = {
			title: experience.title,
			startTime: experience.startDateTime,
		};
		const resp = await deleteExperienceAsync(data);
		if (resp.status == HttpStatusCode.OK) {
			// setExperiences(experiences.filter((e: any) => e.title !== experience.title && e.startDateTime !== experience.startDateTime));
			getUserInfo();
		}
	};

	return (
		<div className='bg-gray-300 min-h-screen pb-16 flex flex-col items-center'>
			<div className='md:w-500px mt-10 bg-white p-10 rounded-md'>
				<p className='text-2xl font-semibold'>Experience:</p>
				<div>
					{experiences.map((experience: any, index: number) => {
						const remove = () => {
							deleteExperience(experience);
						};
						return (
							<div key={index} className='bg-gray-200 my-2 p-3 rounded-md relative'>
								<span className='absolute top-0 right-2 cursor-pointer text-red-500 font-bold' onClick={remove}>
									x
								</span>
								<div>
									<p className='text-xl font-bold text-gray-500'>{experience.title}</p>
									<p className='font-semibold text-gray-400'>{experience.organizationName}</p>
									<p className=' text-gray-400 italic'>{experience.description}</p>
								</div>
								<div className='flex flex-row text-sm text-gray-400 '>
									<span className='mr-2'>{format(new Date(experience.startDateTime), 'dd. MMM yyyy.')}</span> {'  -  '}
									<span className=' ml-2'> {format(new Date(experience.endDateTime), 'dd. MMM yyyy.')}</span>
								</div>
							</div>
						);
					})}
					{experiences.length === 0 && (
						<div>
							<p className='text-gray-500 italic text-center py-10'>You don't have any experience</p>{' '}
						</div>
					)}
				</div>
			</div>
			{newExperienceContainerVisible && (
				<div className='md:w-500px mt-10 bg-white p-10 rounded-md'>
					<div className='flex flex-wrap items-center my-1'>
						<p className='my-1 w-44 whitespace-nowrap'>Title</p>
						<input className='input flex-grow md:w-60 md:text-lg' type='text' onChange={handleTitleChange} />
					</div>
					<div className='flex flex-wrap items-center my-1'>
						<p className='my-1 w-44 whitespace-nowrap'>Company</p>
						<input className='input flex-grow md:w-60 md:text-lg' type='text' onChange={handleCompanyNameChange} />
					</div>
					<div className='flex flex-wrap items-center my-1'>
						<p className='my-1 w-44 whitespace-nowrap'>Description</p>
						<input className='input flex-grow md:w-60 md:text-lg' type='text' onChange={handleDescriptionChange} />
					</div>
					<div>
						<div className='flex flex-wrap items-center my-1'>
							<p className='my-1 w-44 whitespace-nowrap'>Start date:</p>
							<input className='input p-1' type='date' onChange={startDateHandler} defaultValue='2021-01-01' />
						</div>
						<div className='flex flex-wrap items-center my-1'>
							<p className='my-1 w-44 whitespace-nowrap'>End date:</p>
							<input className='input p-1' type='date' onChange={endDateHandler} defaultValue='2021-01-05' />
						</div>
					</div>
					{fetching ? (
						<div className='flex justify-center pt-3'>
							<LoadingSpinner />
						</div>
					) : (
						<button className='btnGreenWhite w-full mt-5' onClick={addNewExperience}>
							Add
						</button>
					)}
				</div>
			)}

			{!newExperienceContainerVisible && (
				<button className='btnGreenWhite md:w-500px mt-5' onClick={showNewExperienceModal}>
					Add new experience
				</button>
			)}
		</div>
	);
};

export default ExperienceContainer;
