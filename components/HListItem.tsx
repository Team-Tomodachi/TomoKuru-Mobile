import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { styles } from '../styles/styles';
import firebaseUtils from '../utils/firebaseUtils';

const { getImgUrl } = firebaseUtils;

export default function HListItem({ imgUrl, name }) {
  const [image, setImage] = useState<string | undefined>();
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      if (imgUrl) {
        const img = await getImgUrl(imgUrl);
        if (img) setImage(img);
      }
    })();
  }, []);

  return (
    <Pressable style={{ margin: 10 }} onPress={() => navigation.navigate('Group Details')}>
      <Image
        source={{
          uri: image,
        }}
        style={{ width: 150, height: 150, backgroundColor: 'gray' }}
        resizeMode="cover"
      />
      <View style={styles('absolute', 'bg-opacity:0', 'bottom:10', 'left:1')}>
        <Text style={styles('color:white', 'text:2xl')}>{name}</Text>
      </View>
    </Pressable>
  );
}
