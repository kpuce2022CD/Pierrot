  import axios from 'axios';

  const baseUrl = 'http://localhost:3001';

  const urls = {
      getMember: `${baseUrl}/auth/getMember`,
      postMenber: `${baseUrl}/auth/postMenber`,
      uploadVideo:`${baseUrl}/video/uploadVideo`,
  }

  export const getMember = async ()=>{
      const result = await axios.get(urls.getMember,{

      });
      return result;
  }

