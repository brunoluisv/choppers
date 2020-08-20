import React, { useState, useRef } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Image, Text, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { FontAwesome5 } from '@expo/vector-icons';

import styles from './styles';

import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import Spinner from 'react-native-loading-spinner-overlay';
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import firebase from '../../services/firebase';

import cellphone from '../../assets/icons/cellphone.png';
import choppersLogo from '../../assets/icons/choppers.jpeg';

const PhoneForm = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [phone, setPhone] = useState('');
  const phoneField = useRef(null);
  const [loading, setLoading] = useState(false);
  const recaptchaVerifier = useRef(null);

  const sendVerification = async () => {
    setLoading(true);
    try {
      const phoneProvider = new firebase.auth.PhoneAuthProvider();
      const phoneUnsmaked = phoneField.current.getRawValue();
      setLoading(false);

      const id = await phoneProvider.verifyPhoneNumber(
        '+55'+phoneUnsmaked, 
        recaptchaVerifier.current
      );
      
      navigateToCodeForm(phone, id);
    }catch(err) {
      setLoading(false);
      console.log(err);
    }
  }  

  const navigateToCodeForm = (phone, id) => {
    navigation.push('CodeForm', {
      phone: phone,
      confirm: id,
      partner: route.params.partner,
      cpf: route.params.cpf,
      cardVerified: route.params.cardVerified
    });
  }

  let [fontsLoaded] = useFonts({
    'oswald-bold': require('../../assets/fonts/OswaldBold.ttf'),
    'sfpro-display-bold': require('../../assets/fonts/SFProDisplayBold.otf'),
    'sfpro-display-regular': require('../../assets/fonts/SFProDisplayRegular.otf'),
    'sfpro-rounded-bold': require('../../assets/fonts/SFProRoundedBold.otf')
  });

  if(!fontsLoaded) {
    return <AppLoading/>
  }else {
    return(
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={firebase.app().options}
          />
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
            <Image source={cellphone}/>
            <Text style={[{ fontFamily: 'oswald-bold' }, styles.textIntro]}>DIGITE SEU TELEFONE</Text>
          </View>
    
          <View style={styles.inputSection}>
            <Text style={[{ fontFamily: 'sfpro-display-bold' }, styles.textUp]}>Insira seu celular</Text>
            <Text style={[{ fontFamily: 'sfpro-display-regular' }, styles.textDown]}>para fazermos seu cadastro</Text>
            <TextInputMask 
              style={[{ fontFamily: 'sfpro-rounded-bold' }, styles.input]}
              type={'cel-phone'}
              options={{
                maskType: 'BRL',
                withDDD: true,
                dddMask: '(99) '
              }}
              placeholder='DDD + Telefone'
              value={phone}
              onChangeText={value => setPhone(value)}
              ref={phoneField}
            />
    
            <TouchableOpacity 
              style={styles.button} 
              onPress={sendVerification}
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

export default PhoneForm;