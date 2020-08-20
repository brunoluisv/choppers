import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import api from '../../services/api';

import styles from './styles';

import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';

import choppersLogo from '../../assets/icons/choppers.jpeg'
import lista from '../../assets/icons/buy.png';
import copo from '../../assets/icons/copo.png';
import money from '../../assets/icons/money.png';
import payment from '../../assets/icons/payment.png';
import cart from '../../assets/icons/shopping-cart.png';

const Historic = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [historic, setHistoric] = useState([]);

  const cpf = route.params.cpf;
  const partner = route.params.partner;

  const getCustomerHistoric = async () => {
    try {
      const res = await api.get('/customer', {
        partner: partner.partner_id,
        cpf: cpf
      });

      setHistoric(res.data);
    }catch(err) {
      console.log(err);
    }
  }

  let [fontsLoaded] = useFonts({
    'oswald-bold': require('../../assets/fonts/OswaldBold.ttf'),
    'sfpro-rounded-bold': require('../../assets/fonts/SFProRoundedBold.otf'),
    'sfpro-text-bold': require('../../assets/fonts/SFProTextBold.otf')
  });

  useEffect(() => {
    getCustomerHistoric();
  }, []);

  if(!fontsLoaded) {
    return <AppLoading />
  }else {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <FontAwesome5 name="arrow-left" size={26} onPress={() => { navigation.goBack() }}/>
          </TouchableOpacity>
          <Image source={choppersLogo} style={styles.headerLogo}/>
        </View>
        <View style={styles.intro}> 
          <Image source={lista} style={{width: 85, height: 85}}/>
          <Text style={[{ fontFamily: 'oswald-bold'}, styles.textIntro]}>HISTÓRICO DE COMPRAS</Text>
        </View>
  
        <FlatList 
          data={historic}
          keyExtractor={data => String(data.hora)}
          style={styles.productsList}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: data }) => (
            <TouchableOpacity 
              style={styles.productCard}
            >
              <View style={styles.cardView}>
                <View style={styles.tapSession}>
                  {data.evento_id == "-2" ? 
                    ( <Image source={copo} style={styles.tapBeer} /> ) :
                    (<></>)
                  }
                  {data.evento_id == "-1" ? 
                    ( <Image source={cart} style={{ width: 60, height: 60 }} /> ) :
                    (<></>)
                  }
                  {data.evento_id == "1" ?
                    ( <Image source={money} style={{ width: 60, height: 60}}/> ) :
                    (<></>)
                  }
                  {data.evento_id == "0" ?
                    ( <Image source={payment} style={{ width: 65, height: 65 }}/> ) :
                    (<></>) 
                  }
                </View>

                {data.evento_id == "-2" ? 
                  (
                    <View style={styles.textSession}>
                      <Text style={[{ fontFamily: 'sfpro-text-bold' }, styles.textHour]}>{data.hora}</Text>
                      <Text style={{ fontFamily: 'sfpro-text-bold', fontSize: 14, textAlign: 'center' }}>{data.descricao}</Text>
                      <Text style={[{ fontFamily: 'sfpro-rounded-bold' }, styles.textUp]}>DESCONTADO: R${data.carga}</Text>
                      <Text style={[{ fontFamily: 'sfpro-text-bold' }, styles.textDown]}>NOVO SALDO: R${data.saldo}</Text>
                    </View>
                    ) :
                  (
                    <View style={styles.textSession}>
                      <Text style={[{ fontFamily: 'sfpro-text-bold' }, styles.textHourCredit]}>{data.hora}</Text>
                      <Text style={[{ fontFamily: 'sfpro-text-bold' }, styles.textUp]}>CREDITADO: R${data.carga}</Text>
                      <Text style={[{ fontFamily: 'sfpro-text-bold' }, styles.textDown]}>NOVO SALDO: R${data.saldo}</Text>
                    </View>
                  )
                }
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

export default Historic;