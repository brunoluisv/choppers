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
    height: 120,
    marginTop: -40
  },
  headerLogo: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain'
  },
  continueSection: {
    marginTop: 350,
    width: 350,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    textAlign: 'center',
    fontSize: 26
  },
  button: {
    width: 200,
    height: 70,
    borderRadius: 20,
    backgroundColor: '#000',
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textButton: {
    fontSize: 20,
    color: '#FFF'
  }
});