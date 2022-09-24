import Feather from '@expo/vector-icons/Ionicons';
import HomeStack from './HomeStack/HomeStack';
import ExploreScreen from './ExploreScreen';
import SafetyScreen from './SafetyScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity } from 'react-native';
import ProfileImage from '../components/ProfileImage';

export default function MainTabsStack() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ navigation, route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          }
          if (route.name === 'Explore') {
            iconName = 'search';
          }
          if (route.name === 'Safety') {
            iconName = 'flag';
          }

          // You can return any component that you like here!
          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerLeft: () => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('Modal User')}
              delayPressIn={0}
              //TODO: fix ~1 sec delay after press (android only?)
            >
              <ProfileImage />
            </TouchableOpacity>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Safety" component={SafetyScreen} />
    </Tab.Navigator>
  );
}
