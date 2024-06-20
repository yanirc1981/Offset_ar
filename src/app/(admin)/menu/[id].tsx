import { View, Text, Image, StyleSheet, Pressable} from "react-native";
import {Stack, useLocalSearchParams, useRouter, Link } from "expo-router";
import products from "@assets/data/products";
import { defaultPizzaImage } from "@/components/ProductListItem";
import { useState } from "react";
import Button from "@/components/Button";
import { useCart } from "@/providers/CartProvider";
import { PizzaSize } from "@/types";
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL']

const ProductDetailsScreen = () => {
    const { id } = useLocalSearchParams();
    const {addItem} = useCart();
    const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');
    const router = useRouter();
    
    const product = products.find((p)=> p.id.toString() === id)
    const addToCard = () =>{
        if(!product){
            return;
        }
      addItem(product, selectedSize);
      router.push('/cart')
    };

    if(!product){
        return<Text>Producto no encontrado</Text>
    }
    
    return (
        <View style={styles.contaner}>
             <Stack.Screen
        options={{
      title: 'Menu',
      headerRight: () => (
        <Link href={`/(admin)/menu/create?id=${id}`} asChild>
          <Pressable>
            {({ pressed }) => (
              <FontAwesome
                name="pencil"
                size={25}
                color={Colors.light.tint}
                style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
              />
            )}
          </Pressable>
        </Link>
      ),
      }}/>
            <Stack.Screen options={{ title: product.name}}/>
            <Image source={{uri: product.image || defaultPizzaImage}} style={styles.image}/>
            <Text style={styles.price}>${product.price}</Text>
            <Text style={styles.title}>${product.name}</Text>
            {/* <Button onPress={addToCard} text="Agregar"/> */}
        </View>
    );
};

const styles = StyleSheet.create({
    contaner:{
        backgroundColor:'white',
        flex:1,
        padding:10,
     },
    image:{
        width:'100%',
        aspectRatio:1,
    },
    price:{
        fontSize:18,
        fontWeight:'bold',
       
    },
    title:{
        fontSize:20,
        fontWeight:'bold',
    },
   
})

export default ProductDetailsScreen;