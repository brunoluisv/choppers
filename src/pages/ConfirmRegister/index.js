import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';

import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';

import choppersLogo from '../../assets/icons/choppers.jpeg';
import checked from '../../assets/animations/checked.json';

const ConfirmRegister = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const navigateToHome = () => {
    navigation.push('Home', {
      cpf: route.params.cpf,
      partner: route.params.partner
    });
  }

  const storageData = async (cpf, partner) => {
    try {
      await AsyncStorage.setItem('@storage_cpf', cpf);
      const jsonValue = JSON.stringify(partner);
      await AsyncStorage.setItem('@storage_partner', jsonValue);
    } catch (e) {
      console.log(e)
    }
  }
  
  let [fontsLoaded] = useFonts({
    'oswald-bold': require('../../assets/fonts/OswaldBold.ttf'),
    'oswald-regular': require('../../assets/fonts/OswaldRegular.ttf')
  });

  if(!fontsLoaded) {
    return <AppLoading />
  }else {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={choppersLogo} style={styles.headerLogo}/>
        </View>
        <LottieView resizeMode='contain' source={checked} autoPlay loop={false}/>
        <View style={styles.continueSection}>
          <Text style={[{ fontFamily: 'oswald-regular' }, styles.text]}>Cadastro concluído com sucesso, comece a usar agora mesmo o app</Text>
          <TouchableOpacity style={styles.button} onPress={
            async () => {
              await storageData(route.params.cpf, route.params.partner);
              navigateToHome();
            }
          }>
            <Text style={[{ fontFamily: 'oswald-bold' }, styles.textButton]}>Começar a usar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default ConfirmRegister;
