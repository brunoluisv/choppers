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
  backButton: {
    position: 'relative',
    top: 60,
    right: 80
  }, 
  headerLogo: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain'
  },
  intro: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textIntro: {
    fontSize: 26,
    marginLeft: 10
  },
  inputSection: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 80
  },
  input: {
    marginTop: 20,
    textAlignVertical: 'bottom',
    width: 330,
    height: 55,
    borderBottomWidth: 1,
    borderColor: '#000',
    marginBottom: -22,
    fontSize: 20
  },
  textUp: {
    fontSize: 20,
    textAlign: 'center'
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 70,
    backgroundColor: '#000',
    height: 50, 
    width: 330,
    borderRadius: 30,
    justifyContent: 'center'
  },
  arrowIcon: {
    marginLeft: 14
  },
  buttonText: {
    fontSize: 20,
    color: '#FFF'
  }
});