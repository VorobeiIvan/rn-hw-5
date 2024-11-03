import { useState } from "react";
import {
  Dimensions,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { colors } from "../styles/global";
import PostsScreen from "./PostsScreen";
import RemoveAvatarIcon from "../icons/RemoveAvatarIcon";
import AddAvatarIcon from "../icons/AddAvatarIcon";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const ProfileScreen = ({ navigation }: { navigation: any }) => {
  const [avatar, setAvatar] = useState(
    require("../assets/images/default-avatar.png")
  );
  const [isAvatarDefault, setIsAvatarDefault] = useState(true);
  const [userName, setUserName] = useState("User Name");

  const addAvatar = () => {
    setAvatar(
      isAvatarDefault
        ? require("../assets/images/avatar.jpg")
        : require("../assets/images/default-avatar.png")
    );
    setIsAvatarDefault((prev) => !prev);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Image
          source={require("../assets/images/background.png")}
          resizeMode="cover"
          style={styles.image}
        />
        <View style={styles.formContainer}>
          <View style={styles.avatarContainer}>
            <Image source={avatar} resizeMode="contain" style={styles.avatar} />
            <TouchableOpacity onPress={addAvatar}>
              <View style={styles.avatarButtonStyle}>
                {isAvatarDefault ? <AddAvatarIcon /> : <RemoveAvatarIcon />}
              </View>
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>{userName}</Text>
          <PostsScreen />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  innerContainer: {
    gap: 16,
  },
  inputContainer: {
    marginTop: 32,
  },
  buttonContainer: {
    marginTop: 42,
  },
  image: {
    position: "absolute",
    top: 0,
    bottom: 0,
    height: "100%",
    width: "100%",
  },
  formContainer: {
    height: "85%",
    width: SCREEN_WIDTH,
    backgroundColor: colors.white,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  title: {
    color: "#212121",
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 30,
    fontStyle: "normal",
    fontWeight: "bold",
    lineHeight: 36,
    letterSpacing: 0.3,
  },
  baseText: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 18,
  },
  loginButtonText: {
    color: colors.white,
    textAlign: "center",
  },
  passwordButtonText: {
    color: colors.blue,
  },
  passwordButton: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  signUpContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  signUpText: {
    textDecorationLine: "underline",
    marginBottom: 46,
  },
  avatar: {
    backgroundColor: colors.light_gray,
    borderRadius: 16,
    width: 120,
    height: 120,
  },
  avatarContainer: {
    position: "relative",
    alignSelf: "center",
    marginTop: -92,
    marginBottom: 32,
  },
  avatarButtonStyle: {
    width: 24,
    height: 24,
    position: "absolute",
    bottom: 12,
    right: -12,
  },
  addAvatarButtonText: {
    fontSize: 18,
    fontWeight: "500",
  },
});
