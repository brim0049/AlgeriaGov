import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { FontSize, Color } from "../GlobalStyles";
const ExponentText = ({ children }) => (
    <View style={{ position: 'relative', top: -10 }}>
      <Text style={styles.plus}>{children}</Text>
    </View>
  );
const SplashScreen = () => {
  
    return (
        <LinearGradient
          style={styles.screen}
          locations={[0, 1]}
          colors={["#6d9886", "#1b4242"]}
          useAngle={true}
          angle={180}
        >
       
       <View style={styles.centerContent}>
          <Image
            style={styles.logo}
            resizeMode="cover"
            source={require("../assets/GovLogo.png")}
          />
          <Text style={ styles.textTypo}>
            <Text style={styles.d}>D</Text>
            <Text style={styles.jazar}>jazaïr</Text>
            <Text style={styles.d}>G</Text>
            <Text style={styles.jazar}>ov</Text>
            <ExponentText>+</ExponentText>

          </Text>
             </View>
        </LinearGradient>
      );
    };
    
    const styles = StyleSheet.create({
      centerContent: {
        
        justifyContent: "center",
            alignItems: "center", 
          },
      textTypo: {
        textAlign: "center",
        fontFamily: "Baloo-Regular",
        letterSpacing: 0,
        fontSize: FontSize.size_45xl,
        
      },
      logo: {
        width: 430,
        height: 400,
      },
      d: {
        color: Color.colorDarkslategray,
      },
      jazar: {
        color: Color.colorWhite,
      },

      screen: {
        flex: 1,
        width: "100%",
        overflow: "hidden",
        backgroundColor: "transparent",
      },
     
      plus: {
        fontFamily: "Baloo-Regular",
        fontSize: FontSize.size_45xl , 
        color: "#bb0622"
      },
    });
    

export default SplashScreen;
