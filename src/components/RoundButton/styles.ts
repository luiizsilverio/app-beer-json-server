import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  buttonContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'dodgerblue', 
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16
    // position: 'absolute',    
    // right: 16,
    // bottom: 24
  },
  sombra_Android: {
    elevation: 10,
    shadowColor: 'black',    
  },
  sombra_IOs: {
    shadowColor: 'black',
    shadowOffset: {width: 7, height: 7},
    shadowRadius: 10,
    shadowOpacity: 1
  },
  pressionou: {
    right: 14,
    bottom: 22
  }
})
