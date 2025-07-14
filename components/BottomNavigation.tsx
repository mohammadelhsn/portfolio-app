import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, TouchableRipple, useTheme } from 'react-native-paper';
import { CommonActions } from '@react-navigation/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import HomeRoute from '../routes/HomeRoute';
import ProjectsStack from './ProjectsStack';
import SettingsRoute from '../routes/Settings';
import { Platform, Pressable } from 'react-native';
import { type StyleProp, type ViewStyle } from 'react-native';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
    const { colors } = useTheme();
    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false }}
            tabBar={({ navigation, state, descriptors, insets }) => (
                <BottomNavigation.Bar
                    navigationState={state}
                    safeAreaInsets={insets}
                    activeColor={colors.primary}
                    activeIndicatorStyle={{
                        backgroundColor: colors.surfaceVariant,
                    }}
                    onTabPress={({ route, preventDefault }) => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!event.defaultPrevented) {
                            navigation.dispatch({
                                ...CommonActions.navigate(route.name),
                                target: state.key,
                            });
                        }
                    }}
                    renderIcon={({ route, focused, color }) => {
                        const { options } = descriptors[route.key];
                        return options.tabBarIcon?.({ focused, color, size: 24 }) || null;
                    }}
                    getLabelText={({ route }) => {
                        const { options } = descriptors[route.key];

                        if (typeof options.tabBarLabel === 'string') {
                            return options.tabBarLabel;
                        }

                        if (typeof options.title === 'string') {
                            return options.title;
                        }

                        return route.name;
                    }}
                    renderTouchable={({ key, ...props }) =>
                        Platform.select({
                            android: (
                                <TouchableRipple
                                    key={key}
                                    {...props}
                                    rippleColor="rgba(255,255,255,0.2)"
                                    onPress={(event) => (props.onPress?.(event))}
                                    style={[props.style, { borderRadius: 10 }]}
                                />
                            ),
                            ios: (
                                <Pressable
                                    key={key}
                                    {...props}
                                    onPress={(event) => (props.onPress?.(event))}
                                    style={({ pressed }) =>
                                        [
                                            props.style as StyleProp<ViewStyle>,
                                            { opacity: pressed ? 0.6 : 1 }
                                        ] as StyleProp<ViewStyle>
                                    }
                                />
                            )
                        })
                    }

                />
            )}
        >
            <Tab.Screen
                name="Home"
                options={{
                    tabBarIcon: ({ color, focused, size }) => {
                        if (focused) return <MaterialCommunityIcons name="home" color={color} size={size} />;
                        else return <MaterialCommunityIcons name="home-outline" color={color} size={size} />;
                    },
                    headerShown: false
                }}
            >
                {props => <HomeRoute {...props} goToProjects={() => props.navigation.navigate('Projects')} />}
            </Tab.Screen>
            <Tab.Screen
                name="Projects"
                component={ProjectsStack} // Stack that includes ProjectsRoute and ProjectDetail
                options={{
                    tabBarIcon: ({ color, focused, size }) => {
                        if (focused) return <MaterialCommunityIcons name="folder-multiple" color={color} size={size} />;
                        else return <MaterialCommunityIcons name="folder-multiple-outline" color={color} size={size} />;
                    },
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsRoute}
                options={{
                    tabBarIcon: ({ color, focused, size }) => {
                        if (focused) return <MaterialCommunityIcons name="cog" color={color} size={size} />;
                        else return <MaterialCommunityIcons name="cog-outline" color={color} size={size} />;
                    },
                    headerShown: false
                }}
            />
        </Tab.Navigator>
    );
}
