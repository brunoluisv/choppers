import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import LottieView from "lottie-react-native";
import Spinner from 'react-native-loading-spinner-overlay';
import api from '../../services/api';

import styles from './styles';

import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';

import choppersLogo from '../../assets/icons/choppers.jpeg';
import drinkAnimation from '../../assets/animations/beer1.json';

const TapBeer = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const animation = useRef(false);

  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const product = route.params.product;
  const cpf = route.params.cpf;
  const customer = route.params.customer;

  const playAnimation = () => {
    animation.current.play();
  }

  const tapOpen = async () => {
    if(customer.customer_credit > 0) {
      let data;
      if(product.tap_id && !product.ntag_uid) {
        data = {
          customer_cpf: cpf,
          tap_id: product.tap_id
        }
      }else if(!product.tap_id && product.ntag_uid) {
        data = {
          customer_cpf: cpf,
          ntag_uid: product.ntag_uid
        }
      }else if(product.tap_id && product.ntag_uid) {
        data = {
          tap_id: product.tap_id,
          customer_cpf: cpf,
          ntag_uid: product.ntag_uid
        }
      }

      await api.post('tap_open', data);
    }else {
      console.log('error')
    }
  }
  
  let [fontsLoaded] = useFonts({
    'oswald-bold': require('../../assets/fonts/OswaldBold.ttf'),
    'sfpro-text-bold': require('../../assets/fonts/SFProTextBold.otf'),
    'sfpro-text-regular': require('../../assets/fonts/SFProTextRegular.otf'),
    'sfcompact-text-regular': require('../../assets/fonts/SFCompactTextRegular.otf')
  });

  if(!fontsLoaded) {
    return <AppLoading />
  }else {
    return (
      <View style={styles.container}>
        <Spinner
          visible={loading}
          textContent={'Loading...'}
          textStyle={{ color: '#FFF' }}
        />
        <View style={styles.header}>
          <Image source={choppersLogo} style={styles.headerLogo}/>
        </View>
  
        {!loaded &&
          <>
            <View style={styles.textUpSection}>
              <Text style={[{ fontFamily: 'oswald-bold' }, styles.textUp]}>APROXIME-SE DA TORNEIRA</Text>
              <View style={{justifyContent: 'center', alignItems: 'center', justifyContent: 'center', width: 150, height: 150, borderRadius: 75, margin: 20, backgroundColor: '#002452'}}>
                <Text style={[{ fontFamily: 'oswald-bold' }, styles.tapName]}>{route.params.product.tap_name}</Text>
              </View>
              <Text style={[{ fontFamily: 'oswald-bold' }, styles.textDown]}>E LIBERE PARA CONSUMIR</Text>
            </View>

            <View style={styles.tapSection}>
              <TouchableOpacity style={styles.cancel} onPress={() => { navigation.goBack() }}>
                <Text style={[{ fontFamily: 'sfpro-text-regular' }, styles.textCancel]}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirm} onPress={async () => {
                setLoading(true);
                await tapOpen();
                setLoading(false);
                setLoaded(true);
                playAnimation();
                                
                setTimeout(function() {
                  navigation.navigate('Home', { 
                    partner: route.params.partner, cpf: route.params.cpf
                  })
                }, 4000);
              }}>
                <Text style={[{ fontFamily: 'sfpro-text-bold' }, styles.textConfirm]}>Liberar Torneira</Text>
              </TouchableOpacity>
            </View>


          </>
        }
        {loaded && 
          <View style={styles.textOkSection}>
            <Text style={[styles.textOk, {fontFamily: 'sfpro-text-bold'}]}>CERVEJA LIBERADA</Text>
          </View>
        }
        {loaded && 
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <LottieView resizeMode='contain' source={drinkAnimation} ref={animation} loop={false} style={styles.animation} />
          </View>
        }
        {loaded && 
          <View style={styles.textOpenSection}>
            <Text style={[{ fontFamily: 'sfpro-text-bold' }, styles.textOk]}>SIRVA-SE</Text>
          </View>
        }
      </View>
    );
  }
}

export default TapBeer;