const API_URL = 'https://right-game.onrender.com/api';

export const fetchDailyCount = async () => {
    const response = await fetch(`${API_URL}/daily-count`);
    return response.json();
};
export const updateCount = async (category, change) => {
    const response = await fetch(`${API_URL}/update-count`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category, change }),
    });
    return response.json();
};


export const fetchAllCounts = async () => {
    const response = await fetch(`${API_URL}/all-counts`);
    return response.json();
};