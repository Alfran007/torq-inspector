import React, { useState } from 'react';
import { View, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [image, setImage] = useState(null);
  const navigation = useNavigation();
  const handleImagePick = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        console.log('Setting image URI')
        setImage(result.uri);
        navigation.navigate('Results', { imageUri: result.uri });
      }
    } catch (error) {
      console.error('Error capturing image:', error);
    }
  };

  return (
    <View>
      <Button title="Capture Image" onPress={handleImagePick} />
      {image && <Image source={{ uri: image }} />}
    </View>
  );
};

export default HomeScreen;