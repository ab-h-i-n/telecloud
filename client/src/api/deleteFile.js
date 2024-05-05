const deleteAFile = async (fileId) => {
    try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(apiUrl + "/deleteFile/" + fileId, {
            method: "DELETE",
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error deleting file:", error);
    }
};

export default deleteAFile;