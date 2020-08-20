import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Image, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { FontAwesome5 } from '@expo/vector-icons';
import api from '../../services/api';

import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import Spinner from 'react-native-loading-spinner-overlay';

import styles from './styles';

import formIcon from '../../assets/icons/form.png';
import choppersLogo from '../../assets/icons/choppers.jpeg';

const DataForm = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const phone = route.params.phone;
  const cpf = route.params.cpf;
  const partner = route.params.partner;

  const navigateToConfirmRegister = () => {
    navigation.push('ConfirmRegister', {
      phone: phone,
      partner: partner,
      cpf: cpf,
      name: name,
      birthday: birthday,
      email: email
    });
  }

  const createCustomer = async () => {
    const data = {
      customer_name: name,
      customer_cpf: cpf,
      phone: phone,
      customer_birth: birthday,
      email: email,
      id_partner: partner.partner_id,
      id_place: partner.place_id
    }

    api.post('customer_create', data);
  }

  let [fontsLoaded] = useFonts({
    'oswald-bold': require('../../assets/fonts/OswaldBold.ttf'),
    'sfpro-rounded-bold': require('../../assets/fonts/SFProRoundedBold.otf')
  });

  if(!fontsLoaded) {
    return <AppLoading/>
  }else {
    return(
      <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }}>
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
              <Image source={formIcon}/>
              <Text style={[{ fontFamily: 'oswald-bold' }, styles.textIntro]}>INFORME SEUS DADOS</Text>
            </View>
      
            <View style={styles.inputSection}>
              <Text style={[{ fontFamily: 'oswald-bold' }, styles.textUp]}>FINALIZE SEU CADASTRO</Text>
              <TextInput 
                style={[{ fontFamily: 'sfpro-rounded-bold' }, styles.input]}
                type={'custom'}
                placeholder='Nome'
                value={name}
                onChangeText={value => setName(value)}
              />
              <TextInputMask 
                style={[{ fontFamily: 'sfpro-rounded-bold' }, styles.input]}
                type={'datetime'}
                option={{
                  format: 'DD/MM/YYYY'
                }}
                placeholder='Data de Nascimento'
                value={birthday}
                onChangeText={value => setBirthday(value)}
              />
              <TextInput 
                style={[{ fontFamily: 'sfpro-rounded-bold' }, styles.input]}
                keyboardType={'email-address'}
                placeholder='E-mail'
                value={email}
                onChangeText={value => setEmail(value)}
              />
      
              <TouchableOpacity 
                style={styles.button}
                onPress={
                  async () => {
                    setLoading(true);
                    await createCustomer();
                    setLoading(false);
                    navigateToConfirmRegister();
                  }
                }
              >
                <Text style={[{ fontFamily: 'oswald-bold' }, styles.buttonText]}>Concluir</Text>
                <FontAwesome5 name="check-circle" size={24} color="#FFF" style={styles.arrowIcon}/>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

export default DataForm;