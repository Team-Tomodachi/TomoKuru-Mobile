import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native';
import CreateGroupScreen from './CreateGroupScreen';
import TagSelect from '../../../components/TagSelect';

const Stack = createNativeStackNavigator();

export default function CreateGroupStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Create Group"
        component={CreateGroupScreen}
        options={({ navigation }) => ({
          headerLeft: () => <Button color={'#FCB90F'} title="Close" onPress={() => navigation.popToTop()} />,
        })}
      />
      <Stack.Screen name="Tags" component={TagSelect} />
    </Stack.Navigator>
  );
}
