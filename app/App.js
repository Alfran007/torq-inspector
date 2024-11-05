import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import ResultsScreen from './screens/ResultsScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

/*import React, { useState, useRef, useEffect } from 'react';
import { Button, Image, SafeAreaView, Text, View, Alert } from 'react-native';
// import { launchImageLibrary } from 'react-native-image-picker';
//import Canvas, { Image as CanvasImage } from 'react-native-canvas';
import * as ImagePicker from 'react-native-image-picker';
const App = () => {
  const [imageUri, setImageUri] = useState(null);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const canvasRef = useRef(null);

  // Function to pick an image from the library
  // const pickImage = async () => {
  //   try {
  //     const result = await launchImageLibrary({
  //       mediaType: 'photo',
  //       quality: 1,
  //     });

  //     if (result.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (result.errorCode) {
  //       console.log('ImagePicker Error: ', result.errorMessage);
  //     } else if (result.assets && result.assets.length > 0) {
  //       const selectedImage = result.assets[0];
  //       setImageUri(selectedImage.uri);

  //       // Get image dimensions for canvas scaling
  //       Image.getSize(selectedImage.uri, (width, height) => {
  //         setImageDimensions({ width, height });
  //       });
  //     }
  //   } catch (error) {
  //     console.error('Error picking image: ', error);
  //   }
  // };
 

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Torque Bolt & Nut Inspection</Text>

      <Button title="Pick Image" onPress={handlePickImage} />

      {imageUri && (
        <View style={{ marginTop: 20, width: '100%', alignItems: 'center' }}>
          <Canvas ref={canvasRef} style={{ width: imageDimensions.width, height: imageDimensions.height }} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default App;
*/