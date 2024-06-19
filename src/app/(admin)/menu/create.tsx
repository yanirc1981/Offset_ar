import { View, Text, StyleSheet, TextInput} from 'react-native'
import React from 'react'

const CreateProductScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre</Text>
      <TextInput style={styles.input} placeholder='Nombre producto'/>

      <Text style={styles.label}>Precio ($)</Text>
      <TextInput
       style={styles.input} 
       placeholder='99.99'
       keyboardType='numeric'
       />
    </View>
  )
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        padding:10,
    },
    label:{
        color:'gray',
        fontSize:16,
    },
    input:{
        backgroundColor:'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20,
    },
});

export default CreateProductScreen;