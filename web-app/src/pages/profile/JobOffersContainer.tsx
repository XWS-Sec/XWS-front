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
	const [newExperienceContainerVisible, setNewExperienceContainerVisible] = useState(false);
	const [jobOffers, setJobOffers] = useState<any[]>([]);
	const [searchText, setSearchText] = useState('');

	useEffect(() => {
		getUserInfo();
	}, []);

	const getUserInfo = async () => {
		const resp = await getJobOffersAsync();
		if (resp.status === HttpStatusCode.OK) {
			console.log(resp);

			setJobOffers(resp?.data ?? []);
		}
	};

	const changeSearchText = (e: any) => {
		setSearchText(e.target.value.toLowerCase());
	};

	const jobOffers_ = [
		{
			linkToJobOffer:
				'https://www.booking.com/hotel/rs/garden-apartment-1-5-km-from-exit.sr.html?aid=318615&label=English_Serbia_EN_RS_29562108385-KXaQm1SzQEACPphD1vlrGAS217243667187%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi159058036972%3Atiaud-297601666555%3Adsa-322372658338%3Alp21213%3Ali%3Adec%3Adm&sid=774bcf6c042d228108d223dbbaffae75&dest_id=-90313;dest_type=city;dist=0;group_adults=2;group_children=0;hapos=1;hpos=1;no_rooms=1;req_adults=2;req_children=0;room1=A%2CA;sb_price_type=total;sr_order=popularity;srepoch=1654837580;srpvid=fb8923e5165001b3;type=total;ucfs=1&#hotelTmpl',
			description: 'Svasta ima da se radi',
			jobTitle: 'LEVI9',
			prerequisites: 'Moras znati sve da raids',
		},
		{
			linkToJobOffer:
				'https://www.booking.com/hotel/rs/garden-apartment-1-5-km-from-exit.sr.html?aid=318615&label=English_Serbia_EN_RS_29562108385-KXaQm1SzQEACPphD1vlrGAS217243667187%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi159058036972%3Atiaud-297601666555%3Adsa-322372658338%3Alp21213%3Ali%3Adec%3Adm&sid=774bcf6c042d228108d223dbbaffae75&dest_id=-90313;dest_type=city;dist=0;group_adults=2;group_children=0;hapos=1;hpos=1;no_rooms=1;req_adults=2;req_children=0;room1=A%2CA;sb_price_type=total;sr_order=popularity;srepoch=1654837580;srpvid=fb8923e5165001b3;type=total;ucfs=1&#hotelTmpl',
			description: 'Svasta ima da se radi',
			jobTitle: 'VEGA IT',
			prerequisites: 'Moras znati sve da raids',
		},
		{
			linkToJobOffer:
				'https://www.booking.com/hotel/rs/garden-apartment-1-5-km-from-exit.sr.html?aid=318615&label=English_Serbia_EN_RS_29562108385-KXaQm1SzQEACPphD1vlrGAS217243667187%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi159058036972%3Atiaud-297601666555%3Adsa-322372658338%3Alp21213%3Ali%3Adec%3Adm&sid=774bcf6c042d228108d223dbbaffae75&dest_id=-90313;dest_type=city;dist=0;group_adults=2;group_children=0;hapos=1;hpos=1;no_rooms=1;req_adults=2;req_children=0;room1=A%2CA;sb_price_type=total;sr_order=popularity;srepoch=1654837580;srpvid=fb8923e5165001b3;type=total;ucfs=1&#hotelTmpl',
			description: 'Svasta ima da se radi',
			jobTitle: 'UPSTRIVE',
			prerequisites: 'Moras znati sve da raids',
		},
		{
			linkToJobOffer:
				'https://www.booking.com/hotel/rs/garden-apartment-1-5-km-from-exit.sr.html?aid=318615&label=English_Serbia_EN_RS_29562108385-KXaQm1SzQEACPphD1vlrGAS217243667187%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi159058036972%3Atiaud-297601666555%3Adsa-322372658338%3Alp21213%3Ali%3Adec%3Adm&sid=774bcf6c042d228108d223dbbaffae75&dest_id=-90313;dest_type=city;dist=0;group_adults=2;group_children=0;hapos=1;hpos=1;no_rooms=1;req_adults=2;req_children=0;room1=A%2CA;sb_price_type=total;sr_order=popularity;srepoch=1654837580;srpvid=fb8923e5165001b3;type=total;ucfs=1&#hotelTmpl',
			description: 'Svasta ima da se radi',
			jobTitle: 'FTN',
			prerequisites: 'Moras znati sve da raids',
		},
	];

	return (
		<div className='bg-gray-300 min-h-screen pb-16 flex flex-col items-center'>
			<div className='md:w-500px mt-10 bg-white p-10 rounded-md'>
				<p className='text-2xl font-semibold'>Job offers:</p>
				<input type='text' onChange={changeSearchText} placeholder='Search jobs' className='input w-full' />
				<div>
					{jobOffers
						.filter((e: any) => e.jobTitle.toLowerCase().includes(searchText))
						.map((offer: any, index: number) => {
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
					{jobOffers.length === 0 && (
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
