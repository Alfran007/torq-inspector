import React, { useState } from 'react';
import { View, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export const ImageCapture = () => {
  const [image, setImage] = useState(null);

  const handleImagePick = async () => {
    // ... image picking logic ...
    setImage(result.uri);
  };

  return (
    <View>
      <Button title="Capture Image" onPress={handleImagePick} />
      {image && <Image source={{ uri: image }} />}
    </View>
  );
};

export default ImageCapture;