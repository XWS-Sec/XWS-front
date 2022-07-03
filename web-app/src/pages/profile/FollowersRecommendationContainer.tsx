import { type } from 'os';
import React, { useEffect, useState } from 'react'
import { getFollowRecommendations } from '../../api/get-follow-recommendations';
import UserListItem from '../../components/user-list/UserListItem';
import { HttpStatusCode } from '../../utils/http-status-code.enum';


const FollowersRecommendationContainer = () => {
    

    const [users, setUsers] = useState<any[]>([]);

    useEffect(()=>{
        fetchUsers();
    },[]);

    const fetchUsers =async () => {
        const response = await getFollowRecommendations();
        if(response.status != HttpStatusCode.OK)
			return;
        
        const recommendedUsers = await response.json();
        const userGuids = JSON.parse(recommendedUsers.Message);
        setUsers(userGuids);
    }
    return (
        <div className='bg-gray-300 min-h-screen pb-16 flex flex-col items-center'>
                <div className="bg-gray-300 min-h-creen pb-16 flex flex-col items-center">
                    <div className="md:w-500px mt-10 bg-white p-10 rounded-md">
                        <p className="text-2xl font-semibold">People you may know</p>
                        {users &&
                            users.map((user) => <UserListItem key={user} userId={user} />)}
                            {!users?.length && (
                    <div className='w-full text-center pt-3'>No results found</div>
                    )}
                </div>
            </div>
        </div>
        
    )
}

export default FollowersRecommendationContainer