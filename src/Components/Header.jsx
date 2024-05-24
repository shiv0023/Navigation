import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const HeaderComponent = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('./Images/logo-whites.png')} style={styles.logoImage} />
        <Text style={styles.logoText}>tat d</Text>
      </View>
      <Text style={styles.slogan}>family ke liye driver</Text>
      <View style={styles.switchContainer}>
        <TouchableOpacity style={styles.switchButtonActive}>
          <Text style={styles.switchTextActive}>CUSTOMER</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.switchButton}>
          <Text style={styles.switchText}>PARTNER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E5E92',
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImage: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
    marginRight: 5,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  slogan: {
    fontSize: 10,
    color: '#FFFFFF',
    position: 'absolute',
    left: 45,
    bottom: 5,
  },
  switchContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
  },
  switchButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  switchButtonActive: {
    backgroundColor: '#1E5E92',
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  switchText: {
    color: '#1E5E92',
    fontWeight: 'bold',
  },
  switchTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default HeaderComponent;
