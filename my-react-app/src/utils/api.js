export const fetchConfig = async () => {
    const response = await fetch('/config');
    const config = await response.json();
    return config.apiBaseUrl;
};

export const getApiBaseUrl = async () => {
    const apiBaseUrl = await fetchConfig();
    return apiBaseUrl;
};