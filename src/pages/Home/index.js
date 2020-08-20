import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, Image, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';

import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import styles from './styles';

import choppersLogo from '../../assets/icons/choppers.jpeg';
import beerIcon from '../../assets/icons/beer.png';
import creditCardMachine from '../../assets/icons/machine2.png';
import storeIcon from '../../assets/icons/online-shop.png';
import camera from '../../assets/icons/camera2.png';
import timer from '../../assets/icons/stopwatch.png'

const Home = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [customer, setCustomer] = useState({});
  const [image, setImage] = useState(route.params.image);
  // const [partner, setPartner] = useState({});
  // const [cpf, setCpf] = useState('');

  const cpf = route.params.cpf;
  const partner = route.params.partner;

  const modalizeRef= useRef(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  }
  
  const navigateToSelectPartner = () => {
    navigation.push('SelectPartner');
  }

  const navigateToSelectBeer = () => {
    navigation.push('SelectBeer', {
      partner: partner,
      cpf: cpf,
      partner: partner,
      customer: customer
    });
  }

  const navigateToHistoric = () => {
    navigation.push('Historic', {
      partner: partner,
      cpf: cpf
    });
  }

  const handleSetImage = (image) => {
    setImage(image);
  }

  const storageImage = async (image) => {
    await AsyncStorage.setItem('@storage_image', image);
  }

  const _pickImage = async () => {
    try {
      await Permissions.askAsync(Permissions.CAMERA_ROLL);
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1
      });

      if(!result.cancelled) {
        handleSetImage(result.uri);
        storageImage(result.uri);
      }
    } catch(err) {
      console.log(err);
    }
  }

  let [fontsLoaded] = useFonts({
    'oswald-bold': require('../../assets/fonts/OswaldBold.ttf'),
    'sfpro-rounded-regular': require('../../assets/fonts/SFProRoundedRegular.otf'),
    'sfpro-rounded-bold': require('../../assets/fonts/SFProRoundedBold.otf'),
    'sfpro-text-bold': require('../../assets/fonts/SFProTextBold.otf'),
    'sfpro-text-semibold': require('../../assets/fonts/SFProTextSemibold.otf')
  });

  const getCustomerBalance = async () => {
    try {
      const res = await api.get('/customer_balance', {
        partner: partner.partner_id,
        cpf: cpf
      });
      await setCustomer(res.data);
    }catch(err) {
      console.log(err);
    }
  }
  
  useEffect(() => {

    getCustomerBalance();
  }, []);

  if(!fontsLoaded) {
    return <AppLoading />
  }else {
    return  (
      <View style={styles.container}>
        <View style={styles.dataView}>
          <TouchableOpacity onPress={_pickImage} style={styles.moldure}>
            {image ? 
              (
                <View style={styles.customerPicture}>
                  <Image source={{uri: image}} style={{width: 120, height: 120, borderRadius: 60}} />
                </View>
              ) : (
                <Image source={camera} style={styles.cameraIcon}/>
              )
            }
          </TouchableOpacity>
          <View style={{alignItems: 'center'}}>
            <View style={{height: 50, width: 120, position: 'absolute', bottom: 50, left: 40}}>
              <Image source={choppersLogo} style={{ flex: 1, width: null, height: null, resizeMode: 'contain' }}/>
            </View>
            
            <Text style={[{ fontFamily: 'sfpro-text-bold' }, styles.customerName]}>Olá, {customer.customer_name}</Text>
          </View>
        </View>
        <View style={styles.customerCreditView}>
          <Image source={{uri: partner.place_card_art}} style={styles.partnerCard}/>
        </View>
        <View style={styles.balanceCard}>
          <Text style={{fontFamily: 'sfpro-rounded-bold', fontSize: 28, color: '#007F62'}}>R$ {customer.customer_credit}</Text>
        </View>

        <View style={[styles.chooseView, {marginTop:15}]}>
          <TouchableOpacity style={[{backgroundColor: '#002452'}, styles.choose]} 
            onPress={navigateToSelectBeer}
          >
            <Text style={[{fontFamily: 'sfpro-text-bold'}, styles.actionTextTaps]}>Lista de TAPS</Text>
            <Image source={beerIcon} style={styles.iconTap}/>
          </TouchableOpacity>
          <TouchableOpacity style={[{backgroundColor: '#007F62'}, styles.choose]}>
            <Text style={[{fontFamily: 'sfpro-text-bold'}, styles.actionTextMachine]}>Recarregar Cartão</Text>
            <Image source={creditCardMachine} style={styles.iconMachine}/>
          </TouchableOpacity>
        </View>       

        <View style={styles.chooseView}>
          <TouchableOpacity style={[{backgroundColor: '#e77e52'}, styles.choose]} 
            onPress={async () => {
              try {
                await AsyncStorage.removeItem('@storage_cpf');
                await AsyncStorage.removeItem('@storage_partner');
                await AsyncStorage.removeItem('@storage_image');
              } catch (e) {
                console.log(e)
              }
              navigateToSelectPartner();
            }}>
            <Text style={[{fontFamily: 'sfpro-text-bold'}, styles.actionTextTimer]}>Selecione o Local</Text>
            <Image source={storeIcon} style={styles.iconShop}/>
          </TouchableOpacity>
          <TouchableOpacity style={[{backgroundColor: '#239de7'}, styles.choose]} onPress={navigateToHistoric}>
            <Text style={[{fontFamily: 'sfpro-text-bold'}, styles.actionTextTimer]}>Histórico de TAPS</Text>
            <Image source={timer} style={styles.iconTimer}/>
          </TouchableOpacity>
        </View>  
      </View>
    );
  }
}

export default Home;