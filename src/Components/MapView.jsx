import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, PermissionsAndroid, Platform, Button, TextInput, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';

const GOOGLE_MAPS_API_KEY = 'YOUR_NEW_API_KEY_HERE';

Geocoder.init('AIzaSyARNDXzSr-Heq6c0_4e2LifNMdUlkVLdyY'); // Initialize Geocoder with your Google Maps API key

const MyView = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [destinationAddress, setDestinationAddress] = useState('');
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [watchId, setWatchId] = useState(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Permission',
            message: 'We need access to your location to show your position on the map.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          startWatchingLocation();
        } else {
          console.log('Location permission denied');
        }
      } else {
        startWatchingLocation();
      }
    };

    const startWatchingLocation = () => {
      const id = Geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ latitude, longitude });
        },
        (error) => {
          console.log(error);
          Alert.alert("Error", "Could not fetch location. Please try again.");
        },
        {
          enableHighAccuracy: true,
          distanceFilter: 0, // Update location on every change
          interval: 5000, // Update location every 5 seconds
        },
      );
      setWatchId(id);
    };

    requestLocationPermission();

    return () => {
      if (watchId !== null) {
        Geolocation.clearWatch(watchId);
      }
    };
  }, [watchId]);

  const geocodeAddress = (address) => {
    Geocoder.from(address)
      .then(json => {
        const location = json.results[0].geometry.location;
        setDestinationLocation({ latitude: location.lat, longitude: location.lng });
      })
      .catch(error => console.warn(error));
  };

  const calculateDistance = () => {
    if (currentLocation && destinationLocation) {
      const dist = getDistance(
        currentLocation.latitude,
        currentLocation.longitude,
        destinationLocation.latitude,
        destinationLocation.longitude
      );
      setDistance(dist);
    }
  };

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance; // Distance in kilometers
  };

  const toRadians = (deg) => {
    return deg * (Math.PI / 180);
  };

  return (
    <View style={styles.container}>
      {currentLocation && (
        <MapView
          style={styles.map}
          region={{
            ...currentLocation,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          showsUserLocation
        >
          {destinationLocation && (
            <>
              <Marker
                coordinate={destinationLocation}
                title="Destination"
              />
              <MapViewDirections
                origin={currentLocation}
                destination={destinationLocation}
                apikey={GOOGLE_MAPS_API_KEY} // Your Google Maps API Key
                strokeWidth={3}
                strokeColor="blue"
                onReady={result => {
                  setDistance(result.distance);
                }}
                onError={(errorMessage) => {
                  console.log('Gmaps directions error: ', errorMessage);
                }}
              />
            </>
          )}
        </MapView>
      )}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Current Location: {currentLocation ? `${currentLocation.latitude}, ${currentLocation.longitude}` : 'Fetching...'}
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Destination Address"
          value={destinationAddress}
          onChangeText={setDestinationAddress}
        />
        <Button
          title="Set Destination"
          onPress={() => geocodeAddress(destinationAddress)}
        />
        <Text style={styles.infoText}>
          Distance: {distance ? `${distance.toFixed(2)} km` : 'Calculating...'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  infoContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    elevation: 5,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default MyView;
