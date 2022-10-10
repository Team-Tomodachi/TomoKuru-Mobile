import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import UserCustomiseScreen from './UserCustomiseScreen';
import UserScreen from './UserScreen';
import useAuthStore from '../../store/auth';
import { Pressable, Text } from 'react-native';
import { Styling } from '../../styles/styling';

const Stack = createNativeStackNavigator();

export default function ModalUser() {
  const { isUserSignedIn } = useAuthStore();

  return (
    <Stack.Navigator screenOptions={({ navigation }) => ({
      headerLeft: () => {
        return (
          <Pressable onPress={() => navigation.popToTop()}>
            <Text style={{ color: '#FCB90F' }}>Close</Text>
          </Pressable>
        );
      },
      headerTitleStyle: {
        fontFamily: 'OpenSans-ExtraBold',
        fontSize: 20,
      },
    })}>
      {isUserSignedIn ? (
        <>
          <Stack.Screen
            name="Profile"
            component={UserScreen}
          />
          <Stack.Screen
            name="Edit Details"
            component={UserCustomiseScreen}
            options={({ navigation }) => ({
              headerTitleStyle: {
                fontFamily: 'OpenSans-ExtraBold',
                fontSize: 20,
              },
            })}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Sign in"
            component={SignInScreen}
          />
          <Stack.Screen
            name="Sign up"
            component={SignUpScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
