const uploadFile = async (file,foldername,filename,setLoading) => {

    setLoading(true);

    // Check if a file is selected
    if (!file) {
      console.error('You need to specify a file');
      return;
    }

    try {
      const modifiedFile = new File([file], `${filename}.jpg`);
      const formData = new FormData();
      formData.append('file', modifiedFile);
      formData.append('foldername', foldername);

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