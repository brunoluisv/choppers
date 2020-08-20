import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';

import choppersLogo from '../../assets/icons/choppers.jpeg';

const Splash = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const navigation = useNavigation();

  const prepareResources = async () => {
    await performAPICalls();

    setAppIsReady(true);
    await SplashScreen.hideAsync();
  };

  const performAPICalls = async () => {
    setTimeout(async function() {
      const storageCpf = await AsyncStorage.getItem('@storage_cpf');
      const storagePartner = await AsyncStorage.getItem('@storage_partner');
      const storageImage = await AsyncStorage.getItem('@storage_image');
    
      if(storageCpf && storagePartner) {
        navigation.navigate('Home', {
          partner: JSON.parse(storagePartner),
          cpf: storageCpf,
          image: storageImage
        });
      }else {
        navigation.navigate('SelectPartner');
      }
    }, 4000)

  }

  const loadInfos = async () => {
    try {
      await SplashScreen.preventAutoHideAsync();
    } catch (e) {
      console.warn(e);
    }
    prepareResources();
  }

  useEffect(() => {
    loadInfos();
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Image source={choppersLogo} style={styles.logo}/>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F7F7',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
  logo: {
    flex: 1,
    width: 220,
    height: 220,
    resizeMode: 'contain'
  }
});


export default Splash;