import { View,Text, TouchableOpacity } from "react-native";

export default function HowToUse({navigation}){
    return (
        <View style={styles.container}>
            <Text style={styles.txt}>Start off easy and set small goals.  
            {"\n"}{"\n"}Then, if these goals are still hard to acheive, set an even smaller goal- 
            maybe one that you can do right now! Instead of 150 push ups. Go for 10! </Text>
            <TouchableOpacity onPress={()=> navigation.navigate('Workout')}>
                <View style={styles.btn_container}><Text style={styles.btn}>Get Started</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}
const styles={
    container: {
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    },
    txt: {
        fontSize:15,
        width:280,
        height:400,
        letterSpacing:2,
        lineHeight:50,
        margin:10
    },
    btn: {
        fontSize:19
    },
    btn_container: {
        width:200,
        height:65,
        backgroundColor:"rgb(0,220,140)",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:40,
        marginTop:50
    }
}