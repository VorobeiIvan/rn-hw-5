import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { colors } from "../styles/global";
import { RouteProp } from "@react-navigation/native";

const PostsScreen = () => {
  const [userName, setUserName] = useState("User Name");
  const [userEmail, setUserEmail] = useState("email@example.com");
  const [avatar, setAvatar] = useState(
    require("../assets/images/default-avatar.png")
  );
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={avatar} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{userName}</Text>
        <Text style={styles.text}>{userEmail}</Text>
      </View>
    </View>
  );
};

export default PostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: colors.white,
    gap: 8,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 8,
  },
  textContainer: {
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.black_primary,
  },
  text: {
    color: "rgba(33, 33, 33, 0.80)",
    fontSize: 11,
  },
});
