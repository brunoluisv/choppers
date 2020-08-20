import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    width: 150,
    height: 120
  },
  headerLogo: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
    marginTop: 20
  },
  intro: {
    flexDirection: 'row',
    marginTop: -20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textIntro: {
    fontSize: 26,
    marginLeft: 10
  },
  partnersList: {
    marginTop: 10
  },
  partnerCard: {
    width: 360,
    height: 210,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 5,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5
  },
  cardAvatar: {
    flexDirection: 'row'
  },
  logoMoldure: {
    width: 140,
    height: 100,
    borderRadius: 10
  },
  textPartnerInfo: {
    justifyContent: 'center', 
    alignItems: 'center', 
    width: 190
  },
  textName: {
    fontSize: 18,
    textAlign: 'center',
    marginLeft: 10
  },
  textStreet: {
    textAlign: 'center',
    marginLeft: 10,
    fontSize: 14
  },
  textPartnerLocation: {
    marginTop: 15, 
    alignItems: 'center'
  },
  textLocation: {
    textAlign: 'center',
    fontSize: 14
  },
  textKm: {
    fontSize: 12,
    marginTop: 8
  },
  sectionLogo: {
    width: 120,
    height: 120
  },
  partnerLogo: {
    width: 140,
    height: 100,
    borderRadius: 10
  }
});