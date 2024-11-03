import React from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationProp } from "@react-navigation/native";

import { Feather, Ionicons } from "@expo/vector-icons";
import { colors } from "../styles/global"; // Переконайтеся, що ці кольори існують
import PostsScreen from "../screens/PostsScreen";
import CreatePostsScreen from "../screens/CreatePostsScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tabs = createBottomTabNavigator();

const BottomTabNavigator = ({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) => {
  const handleLogOut = () => {
    navigation.navigate("Login");
  };

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName:
            | "grid"
            | "grid-outline"
            | "add-circle"
            | "add-circle-outline"
            | "person"
            | "person-outline";

          // Встановлюємо значення для iconName
          switch (route.name) {
            case "Posts":
              iconName = focused ? "grid" : "grid-outline";
              break;
            case "CreatePosts":
              iconName = focused ? "add-circle" : "add-circle-outline";
              break;
            case "Profile":
              iconName = focused ? "person" : "person-outline";
              break;
            default:
              iconName = "grid-outline"; // Значення за замовчуванням
          }

          const iconColor = focused ? colors.white : colors.black_primary; // Змінюємо колір іконки

          return (
            <View style={styles.iconContainer}>
              <View
                style={[
                  styles.focusedIconContainer,
                  focused && styles.activeIcon,
                ]}
              >
                <Ionicons
                  name={iconName}
                  size={focused ? 32 : 24}
                  color={iconColor}
                />
              </View>
            </View>
          );
        },
        tabBarActiveTintColor: colors.orange,
        tabBarInactiveTintColor: colors.black_primary,
        tabBarLabel: () => null,
        tabBarStyle: styles.tabBarStyle,
      })}
    >
      <Tabs.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          title: "Публікації",
          headerRight: () => (
            <View style={styles.iconContainer}>
              <Feather
                name="log-out"
                size={24}
                color={colors.border_gray}
                onPress={handleLogOut}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{
          title: "Створити публікацію",
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  focusedIconContainer: {
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  activeIcon: {
    backgroundColor: "#FF6C00",
  },
  tabBarStyle: {
    height: 60,
  },
});

export default BottomTabNavigator;
