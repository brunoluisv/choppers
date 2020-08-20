import React, { useState, useRef } from 'react';
import { View, Image, Text, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text';
import { FontAwesome5 } from '@expo/vector-icons';
import api from '../../services/api';

import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import Spinner from 'react-native-loading-spinner-overlay';

import styles from './styles';

import cpfIcon from '../../assets/icons/cpf.png';
import choppersLogo from '../../assets/icons/choppers.jpeg';

const CpfForm = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [cpf, setCpf] = useState('');
  const cpfField = useRef(null);
  const [loading, setLoading] = useState(false);

  const checkUserExists = async () => {
    try {
      setLoading(true);
      const res = await api.get('/customer_balance', {
        partner: route.params.partner.partner_id,
        cpf: cpfField.current.getRawValue()
      });

      if(res.data && res.data.status == false) {
        setLoading(false);
        navigateToPhoneForm(false);
      }else {
        if(res.data.card_uid.startsWith('!') || res.data.card_uid.startsWith('V')) {
          setLoading(false);
          navigateToPhoneForm(true);
        }else {
          setLoading(false);
          navigateToCheckCard();
        }
      }
    }catch(err) {
      console.log(err);
    }
  }

  const navigateToPhoneForm = (verified) => {
    navigation.push('PhoneForm', {
      partner: route.params.partner,
      cpf: cpfField.current.getRawValue(),
      cardVerified: verified
    });
  }

  const navigateToCheckCard = () => {
    navigation.push('CheckCard', {
      partner: route.params.partner,
      cpf: cpfField.current.getRawValue()
    });
  }

  let [fontsLoaded] = useFonts({
    'oswald-bold': require('../../assets/fonts/OswaldBold.ttf'),
    'sfpro-display-bold': require('../../assets/fonts/SFProDisplayBold.otf'),
    'sfpro-display-regular': require('../../assets/fonts/SFProDisplayRegular.otf'),
    'sfpro-rounded-bold': require('../../assets/fonts/SFProRoundedBold.otf')
  });

  if(!fontsLoaded) {
    return <AppLoading />
  }else {
    return (
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
            <Image source={cpfIcon}/>
            <Text style={[{ fontFamily: 'oswald-bold' }, styles.textIntro]}>DIGITE SEU CPF</Text>
          </View>
    
          <View style={styles.inputSection}>
            <Text style={[{ fontFamily: 'sfpro-display-bold'}, styles.textUp]}>Precisamos do seu cpf</Text>
            <Text style={[{ fontFamily: 'sfpro-display-regular' }, styles.textDown]}>para verificar seu cadastro</Text>
            <TextInputMask 
              style={[{ fontFamily: 'sfpro-rounded-bold' }, styles.input]}
              type={'cpf'}
              placeholder='CPF'
              value={cpf}
              onChangeText={value => setCpf(value)}
              ref={cpfField}
            />
    
            <TouchableOpacity 
              style={styles.button}
              onPress={checkUserExists}
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

export default CpfForm;