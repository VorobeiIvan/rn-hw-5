import { FC, useLayoutEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";

import Input from "../components/Input";
import Button from "../components/Button";
import { colors } from "../../styles/global";
import { registerDB } from "../utils/auth";
import { StackParamList } from "../navigation/StackNavigator";
import AddAvatarIcon from "../../icons/AddAvatarIcon";
import RemoveAvatarIcon from "../../icons/RemoveAvatarIcon";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

type HomeScreenProps = NativeStackScreenProps<StackParamList, "Signup">;

const SignupScreen: FC<HomeScreenProps> = ({ navigation, route }) => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isConfirmVisible, setIsConfirmVisible] = useState(true);
  const [selectedInput, setSelelectedInput] = useState<"password" | "confirm">(
    "password"
  );
  const [avatar, setAvatar] = useState(
    require("../../assets/images/default-avatar.png")
  );
  const [isAvatarDefault, setIsAvatarDefault] = useState(true);

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handleLoginChange = (value: string) => setLogin(value);

  const handlePasswordChange = (value: string, isPassword: boolean) => {
    if (isPassword) {
      setPassword(value);
    } else {
      setPasswordConfirm(value);
    }
  };

  const showPassword = (isPassword: "password" | "confirm") => {
    if (isPassword) {
      setIsPasswordVisible((prev) => !prev);
    } else {
      setIsConfirmVisible((prev) => !prev);
    }
  };

  const onSignUp = () => {
    console.log("Sign up!");
    registerDB({ email, password });
  };
  const addAvatar = () => {
    setAvatar(
      isAvatarDefault
        ? require("../assets/images/avatar.jpg")
        : require("../assets/images/default-avatar.png")
    );
    setIsAvatarDefault((prev) => !prev);
  };

  const showButton = (
    <TouchableOpacity onPress={() => showPassword(selectedInput)}>
      <Text style={[styles.baseText, styles.passwordButtonText]}>Показати</Text>
    </TouchableOpacity>
  );

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <>
        <Image
          source={require("../../assets/images/background.png")}
          resizeMode="cover"
          style={styles.image}
        />
        <View style={styles.avatarContainer}>
          <Image source={avatar} resizeMode="contain" style={styles.avatar} />
          <TouchableOpacity onPress={addAvatar}>
            <View style={styles.avatarButtonStyle}>
              {isAvatarDefault ? <AddAvatarIcon /> : <RemoveAvatarIcon />}
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Реєстрація</Text>

        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View style={styles.formContainer}>
            <Text style={styles.title}>Увійти</Text>

            <View style={[styles.innerContainer, styles.inputContainer]}>
              <Input
                value={login}
                autofocus={true}
                placeholder="Логін"
                onTextChange={handleLoginChange}
              />
              <Input
                value={email}
                autofocus={true}
                placeholder="Адреса електронної пошти"
                onTextChange={handleEmailChange}
              />

              <Pressable onPress={() => setSelelectedInput("password")}>
                <Input
                  value={password}
                  placeholder="Пароль"
                  rightButton={showButton}
                  outerStyles={styles.passwordButton}
                  onTextChange={(value) => handlePasswordChange(value, true)}
                  secureTextEntry={isPasswordVisible}
                />
              </Pressable>
            </View>

            <View style={[styles.innerContainer, styles.buttonContainer]}>
              <Button onPress={onSignUp}>
                <Text style={[styles.baseText, styles.loginButtonText]}>
                  Реєстрація
                </Text>
              </Button>

              <View style={styles.signUpContainer}>
                <Text style={[styles.baseText, styles.passwordButtonText]}>
                  Вже є акаунт?
                  <TouchableWithoutFeedback onPress={onSignUp}>
                    <Text style={styles.signUpText}> Увійти</Text>
                  </TouchableWithoutFeedback>
                </Text>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </>
    </TouchableWithoutFeedback>
  );
};

export default SignupScreen;

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
    width: SCREEN_WIDTH,
    height: "70%",
    backgroundColor: colors.white,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  title: {
    fontSize: 30,
    fontWeight: "500",
    lineHeight: 36,
    textAlign: "center",
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
  avatar: {
    backgroundColor: colors.light_gray,
    borderRadius: 16,
    width: 120,
    height: 120,
  },
});
