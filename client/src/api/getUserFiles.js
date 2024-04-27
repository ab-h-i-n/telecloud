const getUserFiles = async (username) => {
    try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch( apiUrl + "/userfiles/" + username);
        const userFiles = await response.json();
        return userFiles;
    } catch (error) {
        console.error("Error getting user files:", error);
    }
}


export default getUserFiles;