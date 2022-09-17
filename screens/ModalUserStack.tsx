import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import useAuthStore from "../store/auth";

const Stack = createNativeStackNavigator();

export default function ModalUser() {
  const { isUserSignedIn } = useAuthStore();

  return (
    <Stack.Navigator>
      {isUserSignedIn ? (
        <></>
      ) : (
        <>
          <Stack.Screen name="Sign In" component={SignIn} />
          <Stack.Screen name="Sign Up" component={SignUp} />
        </>
      )}
    </Stack.Navigator>
  );
}
