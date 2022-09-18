import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "./SignInScreen";
import SignUpScreen from "./SignUpScreen";
import UserCustomiseScreen from "./UserCustomiseScreen";
import useAuthStore from "../store/auth";

const Stack = createNativeStackNavigator();

export default function ModalUser() {
  const { isUserSignedIn } = useAuthStore();

  return (
    <Stack.Navigator>
      {isUserSignedIn ? (
        <>
          <Stack.Screen name="Edit Details" component={UserCustomiseScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Sign In" component={SignInScreen} />
          <Stack.Screen name="Sign Up" component={SignUpScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
