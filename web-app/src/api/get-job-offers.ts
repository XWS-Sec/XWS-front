export const getRecommendedJobOffersAsync =async () => {
	const url: string = '/api/JobOffer/recommend'
    
	const response =  fetch(url,{
        method: 'GET'
    });

    return response;
}