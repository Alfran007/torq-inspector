import React, { useState, useEffect } from 'react';
import { View, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { Camera } from 'expo-camera'
import { MediaLibrary } from 'expo-media-library';

//import { ImagePicker } from 'react-native-image-picker';
const HomeScreen = () => {
  const [image, imageUri, setImage] = useState(null);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  
  const requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    return status === 'granted';
  };
  
  // const requestMediaLibraryPermission = async () => {
  //   const { status } = await MediaLibrary.requestPermissionsAsync();
  //   return status === 'granted';
  // };

  const navigation = useNavigation();
  const handleImagePick = async () => {
    const hasCameraPermission = await requestCameraPermission();
  //  const hasMediaLibraryPermission = await requestMediaLibraryPermission();
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    try {
      // const result = await ImagePicker.launchImageLibraryAsync({
      //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
      //   allowsEditing: true,
      //   aspect: [4, 3],
      //   quality: 1,
      // });
      if (hasCameraPermission) {
      // const result = await ImagePicker.launchImageLibraryAsync(options);
      //const result = await ImagePicker.launchImageLibraryAsync(options);
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true, 
    
        aspect: [4, 3],
        quality: 1, 
    
      });
      if (!result.cancelled) {
        console.log('Setting image URI')
        // setImage(result.uri);
        // setImageUri(result.uri);
        uploadImage(result.uri);
      //  processImage(result.uri);
        // navigation.navigate('Results', { imageUri: result.uri });
      }
      else{
        console.log("Results cancelled")
      }
    }
    } catch (error) {
      console.error('Error capturing image:', error);
    }
  };

  // const handlePickImage = () => {
  //   ImagePicker.launchImageLibrary({ mediaType: 'photo' }, (response) => {
  //     if (!response.didCancel) {
  //       setImageUri(response.uri);
  //       uploadImage(response.uri);
  //     }
  //   });
  // };

  const uploadImage = async (imageUri) => {
    const formData = new FormData();
  formData.append('image', {
    uri: imageUri,
    name: 'image.png', // Adjust the filename as needed
    type: 'image/png', // Adjust the MIME type based on the image format
  });


    try {
      print("Sending POST request")
      const res = await fetch('https://d8b5-106-219-71-135.ngrok-free.app/process-image', {
        method: 'POST',
        headers: {'Content-Type': 'multipart/form-data'},
        body: formData,
      });
      console.log(res)
      const result = await res.json();
      Alert.alert('Result', result.result);
    } catch (error) {
      console.error(error);
    }
  };

  const processImage = async (imageUri) => {
    const apiUrl = 'http://127.0.0.1:5000/process-image';  // Replace with your machine's IP
    
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      type: 'image/png',
      name: 'photo.png',
    });
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
  
      const data = await response.json();
      console.log('Response:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  // Function to draw on canvas after the image is loaded
  // const drawOnCanvas = async (canvas) => {
  //   if (!imageUri || !canvas) return;

  //   const context = canvas.getContext('2d');
  //   canvas.width = imageDimensions.width;
  //   canvas.height = imageDimensions.height;

  //   const canvasImage = new CanvasImage(canvas);
  //   canvasImage.src = imageUri;

  //   canvasImage.addEventListener('load', () => {
  //     context.drawImage(canvasImage, 0, 0, canvas.width, canvas.height);
  //     processImage(context, canvas.width, canvas.height);
  //   });
  // };

  // Basic image processing function to detect paint marks and highlight them
  // const processImage = (context, width, height) => {
  //   context.strokeStyle = 'yellow';
  //   context.lineWidth = 5;

  //   // Example coordinates for marking bolts
  //   const exampleBoltPositions = [
  //     { x: width * 0.2, y: height * 0.3 },
  //     { x: width * 0.5, y: height * 0.5 },
  //     { x: width * 0.8, y: height * 0.7 },
  //   ];

  //   exampleBoltPositions.forEach(({ x, y }) => {
  //     context.beginPath();
  //     context.arc(x, y, 15, 0, 2 * Math.PI); // Draw circle around the bolt
  //     context.stroke();

  //     // Example logic for marking alignment based on random value
  //     const isAligned = Math.random() > 0.5;
  //     if (isAligned) {
  //       context.fillStyle = 'green';
  //     } else {
  //       context.fillStyle = 'red';
  //     }

  //     context.beginPath();
  //     context.arc(x, y, 10, 0, 2 * Math.PI);
  //     context.fill();
  //   });
  // };

  // useEffect(() => {
  //   if (canvasRef.current) {
  //     drawOnCanvas(canvasRef.current);
  //   }
  // }, [imageUri, imageDimensions]);
  
  return (
    <View>
      <Button title="Capture Image" onPress={handleImagePick} />
      {image && <Image source={{ uri: image }} />}
    </View>
  );
};

export default HomeScreen;