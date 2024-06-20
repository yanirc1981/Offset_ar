import { View, Text, StyleSheet, TextInput, Image, Alert} from 'react-native'
import React, {useState} from 'react';
import Button from '@/components/Button';
import { defaultPizzaImage } from '@/components/ProductListItem';
import Colors from '@/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams } from 'expo-router';

const CreateProductScreen = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [error, setErrors] = useState('');
    const [image, setImage] = useState<string | null>(null);

    const { id } = useLocalSearchParams();
    const isUpdating = !!id;

    const resetFields =()=>{
        setName('');
        setPrice('');
    };

    const validateInput = () =>{
        setErrors('');
      if(!name){
        setErrors('Nombre requerido');
        return false
      } 
      if(!price){
        setErrors('Falta precio');
        return false;
      } 
      if(isNaN(parseFloat(price))){
        setErrors('No es un número');
        return false
      }
      return true;
    };

    const onSubmit = () =>{
        if(isUpdating){
            onUpdateCreate();
        }else{
            onCreate();
        }
    };

    const onCreate = () =>{
        if (!validateInput()){
            return;
        }
    console.warn('creando producto', name)
   //se guarda en DB
        resetFields();
    };

    const onUpdateCreate = () =>{
        if (!validateInput()){
            return;
        }
    console.warn('actualizando producto', name)
   //se guarda en DB
        resetFields();
    };


    const pickImage = async ()=>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect:[4, 3],
            quality: 1,
        });
        
        if(!result.canceled){
            setImage(result.assets[0].uri);
        }
    };
    const onDelete = () =>{
        console.warn('ELIMINAS???')
    }
    const confirmDelete = () =>{
        Alert.alert('Confirma', 'Seguro quieres eliminar este producto?',[
        {
            text: 'Cancelar',
        },
        {
            text: 'Eliminar',
            style: 'destructive',
            onPress: onDelete,
        },
    ])
    }

  return (
    <View style={styles.container}>
    <Stack.Screen options={{title: isUpdating ? 'Update Product': "Crear producto"}}/>
    <Image source={{uri: image || defaultPizzaImage}} style={styles.image} />
    <Text onPress={pickImage} style={styles.textButton}>Seleccione imagen</Text>
      <Text style={styles.label}>Nombre</Text>
      <TextInput
       value={name}
       onChangeText={setName} 
       style={styles.input} 
       placeholder='Nombre producto'
       />

      <Text style={styles.label}>Precio ($)</Text>
      <TextInput
       value={price}
       onChangeText={setPrice}
       style={styles.input} 
       placeholder='99.99'
       keyboardType='numeric'
       />
        <Text style={{color:'red'}}>{error}</Text>
       <Button onPress={onSubmit} text={isUpdating ? 'Modificar' : 'Crear'}/>
        {isUpdating && (
            <Text onPress={confirmDelete} style={styles.textButton}>
                Eliminar
            </Text>
        )}
    </View>
  );
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
    image:{
        width:'50%',
        aspectRatio:1,
        alignSelf:'center',
    },
    textButton:{
        alignSelf:'center',
        fontWeight:'bold',
        color:Colors.light.tint,
        marginVertical:10,
    },
});

export default CreateProductScreen;