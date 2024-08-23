//Currying

const createApiUrl = (baseUrl) => (apiKey) => (queryParams) => {
    const query = new URLSearchParams(queryParams).toString();
    return `${baseUrl}?api_key=${apiKey}&${query}`;
};

export default createApiUrl;