const getAllUsers = async () => {
    try {
        const apiUrl = import.meta.env.VITE_API_URL;

        const response = await fetch(`${apiUrl}/allusers`);
        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error downloading media:', error);
    }
}

export default getAllUsers;