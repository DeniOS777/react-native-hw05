import React, { useState } from 'react';
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
import { MaterialIcons } from '@expo/vector-icons';

import { styles } from './CreatePostsScreen.styled';

export const CreatePostsScreen = ({ navigation }) => {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [photo, setPhoto] = useState('');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [isFocus, setIsFocus] = useState(true);

  const handleTitle = text => setTitle(text);
  const handleLocation = text => setLocation(text);
  const handleFocus = () => setIsFocus(false);

  const makePhoto = async () => {
    const { uri } = await cameraRef.takePictureAsync();
    setPhoto(uri);
  };

  const isPostReady = () => {
    if (!photo || !title || !location) return false;
    return true;
  };

  const sendPost = () => {
    if (!isPostReady()) {
      return console.log('Fill in all the fields');
    }
    navigation.navigate('Posts', { photo, title, location });
    setTitle('');
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
              onChangeText={handleLocation}
              value={location}
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
