import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Square, MessageCircle, Compass, User } from 'lucide-react-native';

// Placeholder Screens
import ClosetScreen from '../screens/ClosetScreen';
import StylistScreen from '../screens/StylistScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function MainNavigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: '#000',
                    tabBarInactiveTintColor: '#888',
                    tabBarStyle: { height: 60, paddingBottom: 10 },
                    headerTitleStyle: { fontFamily: 'serif', fontWeight: 'bold' }
                }}
            >
                <Tab.Screen
                    name="Closet"
                    component={ClosetScreen}
                    options={{
                        tabBarIcon: ({ color }) => <Square color={color} size={24} />
                    }}
                />
                <Tab.Screen
                    name="Stylist"
                    component={StylistScreen}
                    options={{
                        tabBarIcon: ({ color }) => <MessageCircle color={color} size={24} />
                    }}
                />
                <Tab.Screen
                    name="Discover"
                    component={DiscoverScreen}
                    options={{
                        tabBarIcon: ({ color }) => <Compass color={color} size={24} />
                    }}
                />
                <Tab.Screen
                    name="Account"
                    component={ProfileScreen}
                    options={{
                        tabBarIcon: ({ color }) => <User color={color} size={24} />
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
