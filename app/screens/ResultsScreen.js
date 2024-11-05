// import React, { useEffect, useState } from 'react';
// import { View, Text, Image, Button } from 'react-native';
// import { useRoute } from '@react-navigation/native';
// import { detectObjects, assessAlignment } from '../utils/imageProcessing';
// import { storeInspectionResult } from '../utils/database';
// import { useNavigation } from '@react-navigation/native';

// const ResultsScreen = () => {
//   const { params } = useRoute();
//   const { imageUri } = params;
//   const [results, setResults] = useState([]);
//   const navigation = useNavigation();
//   useEffect(() => {
//     const processImage = async () => {
//       const objects = await detectObjects(imageUri);
//       const results = objects.map(object => assessAlignment(object));
//       setResults(results);

//       // Store results in the database
//       storeInspectionResult(results, Date.now(), imageUri);
//     };

//     processImage();
//   }, [imageUri]);

//   return (
//     <View>
//       <Image source={{ uri: imageUri }} />
//       <Text>Results:</Text>
//       {results.map((result, index) => (
//         <Text key={index}>{result.status}</Text>
//       ))}
//       <Button title="Save Results" onPress={() => navigation.navigate('Home')} />
//     </View>
//   );
// };

// export default ResultsScreen;

/*import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as cv from 'opencv';

const App = () => {
  const [image, setImage] = useState(null);
  const [alignmentStatus, setAlignmentStatus] = useState(null);

  useEffect(() => {
    (async () => {
      await cv.init();
    })();
  }, []);

  const handleTakePicture = async () => {
    const data = await camera.takePictureAsync();
    setImage(data.uri);

    // Process the image using OpenCV
    const mat = cv.imread(data.uri);
    // ... (OpenCV operations for paint mark detection and alignment)
    const result = cv.cvtColor(mat, cv.CV_GRAY2RGB);
    setImage(result.uri);

    // Determine alignment status
    setAlignmentStatus(determineAlignment(mat));

    // Store results in the database
      storeInspectionResult(results, Date.now(), imageUri);
  };

  const determineAlignment = (mat) => {
    // Implement your alignment logic using OpenCV
    // ...
    return 'aligned' || 'misaligned' || 'no mark';
  };

  return (
    <View>
      <Camera style={{ flex: 1 }} type={Camera.Constants.Type.back}>
      </Camera>
      {image && <Image source={{ uri: image }} />}
      <Text>Alignment: {alignmentStatus}</Text>
    </View>
  );
};

export default App;
*/