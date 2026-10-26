import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Switch } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

export default function HomeScreen() {
  const [name, setName] = useState('');
  const [married, setMarried] = useState(false);
  const [satisfaction, setSatisfaction] = useState([20, 80]);
  const [bio, setBio] = useState('');
  const [sliderWidth, setSliderWidth] = useState(0);

  function handleSubmit() {
    console.log('Submitted data:', { name, married, satisfaction, bio });
  }

  const toggleSwitch = () => setMarried(previousState => !previousState);
  
  const handleSatisfactionChange = (values: number[]) => {
    setSatisfaction(values);
  };

  return (
    <View style={styles.container}>
      {/* Name Input */}
      <Text style={styles.labelText}>Enter your name</Text>
      <TextInput 
        style={styles.input}
        placeholder="Type your name"
        value={name}
        onChangeText={setName}
      />

      {/* Bio Input */}
      <Text style={styles.labelText}>Bio</Text>
      <TextInput 
        style={[styles.input, styles.bioInput]}
        placeholder="Tell us about yourself"
        value={bio}
        onChangeText={setBio}
        multiline
      />

      {/* Married Switch */}
      <Text style={styles.labelText}>Are you Married?</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={married ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={married}
      />

      {/* MultiSlider */}
      <Text style={[styles.labelText, styles.sliderLabel]}>How is your marriage satisfaction?</Text>
      <View 
        style={styles.sliderWrapper}
        onLayout={(event) => setSliderWidth(event.nativeEvent.layout.width)}
      >
        {sliderWidth > 0 && (
          <MultiSlider
            values={[satisfaction[0], satisfaction[1]]}
            sliderLength={sliderWidth}
            min={0}
            max={100}
            step={1}
            allowOverlap={false}
            snapped
            onValuesChange={handleSatisfactionChange}
            selectedStyle={styles.selectedTrack}
            unselectedStyle={styles.unselectedTrack}
            markerStyle={styles.marker}
          />
        )}
      </View>
      
      <View style={styles.labelContainer}>
        <Text style={styles.labelTextMinMax}>Min: {satisfaction[0]}</Text>
        <Text style={styles.labelTextMinMax}>Max: {satisfaction[1]}</Text>
      </View>

      {/* Submit Button */}
      <View style={styles.buttonContainer}>
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 20,
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
  },
  bioInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  sliderWrapper: {
    width: '80%',
    alignItems: 'center',
    height: 40,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 24,
  },
  labelText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 6,
    width: '80%',
    textAlign: 'left',
  },
  labelTextMinMax: {
    fontSize: 16,
    color: '#333',
  },
  sliderLabel: {
    marginTop: 10,
  },
  selectedTrack: {
    backgroundColor: '#007AFF',
  },
  unselectedTrack: {
    backgroundColor: '#CECECE',
  },
  marker: {
    backgroundColor: '#007AFF',
    height: 24,
    width: 24,
    borderRadius: 12,
  },
  buttonContainer: {
    width: '80%',
    marginTop: 10,
  },
});