import { format } from 'date-fns';
import React, { useContext, useEffect, useState } from 'react';
import ErrorLabel from '../../components/common/ErrorLabel';
import InputWithLabel from '../../components/common/InputWithLabel';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import AuthContext from '../../context/auth-context';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import { addExperienceAsync, deleteExperienceAsync, getJobOffersAsync, getUserInfoAsync, getUserInterestsAsync, getUserSkillsAsync, updateInterestsAsync, updateSkillsAsync } from './profileService';

const JobOffersContainer = () => {
	const { user } = useContext(AuthContext);
	const [jobOffers, setJobOffers] = useState<any[]>([]);
	const [searchText, setSearchText] = useState('');

	useEffect(() => {
		getUserInfo();
	}, []);

	const getUserInfo = async () => {
		const resp = await getJobOffersAsync();

		if (resp.status === HttpStatusCode.OK) {
			setJobOffers(resp?.data?.response ?? []);
		}
	};

	const changeSearchText = (e: any) => {
		setSearchText(e.target.value.toLowerCase());
	};
	console.log(jobOffers);

	return (
		<div className='bg-gray-300 min-h-screen pb-16 flex flex-col items-center'>
			<div className='md:w-500px mt-10 bg-white p-10 rounded-md'>
				<p className='text-2xl font-semibold'>Job offers:</p>
				<input type='text' onChange={changeSearchText} placeholder='Search jobs' className='input w-full' />
				<div>
					{jobOffers
						// ?.filter((e: any) => e?.jobTitle?.toLowerCase()?.includes(searchText))
						?.map((offer: any, index: number) => {
							return (
								<div key={index} className='bg-gray-200 my-2 p-3 rounded-md relative'>
									<div>
										<p className='text-xl font-bold text-gray-500'>{offer.jobTitle}</p>
										<p className=' text-gray-400'>{offer.description}</p>
										<p className=' text-gray-400 italic'>Prerequisites: {offer.prerequisites}</p>
									</div>
									<a href={offer.linkToJobOffer} target='_blank' rel='noreferrer' className='bg-gray-500 p-2 rounded-md text-center block mt-2 text-white hover:bg-green-500 transition-colors duration-400'>
										Link
									</a>
								</div>
							);
						})}
					{jobOffers?.length === 0 && (
						<div>
							<p className='text-gray-500 italic text-center py-10'>You don't have any job offer</p>{' '}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default JobOffersContainer;
