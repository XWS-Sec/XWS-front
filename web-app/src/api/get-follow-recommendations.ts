export const getFollowRecommendations =async () => {
    const url: string = '/api/Follow/recommend'
    
	const response =  fetch(url,{
        method: 'GET'
    });

    return response;
}