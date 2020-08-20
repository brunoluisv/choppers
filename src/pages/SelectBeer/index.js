import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import api from '../../services/api';

import styles from './styles';

import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';

import choppersLogo from '../../assets/icons/choppers.jpeg'
import lista from '../../assets/icons/listacerveja.png';
import copo from '../../assets/icons/copo.png'

const SelectBeer = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);

  const navigateToTapBeer = (product) => {
    navigation.push('TapBeer', { 
      product: product,
      cpf: route.params.cpf,
      partner: route.params.partner,
      customer: route.params.customer
    });
  }

  const getProducts = async () => {
    const res = await api.get('/partner_info', {
      partner: route.params.partner.partner_id
    });

    const list = res.data.places[route.params.partner.place_id];
    setProducts(list.place_products);
  }

  let [fontsLoaded] = useFonts({
    'oswald-bold': require('../../assets/fonts/OswaldBold.ttf')
  });

  useEffect(() => {
    getProducts();
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
          <Image source={lista}/>
          <Text style={[{ fontFamily: 'oswald-bold'}, styles.textIntro]}>SELECIONE SUA CERVEJA</Text>
        </View>
  
        <FlatList 
          data={products}
          style={styles.productsList}
          keyExtractor={product => String(product.tap_id)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: product }) => (
            <TouchableOpacity 
              style={styles.productCard} 
              onPress={() => { navigateToTapBeer(product) }}
            >
              <View style={styles.cardView}>
                <View style={styles.tapSession}>
                  <Image source={copo} style={styles.tapBeer} />
                </View>
  
                <View style={styles.textSession}>
                  <Text style={[{ fontFamily: 'oswald-bold'}, styles.productName]}>{product.name}</Text>
                  <Text style={[{ fontFamily: 'oswald-bold'}, styles.textUp]}>IBU {product.ibu} Álcool {product.alc}</Text>
                  <Text style={[{ fontFamily: 'oswald-bold'}, styles.textDown]}>R$ {product.drink_price_L} 100ml</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

export default SelectBeer;