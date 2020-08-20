import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Image, Text, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { FontAwesome5 } from '@expo/vector-icons';
import firebase from '../../services/firebase';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import Spinner from 'react-native-loading-spinner-overlay';

import styles from './styles';

import codeIcon from '../../assets/icons/code.png';
import choppersLogo from '../../assets/icons/choppers.jpeg';

const CodeForm = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const phone = route.params.phone;
  const cardVerified = route.params.cardVerified;

  const confirmCode = async () => {
    setLoading(true);
    try {
      const verificationId = route.params.confirm;
      const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        code.replace(/\s/g, '')
      );
  
      await firebase.auth().signInWithCredential(credential);
      setLoading(false);
      if(cardVerified) {
        navigateToConfirmRegister();
      }else {
        navigateToDataForm();
      }
      
    } catch(err) {
      setLoading(false);
      Alert.alert(
        'Código Incorreto',
        `Verifique o código enviado para o número ${phone}`,
        [
          { text: 'OK'}
        ],
        { cancelable: false }
      );
      
      console.log(err);
    }
  }

  const navigateToConfirmRegister = () => {
    navigation.push('ConfirmRegister', {
      phone: phone,
      partner: route.params.partner,
      cpf: route.params.cpf
    });
  }

  const navigateToDataForm = () => {
    navigation.push('DataForm', {
      phone: route.params.phone,
      cpf: route.params.cpf,
      partner: route.params.partner
    });
  }

  let [fontsLoaded] = useFonts({
    'oswald-bold': require('../../assets/fonts/OswaldBold.ttf'),
    'sfpro-display-bold': require('../../assets/fonts/SFProDisplayBold.otf'),
    'sfpro-display-regular': require('../../assets/fonts/SFProDisplayRegular.otf'),
    'sfpro-rounded-semibold': require('../../assets/fonts/SFProRoundedSemibold.otf'),
    'sfpro-rounded-bold': require('../../assets/fonts/SFProRoundedBold.otf')
  });

  if(!fontsLoaded) {
    return <AppLoading/>
  }else {
    return(
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <Spinner
            visible={loading}
            textContent={'Loading...'}
            textStyle={{ color: '#FFF' }}
          />
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton}>
              <FontAwesome5 name="arrow-left" size={26} onPress={() => { navigation.goBack() }}/>
            </TouchableOpacity>
            <Image source={choppersLogo} style={styles.headerLogo}/>
          </View>
          <View style={styles.intro}> 
            <Image source={codeIcon}/>
            <Text style={[{ fontFamily: 'oswald-bold' }, styles.textIntro]}>DIGITE SEU CÓDIGO</Text>
          </View>
    
          <View style={styles.inputSection}>
            <Text style={[{ fontFamily: 'sfpro-display-bold' }, styles.textUp]}>Insira o código</Text>
            <Text style={[{ fontFamily: 'sfpro-display-regular' }, styles.textDown]}>que enviamos para 
              <Text style={{ fontFamily: 'sfpro-rounded-semibold' }}> {phone}</Text>
            </Text>
            <TextInputMask
              style={[{ fontFamily: 'sfpro-rounded-bold' }, styles.input]}
              type={'custom'}
              keyboardType="numeric"
              options={{
                mask: '9 9 9 9 9 9'
              }}
              placeholder='Código'
              value={code}
              onChangeText={value => setCode(value)}
            />
    
            <TouchableOpacity 
              style={styles.button} 
              onPress={
                async () => {
                  await confirmCode();
              }
            }
            >
              <Text style={[{ fontFamily: 'oswald-bold' }, styles.buttonText]}>Continuar</Text>
              <FontAwesome5 name="arrow-right" size={24} color="#FFF" style={styles.arrowIcon}/>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default CodeForm;