import { getStorage, getDownloadURL, ref } from 'firebase/storage';

const firebaseUtils = {
  async getImgUrl(filePath: string) {
    try {
      const storageRef = ref(getStorage(), filePath);
      const imgUrl = await getDownloadURL(storageRef);
      return imgUrl;
    } catch (error) {
      console.log(error);
    }
  },
};

export default firebaseUtils;
