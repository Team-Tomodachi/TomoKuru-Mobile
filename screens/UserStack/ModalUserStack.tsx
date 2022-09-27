import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import UserCustomiseScreen from './UserCustomiseScreen';
import UserScreen from './UserScreen';
import useAuthStore from '../../store/auth';
import { Pressable, Text } from 'react-native';
import { Styling } from "../../styles/styling"


const Stack = createNativeStackNavigator();

export default function ModalUser() {
  const { isUserSignedIn } = useAuthStore();

  return (
    <Stack.Navigator>
      {isUserSignedIn ? (
        <>
          <Stack.Screen
            name="Profile"
            component={UserScreen}
            options={({ navigation }) => ({
              headerLeft: () => {
                return (
                  <Pressable
                    onPress={() => navigation.popToTop()}
                    style={Styling.navigationButton}
                  >
                    <Text style={Styling.navigationButtonText}>BACK</Text>
                  </Pressable>
                )
              },
              headerTitleStyle: {
                fontFamily: "OpenSans-ExtraBold",
                fontSize: 20,
              }
            })}
          />
          <Stack.Screen name="Edit Details" component={UserCustomiseScreen} />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Sign in"
            component={SignInScreen}
            options={({ navigation }) => ({
              headerLeft: () => {
                return (
                  <Pressable
                    onPress={() => navigation.popToTop()}
                    style={Styling.navigationButton}
                  >
                    <Text style={Styling.navigationButtonText}>BACK</Text>
                  </Pressable>
                )
              },
              headerTitleStyle: {
                fontFamily: "OpenSans-ExtraBold",
                fontSize: 20,
              }
            })}
          />
          <Stack.Screen
            name="Sign Up"
            component={SignUpScreen}
            options={({ navigation }) => ({
              headerLeft: () => {
                return (
                  <Pressable
                    onPress={() => navigation.popToTop()}
                    style={Styling.navigationButton}
                  >
                    <Text style={Styling.navigationButtonText}>BACK</Text>
                  </Pressable>
                )
              },
              headerTitleStyle: {
                fontFamily: "OpenSans-ExtraBold",
                fontSize: 20,
              }
            })}
          />
        </>
      )}
    </Stack.Navigator>
  );
}


