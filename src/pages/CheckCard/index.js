import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Image, Text, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { FontAwesome5 } from '@expo/vector-icons';
import api from '../../services/api';

import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import Spinner from 'react-native-loading-spinner-overlay';

import styles from './styles';

import cardIcon from '../../assets/icons/card.png';
import choppersLogo from '../../assets/icons/choppers.jpeg';

const CodeForm = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [code, setCode] = useState('');
  const [customer, setCustomer] = useState({});
  const [uid, setUid] = useState('');
  const [loading, setLoading] = useState(false);

  const partner = route.params.partner;
  const cpf = route.params.cpf;

  const navigateToConfirmRegister = () => {
    navigation.push('ConfirmRegister', {
      cpf: cpf,
      partner: partner
    });
  }

  let [fontsLoaded] = useFonts({
    'oswald-bold': require('../../assets/fonts/OswaldBold.ttf'),
    'sfpro-display-bold': require('../../assets/fonts/SFProDisplayBold.otf'),
    'sfpro-display-regular': require('../../assets/fonts/SFProDisplayRegular.otf'),
    'sfpro-rounded-semibold': require('../../assets/fonts/SFProRoundedSemibold.otf'),
    'sfpro-rounded-bold': require('../../assets/fonts/SFProRoundedBold.otf')
  });

  const confirmId = (uid, head, tail) => {
    const checkId = head + tail.replace(/\s/g, '');
    if(uid === checkId) {
      navigateToConfirmRegister();
    }else {
      Alert.alert("Verificação do ID do cartão", "Verificação negada, verifique os digitos faltantes", [{ text: "Verificar" }]);
    }
  } 

  const getCustomerBalance = async () => {
    try {
      const res = await api.get('/customer_balance', {
        partner: partner.partner_id,
        cpf: cpf
      });
      setCustomer(res.data);
      setUid(res.data.card_uid.substring(0, 4));
    }catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    setLoading(true);
    getCustomerBalance();
    setLoading(false);
  }, []);

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
            <Image source={cardIcon}/>
            <Text style={[{ fontFamily: 'oswald-bold' }, styles.textIntro]}>VERIFIQUE SEU CARTÃO</Text>
          </View>
    
          <View style={styles.inputSection}>
            <Text style={[{ fontFamily: 'sfpro-display-bold' }, styles.textUp]}>Complete o ID</Text>
            <Text style={[{ fontFamily: 'sfpro-display-regular' }, styles.textDown]}>que se encontra no seu cartão do</Text>
            <Text style={{ fontFamily: 'sfpro-rounded-semibold', textAlign: 'center', fontSize: 18 }}>{partner.place_name}</Text>
            <Text style={{ fontFamily: 'sfpro-rounded-semibold', textAlign: 'center', fontSize: 24 }}>ID: {uid} _ _ _ _</Text>
            <TextInputMask
              style={[{ fontFamily: 'sfpro-rounded-bold' }, styles.input]}
              type={'custom'}
              keyboardType="default"
              options={{
                mask: '* * * *'
              }}
              placeholder='Últimos 4 digitos do ID'
              value={code}
              onChangeText={value => setCode(value)}
            />
    
            <TouchableOpacity 
              style={styles.button} 
              onPress={
                async () => {
                  await confirmId(customer.card_uid, uid, code);
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