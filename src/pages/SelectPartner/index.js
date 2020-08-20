import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import * as Location from 'expo-location';
import { Entypo } from '@expo/vector-icons';

import styles from './styles';

import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import Spinner from 'react-native-loading-spinner-overlay';

import choppersLogo from '../../assets/icons/choppers.jpeg';
import locationIcon from '../../assets/icons/location.png';

const SelectPartner = () => {
  const navigation = useNavigation();
  const [partners, setPartners] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const getDistanceInKm = async (pos1, pos2) => {
    var deg2rad = function (deg) { return deg * (Math.PI / 180); },
    R = 6371,
    dLat = deg2rad(pos2.lat - pos1.lat),
    dLng = deg2rad(pos2.lng - pos1.lng),
    a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
        + Math.cos(deg2rad(pos1.lat))
        * Math.cos(deg2rad(pos1.lat))
        * Math.sin(dLng / 2) * Math.sin(dLng / 2),
    c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return ((R * c *1000).toFixed());
  }

  const getPartners = async () => {
    let { status } = await Location.requestPermissionsAsync();
    
    setLoading(true);
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
    }
    let loc = await Location.getCurrentPositionAsync({});
    
    const res = await api.get('/place_list');
    const arr = [];
    for(partner of res.data) {
      if(loc.coords.latitude && loc.coords.longitude && partner.place_lat && partner.place_long) {
        const partnerPos = {
          lat: partner.place_lat,
          lng: partner.place_long
        }
  
        const userPos = {
          lat: loc.coords.latitude,
          lng: loc.coords.longitude
        }

        let distance = await getDistanceInKm(partnerPos, userPos)/1000;
        partner.distance = distance.toFixed(2);
        arr.push(partner);
      }else {
        partner.distance = null;
        arr.push(partner);
      }
    }

    arr.sort((a,b) => {
      return (b.distance != null) - (a.distance != null) || a.distance - b.distance;
    })

    setLoading(false);
    setPartners(arr);
  }

  const navigateToCpfForm = (partner) => {
    navigation.push('CpfForm', {
      partner
    });
  }

  let [fontsLoaded] = useFonts({
    'oswald-bold': require('../../assets/fonts/OswaldBold.ttf'),
    'sfpro-rounded-bold': require('../../assets/fonts/SFProRoundedBold.otf'),
    'sfpro-text-semibold': require('../../assets/fonts/SFProTextSemibold.otf'),
    'sfcompact-text-regular': require('../../assets/fonts/SFCompactTextRegular.otf')
  });

  useEffect(() => {
    getPartners();
  }, []);

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
        <View style={styles.intro}> 
          <Image source={locationIcon}/>
          <Text style={[{ fontFamily: 'oswald-bold' }, styles.textIntro]}>SELECIONE SEU LOCAL</Text>
        </View>
        
        <FlatList 
          data={partners}
          style={styles.partnersList}
          keyExtractor={partner => String(partner.place_id)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: partner }) => (
            <TouchableOpacity 
              style={styles.partnerCard} 
              onPress={() => { 
                setLoading(true);
                navigateToCpfForm(partner);
                setLoading(false);
              }}
            >
              <View style={styles.cardAvatar}>
                <View style={{marginTop: 20}}>
                  {partner.place_card_art ? (
                    <Image source={{uri: partner.place_card_art}} style={styles.partnerLogo}/>
                  ) : (
                    <>
                      <View style={styles.logoMoldure} />
                    </>
                  )}
                </View>
                <View style={styles.textPartnerInfo}>
                  <Text style={[{ fontFamily: 'sfpro-text-semibold' }, styles.textKm]}><Entypo name='location-pin' size={18}  color="#000"/>{partner.distance} km de distância</Text>
                  <Text style={[{ fontFamily: 'sfpro-rounded-bold' }, styles.textName]}>{partner.place_name}</Text>
                  <Text style={[{ fontFamily: 'sfpro-text-semibold' }, styles.textStreet]}>{partner.place_street}</Text>
                </View>
              </View>
                
              <View style={styles.textPartnerLocation}>              
                <Text style={[{ fontFamily: 'sfcompact-text-regular' }, styles.textLocation]}>{partner.place_city} - {partner.place_state}</Text>
                <Text style={[{ fontFamily: 'sfcompact-text-regular' }, styles.textLocation]}>{partner.place_city} - {partner.place_cep}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

export default SelectPartner;