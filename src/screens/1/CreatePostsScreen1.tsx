// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   Alert,
// } from "react-native";
// import { Camera, CameraView } from "expo-camera";
// import * as Location from "expo-location";
// import * as MediaLibrary from "expo-media-library";
// import { Ionicons } from "@expo/vector-icons";
// import { colors } from "../styles/global";

// const CreatePostsScreen = ({ navigation }: { navigation: any }) => {
//   const [hasCameraPermission, setHasCameraPermission] = useState(null);
//   const [hasMediaLibraryPermission, setHasMediaLibraryPermission] =
//     useState(null);
//   const [cameraRef, setCameraRef] = useState(null);
//   const [photoUri, setPhotoUri] = useState(null);
//   const [title, setTitle] = useState("");
//   const [location, setLocation] = useState("");
//   const [coords, setCoords] = useState(null);

//   useEffect(() => {
//     (async () => {
//       const cameraStatus = await Camera.requestCameraPermissionsAsync();
//       setHasCameraPermission(cameraStatus.status === "granted");

//       const mediaLibraryStatus = await MediaLibrary.requestPermissionsAsync();
//       setHasMediaLibraryPermission(mediaLibraryStatus.status === "granted");

//       await getLocation();
//     })();
//   }, []);

//   const takePhoto = async () => {
//     if (cameraRef) {
//       const photo = await cameraRef.takePictureAsync();
//       setPhotoUri(photo.uri);
//       if (hasMediaLibraryPermission) {
//         await MediaLibrary.saveToLibraryAsync(photo.uri);
//       } else {
//         Alert.alert(
//           "Помилка",
//           "Немає дозволу на збереження фото в медіа-бібліотеку."
//         );
//       }
//     }
//   };

//   const getLocation = async () => {
//     let { status } = await Location.requestForegroundPermissionsAsync();
//     if (status !== "granted") {
//       Alert.alert("Помилка", "Доступ до геолокації був відхилений.");
//       return;
//     }
//     let location = await Location.getCurrentPositionAsync({});
//     setCoords({
//       latitude: location.coords.latitude,
//       longitude: location.coords.longitude,
//     });

//     const reverseGeocode = await Location.reverseGeocodeAsync(location.coords);
//     setLocation(reverseGeocode[0]?.name || "");
//   };

//   const publishPost = () => {
//     if (title && photoUri && location) {
//       console.log("Post published:", { title, location, photoUri, coords });
//       navigation.navigate("PostsScreen");
//     } else {
//       Alert.alert("Помилка", "Будь ласка, заповніть всі поля.");
//     }
//   };

//   const isPublishButtonDisabled = !title || !photoUri || !location;

//   if (hasCameraPermission === null) {
//     return <Text>Запит на доступ до камери...</Text>;
//   }
//   if (hasCameraPermission === false) {
//     return <Text>Доступ до камери заборонено.</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.photoContainer}>
//         {photoUri ? (
//           <Image source={{ uri: photoUri }} style={styles.photo} />
//         ) : (
//           <CameraView style={styles.camera} ref={setCameraRef}>
//             <TouchableOpacity style={styles.captureButton} onPress={takePhoto}>
//               <Ionicons name="camera" size={32} color="#fff" />
//             </TouchableOpacity>
//           </CameraView>
//         )}
//       </View>

//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Назва..."
//           value={title}
//           onChangeText={setTitle}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Місцевість (не обов'язково)..."
//           value={location}
//           onChangeText={setLocation}
//         />

//         <TouchableOpacity
//           style={[
//             styles.publishButton,
//             isPublishButtonDisabled && styles.disabledButton,
//           ]}
//           onPress={publishPost}
//           disabled={isPublishButtonDisabled}
//         >
//           <Text style={styles.publishButtonText}>Опублікувати</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#fff",
//   },
//   photoContainer: {
//     alignItems: "center",
//     marginVertical: 20,
//     backgroundColor: "#e0e0e0",
//     borderRadius: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//   },
//   camera: {
//     width: "100%",
//     height: 240,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//   },
//   captureButton: {
//     backgroundColor: colors.light_gray,
//     padding: 10,
//     borderRadius: 100,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   photo: {
//     width: "100%",
//     height: 240,
//     borderRadius: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//   },
//   input: {
//     padding: 16,
//     height: 50,
//     borderBottomWidth: 1,
//     borderBottomColor: colors.border_gray,
//     marginBottom: 16,
//     backgroundColor: "transparent",
//   },
//   publishButton: {
//     backgroundColor: colors.orange,
//     padding: 15,
//     borderRadius: 100,
//     alignItems: "center",
//     marginTop: 44,
//   },
//   disabledButton: {
//     backgroundColor: "gray",
//   },
//   publishButtonText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   inputContainer: {
//     flex: 1,
//   },
// });

// export default CreatePostsScreen;
