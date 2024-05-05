const deleteFolder = async (folderName) => {

    try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(apiUrl + "/deleteFolder/" + folderName, {
            method: "DELETE",
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error deleting folder:", error);
    }
}

export default deleteFolder;