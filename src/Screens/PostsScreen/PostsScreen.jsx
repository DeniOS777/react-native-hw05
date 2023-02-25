import React from 'react';
import { Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

import { styles } from './PostsScreen.styled';

const list = [
  {
    id: '1',
    title: 'Лес',
    comments: 1,
    url: 'https://via.placeholder.com/343x240',
    location: 'USA, New York',
  },
  {
    id: '2',
    title: 'Море',
    comments: 2,
    url: 'https://via.placeholder.com/343x240',
    location: 'USA, Canada',
  },
  {
    id: '3',
    title: 'Пляж',
    comments: 3,
    url: 'https://via.placeholder.com/343x240',
    location: 'USA, Toronto',
  },
];

const Item = ({ item, navigation }) => (
  <View style={{ marginBottom: 32 }}>
    <Image style={styles.imagePosts} source={{ uri: `${item.url}` }} />
    <Text style={styles.imageTitle}>{item.title}</Text>
    <View style={styles.descriptionContainer}>
      <View style={styles.wrapContainer}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate('Comments')}
        >
          <EvilIcons name="comment" size={24} color="#BDBDBD" />
        </TouchableOpacity>
        <Text style={styles.textComment}>{item.comments}</Text>
      </View>
      <View style={styles.wrapContainer}>
        <EvilIcons name="location" size={24} color="#BDBDBD" />
        <TouchableOpacity
          onPress={() => navigation.navigate('Map')}
          activeOpacity={0.5}
        >
          <Text style={styles.textLocation}>{item.location}</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

export const PostsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerProfile}>
        <View style={styles.wrapImageProfile}>
          <Image
            style={styles.imageProfile}
            source={require('../../../assets/userPhoto.jpg')}
          />
        </View>

        <View>
          <Text style={styles.textName}>Derek Menson</Text>
          <Text style={styles.textEmail}>derek_menson@mail.com</Text>
        </View>
      </View>

      <View style={{ paddingBottom: 90 }}>
        <FlatList
          data={list}
          renderItem={({ item }) => (
            <Item navigation={navigation} item={item} />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};
