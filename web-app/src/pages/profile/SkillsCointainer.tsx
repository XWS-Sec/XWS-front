import React, { useEffect, useState } from 'react';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import { getUserSkillsAsync, updateSkillsAsync } from './profileService';

const SkillsContainer = () => {
	const [skills, setSkills] = useState<any[]>([]);
	const [newSkill, setNewSkill] = useState('');

	useEffect(() => {
		getUserSkills();
	}, []);

	const getUserSkills = async () => {
		const resp = await getUserSkillsAsync();
		if (resp.status == HttpStatusCode.OK) {
			setSkills(resp?.data?.skills ?? []);
		}
	};

	const addSkill = async () => {
		const data = {
			newSkills: [newSkill],
		};
		const resp = await updateSkillsAsync(data);
		if (resp.status === HttpStatusCode.OK) {
			setSkills([...skills, newSkill]);
			setNewSkill('');
		}
	};

	const removeUserSkill = async (skill: string) => {
		const data = {
			skillsToRemove: [skill],
		};
		const resp = await updateSkillsAsync(data);
		if (resp.status === HttpStatusCode.OK) {
			setSkills(skills.filter((e: string) => e !== skill));
			setNewSkill('');
		}
	};

	return (
		<div className='bg-gray-300 min-h-screen pb-16 flex flex-col items-center'>
			<div className='md:w-500px mt-10 bg-white p-10 rounded-md'>
				<p className='text-2xl font-semibold'>Your skills:</p>
				<div className='' style={{ minHeight: 110 }}>
					{skills.map((skill: any, index: number) => {
						const removeSkill = () => {
							removeUserSkill(skill);
						};
						return (
							<div key={index} className='pl-4 text-gray-500 flex flex-row justify-between'>
								<span>{skill}</span>
								<span className='cursor-pointer text-red-600' onClick={removeSkill}>
									x
								</span>
							</div>
						);
					})}
					{skills.length == 0 && (
						<div>
							<p className='text-gray-500 italic text-center py-10'>Currently, you don't have any skill yet</p>{' '}
						</div>
					)}
				</div>
				<p className='text-2xl font-semibold mt-2'>New skill:</p>
				<div className='flex flex-row'>
					<input
						type='text'
						onChange={(e: any) => {
							setNewSkill(e.target.value);
						}}
						value={newSkill}
						className='flex-1 input flex-grow mr-2'
					/>
					<button className='btnGreenWhite  p-0 px-2' onClick={addSkill}>
						Add
					</button>
				</div>
			</div>
		</div>
	);
};

export default SkillsContainer;
