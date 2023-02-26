import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

import { styles } from './CreatePostsScreen.styled';

export const CreatePostsScreen = ({ navigation }) => {
  // const [permission, requestPermission] = Camera.useCameraPermissions();
  const [type, setType] = useState(CameraType.back);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState('');
  const [title, setTitle] = useState('');
  const [locationTitle, setLocationTitle] = useState('');
  const [location, setLocation] = useState('');
  const [isFocus, setIsFocus] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
    })();
  }, []);

  const handleTitle = text => setTitle(text);
  const handleLocationTitle = text => setLocationTitle(text);
  const handleFocus = () => setIsFocus(false);

  const makePhoto = async () => {
    const { uri } = await cameraRef.takePictureAsync();
    setPhoto(uri);
  };

  const isPostReady = () => {
    if (!photo || !title || !locationTitle) return false;
    return true;
  };

  const sendPost = async () => {
    if (!isPostReady()) return;
    let { coords } = await Location.getCurrentPositionAsync({});
    setLocation(coords);
    navigation.navigate('Posts', { photo, title, locationTitle, location });
    setTitle('');
    setLocationTitle('');
    setLocation('');
    setPhoto('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Camera ref={setCameraRef} type={type} style={styles.camera}>
            {photo && <Image source={{ uri: photo }} style={styles.image} />}
            <TouchableOpacity
              onPress={makePhoto}
              activeOpacity={0.8}
              style={styles.addPhotoButton}
            >
              <MaterialIcons name="photo-camera" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </Camera>
          <Text style={styles.downloadTitle}>Загрузите фото</Text>

          <View style={{ paddingBottom: isFocus ? 100 : 20 }}>
            <TextInput
              onChangeText={handleTitle}
              onFocus={handleFocus}
              value={title}
              placeholder="Название..."
              placeholderTextColor="#BDBDBD"
              style={styles.inputTitle}
            />
            <TextInput
              onChangeText={handleLocationTitle}
              value={locationTitle}
              placeholder="Местность..."
              placeholderTextColor="#BDBDBD"
              style={styles.inputLocation}
            />
            <TouchableOpacity
              onPress={sendPost}
              activeOpacity={0.8}
              style={{
                ...styles.button,
                backgroundColor: isPostReady() ? '#FF6C00' : '#F6F6F6',
              }}
            >
              <Text
                style={{
                  ...styles.buttonText,
                  color: isPostReady() ? '#ffffff' : '#BDBDBD',
                }}
              >
                Опубликовать
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
