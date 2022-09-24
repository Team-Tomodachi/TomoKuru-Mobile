import { Image, Text, View } from 'react-native';
import { styles } from '../styles/styles';

export default function HListItem({ imageUrl, name }) {
  return (
    <View style={{ margin: 10 }}>
      {/* {imageUrl ? ( */}
      <View style={{ width: 150, height: 150, backgroundColor: 'gray' }}></View>
      {/* ) : (
        <Image
          source={{
            uri: imageUrl,
          }}
          style={{ width: 150, height: 150, backgroundColor: "gray" }}
          resizeMode="cover"
        />
      )} */}
      <View style={styles('absolute', 'bg-opacity:0', 'bottom:10', 'left:1')}>
        <Text style={styles('color:white', 'text:2xl')}>{name}</Text>
      </View>
    </View>
  );
}
