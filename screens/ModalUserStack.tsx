import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import UserCustomiseScreen from './UserCustomiseScreen';
import UserScreen from './UserScreen';
import useAuthStore from '../store/auth';
import { Button } from 'react-native';

const Stack = createNativeStackNavigator();

export default function ModalUser() {
  const { isUserSignedIn } = useAuthStore();

  return (
    <Stack.Navigator>
      {isUserSignedIn ? (
        <>
          <Stack.Screen
            name="User"
            component={UserScreen}
            options={({ navigation }) => ({
              headerLeft: () => <Button title="Close" onPress={() => navigation.popToTop()} />,
            })}
          />
          <Stack.Screen name="Edit Details" component={UserCustomiseScreen} />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Sign In"
            component={SignInScreen}
            options={({ navigation }) => ({
              headerLeft: () => <Button title="Close" onPress={() => navigation.popToTop()} />,
            })}
          />
          <Stack.Screen name="Sign Up" component={SignUpScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
