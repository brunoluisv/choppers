import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F7F7F7'
  },
  header: {
    width: 150,
    height: 120
  },
  headerLogo: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain'
  },
  backButton: {
    position: 'relative',
    top: 60,
    right: 80
  }, 
  intro: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  textIntro: {
    fontSize: 24,
    marginLeft: 20
  },
  productCard: {
    width: 350,
    height: 150,
    borderBottomWidth: 1,
    borderColor: '#CCC',
    marginBottom: 4
  },
  cardView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  tapSession: {
    width: 110,
    height: 110,
    backgroundColor: '#fff',
    marginTop: 25,
    marginLeft: 10,
    borderRadius: 55,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12
  },
  tapBeer: {
    height: 85,
    width: 85
  },
  textSession: {
    width: 210,
    alignItems: 'center',
    marginLeft: 20
  },
  productName: {
    textAlign: 'center',
    fontSize: 20,
    color: '#000',
    marginTop: 20
  },
  textUp: {
    textAlign: 'center',
    color: '#000',
    fontSize: 16,
    marginBottom: -8
  },
  textDown: {
    textAlign: 'center',
    color: '#000',
    fontSize: 16
  },
  textHour: {
    fontSize: 12, 
    borderWidth: 1, 
    borderColor: '#000', 
    backgroundColor: '#000', 
    color: '#FFF', 
    marginTop: 5,
    borderRadius: 10, 
    paddingLeft: 5, 
    paddingRight: 5, 
    marginLeft: 60, 
    marginBottom: 10
  },
  textHourCredit: {
    fontSize: 12, 
    borderWidth: 1, 
    borderColor: '#000', 
    backgroundColor: '#000', 
    color: '#FFF',  
    borderRadius: 10, 
    paddingLeft: 5, 
    paddingRight: 5, 
    marginLeft: 60,
    marginBottom: 10
  }
})
