import React from 'react';
import { View, Text, Image } from 'react-native';

export const ResultsDisplay = ({ results, imageUri }) => {
  return (
    <View>
      <Image source={{ uri: imageUri }} />
      <Text>Results:</Text>
      {results.map((result, index) => (
        <Text key={index}>{result.status}</Text>
      ))}
    </View>
  );
};

export default ResultsDisplay;