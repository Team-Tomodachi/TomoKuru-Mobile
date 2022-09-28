import { Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ref, getDownloadURL, getStorage } from 'firebase/storage';
import useUser from '../hooks/useUser';
import { styles } from '../styles/styles';
import useAuthStore from '../store/auth';

export default function ProfileImage() {
  const { isUserSignedIn } = useAuthStore();
  const { data } = useUser();
  const [profileImage, setProfileImage] = useState<string>('');

  if (data.photo_url && isUserSignedIn) {
    const fileRef = ref(getStorage(), data.photo_url);
    getDownloadURL(fileRef)
      .then((res) => setProfileImage(res))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    setProfileImage('');
  }, [isUserSignedIn]);

  return (
    <>
      {isUserSignedIn && profileImage.length !== 0 ? (
        <Image
          style={styles('rounded:full', 'w:10', 'h:10', 'ml:2')}
          source={{
            uri: profileImage,
          }}
        />
      ) : (
        <Image
          style={styles('rounded:full', 'w:10', 'h:10', 'ml:2')}
          source={require('../assets/new-user.png')}
        />
      )}
    </>
  );
}
