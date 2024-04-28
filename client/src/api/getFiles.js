const getFiles = async (foldername) => {
    try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch( apiUrl + "/files/" + foldername);
        const files = await response.json();
        return files;
    } catch (error) {
        console.error("Error getting user files:", error);
    }
}


export default getFiles;