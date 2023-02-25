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
import { MaterialIcons } from '@expo/vector-icons';

import { styles } from './CreatePostsScreen.styled';

export const CreatePostsScreen = () => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [isFocus, setIsFocus] = useState(true);

  const handleTitle = text => setTitle(text);
  const handleLocation = text => setLocation(text);

  const handleFocus = () => {
    setIsFocus(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: 'https://via.placeholder.com/343x240' }}
              style={styles.image}
            />
            <TouchableOpacity activeOpacity={0.8} style={styles.addPhotoButton}>
              <MaterialIcons name="photo-camera" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </View>
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
            <TouchableOpacity activeOpacity={0.8} style={styles.button}>
              <Text style={styles.buttonText}>Опубликовать</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
