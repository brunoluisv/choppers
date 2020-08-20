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
    marginBottom: 50
  },
  headerLogo: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain'
  },
  textUpSection: {
    alignItems: 'center'
  },
  textUp: {
    fontSize: 26
  },
  textDown: {
    fontSize: 26
  },
  animation: {
    height: 350
  },
  tapName: {
    fontSize: 34,
    color: '#fff'
  },
  tapSection: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100
  },
  cancel: {
    width: 300,
    height: 50,
    borderRadius: 400,
    borderWidth: 2,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  confirm: {
    width: 300,
    height: 50,
    borderRadius: 400,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    marginBottom: 30
  },
  textCancel: {
    fontSize: 20,
    color: '#000'
  },
  textConfirm: {
    fontSize: 20,
    color: '#FFF'
  },
  textOkSection: {
    marginTop: 40,
    marginBottom: -10
  },
  textOpenSection: {
    marginTop: 10,
    marginBottom: 100
  },
  textOk: {
    fontSize: 30,
    color: '#000'
  },
  loading: {
    alignItems: 'center'
  }
});