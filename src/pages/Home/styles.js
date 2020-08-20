import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F7F7F7'
  },
  dataView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50
  },
  moldure: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: '#CCC',
    alignItems: 'center',
    justifyContent: 'center'
  },
  customerPicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 9,
    elevation: 16
  },
  cameraIcon: {
    width: 70,
    height: 70
  },
  customerName: {
    marginLeft: 30,
    fontSize: 20,
    marginTop: 15
  },
  customerCreditView: {
    marginTop: 25,
    alignItems: 'center'
  },
  partnerCard: {
    width: 340,
    height: 200,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#FFF'
  },
  balanceCard: {
    width: 220,
    height: 60,
    borderRadius: 20,
    backgroundColor: '#FFFF',
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ccc'
  },
  creditView: {
    marginLeft: 20
  },
  chooseView: {
    flexDirection: 'row'
  },
  choose: {
    width: 182,
    height: 120,
    margin: 7,
    borderRadius: 10
  },
  actionTextTaps: {
    fontSize: 18, 
    textAlign: 'center',
    position: 'absolute', 
    top: 60, 
    left: 10,
    width: 80,
    color: '#FFF'
  },
  iconTap: {
    height: 70, 
    width: 70, 
    position: 'absolute', 
    left: 100, 
    top: 10
  },
  actionTextMachine: {
    fontSize: 18, 
    textAlign: 'center',
    position: 'absolute', 
    top: 60,
    width: 120,
    color: '#FFF'
  },
  iconMachine: {
    height: 70, 
    width: 70, 
    position: 'absolute', 
    left: 112, 
    top: 10
  },
  actionTextTimer: {
    fontSize: 18, 
    textAlign: 'center',
    position: 'absolute', 
    top: 60,
    width: 100,
    left: 5,
    color: '#FFF'
  },
  iconTimer: {
    height: 70, 
    width: 70, 
    position: 'absolute', 
    left: 105, 
    top: 10
  },
  iconShop: {
    height: 80, 
    width: 80, 
    position: 'absolute', 
    left: 100
  }
});