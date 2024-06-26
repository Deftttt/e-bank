export const authHeader = () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        return { Authorization: `Bearer ${token}` };
    } else {
        return {};
    }
};