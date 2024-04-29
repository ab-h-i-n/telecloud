const uploadFile = async (file,foldername,filename,setLoading) => {

    setLoading(true);

    // Check if a file is selected
    if (!file) {
      console.error('You need to specify a file');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('foldername', foldername);
      formData.append('filename', filename);

      const apiUrl = import.meta.env.VITE_API_URL;
  
      const response = await fetch(`${apiUrl}/upload`, {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
      
      alert(data.message);
    } catch (error) {
      console.error('Error uploading file:', error);
    }finally{
      setLoading(false);
    }
  };

  export default uploadFile;