import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, PermissionsAndroid, Platform, Alert } from 'react-native';
import Contacts from 'react-native-contacts';

const requestContactsPermission = async () => {
    if (Platform.OS === 'android') {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                {
                    title: 'Contacts Access Permission',
                    message: 'This app needs access to your contacts',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Contacts permission granted');
            } else {
                console.log('Contacts permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    }
};

const ContactList = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        requestContactsPermission().then(() => {
            loadContacts();
        });
    }, []);

    const loadContacts = () => {
        Contacts.getAll()
            .then(contacts => {
                setContacts(contacts);
            })
            .catch(e => {
                console.log(e);
                Alert.alert('Error', 'Could not load contacts');
            });
    };

    return (
        <View style={styles.container}>
            <Button title="Load Contacts" onPress={loadContacts} />
            <FlatList
                data={contacts}
                keyExtractor={(item) => item.recordID}
                renderItem={({ item }) => (
                    <View style={styles.contactItem}>
                        <Text style={styles.contactName}>{item.givenName} {item.familyName}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,


    },
    contactItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: 'black'

    },
    contactName: {
        fontSize: 20,
        color: 'white',



    },
});

export default ContactList;
