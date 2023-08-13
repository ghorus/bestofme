import * as SQLite from 'expo-sqlite'
import { KeyboardAvoidingView, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { useState,useEffect } from 'react'
import { Dimensions,Keyboard } from 'react-native'
export default function SetWrkOut({navigation,route}){
    const db = SQLite.openDatabase('example12.db')
    const [workouts,setWorkouts] = useState([])
     // I WANNA USE THIS
     const [selectedButton, setSelectedButton] = useState("")
     const [numReps,setNumReps] = useState()
     const reps = () => {
         console.log(selectedButton,numReps)
     }
     //
    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS Workouts (ID INTEGER PRIMARY KEY AUTOINCREMENT, workout TEXT,rep INTEGER, currRep INTEGER)')
        });
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM Workouts',null,
            (txObj, resultSet) => setWorkouts(resultSet.rows._array),
            (txObj,error) => console.log(error));
        });
    },[])
    const addWorkout = () => { 
      if (selectedButton == ""){
        alert("You need to choose a workout. Please pick one.")
      }
      else if (numReps == undefined || numReps == ""){
        alert("Please specify number of repetitions for this workout.")
      }
      else {
    //   console.log(workouts)
        db.transaction(tx => {
        tx.executeSql('INSERT INTO Workouts (workout,rep,currRep) VALUES (?,?,?)', [selectedButton,Number(numReps),Number(0)],
        (txObj, resultSet) => {
            let existingNames = [...workouts];
            existingNames.push({ID: resultSet.insertId, workout: selectedButton, rep:Number(numReps),currRep:Number(0)});
            setWorkouts(existingNames)
        },
        (txObj,error) =>console.log(error)
            )
        });}
    }

    const deleteWorkout = (id) => {
        db.transaction(tx => {
            tx.executeSql('DELETE FROM Workouts WHERE ID = ?', [id],
            (txObj, resultSet) => {
                if (resultSet.rowsAffected > 0){
                    let existingNames = [...workouts].filter(workout => workout.ID !== id);
                    setWorkouts(existingNames);
                }
            },
            (txObj, error) => console.log(error)
            )
        })
    }
    
    const updateWorkout = (wrkOut) => {
        db.transaction(tx => {
            tx.executeSql('UPDATE Workouts SET currRep = ? WHERE ID = ?', [wrkOut.currRep + 1, wrkOut.ID],
            (txObj,resultSet) => {
                if (resultSet.rowsAffected > 0){
                    let existingNames = [...workouts]
                    const indextoUpdate = existingNames.findIndex(wo => wo.ID === wrkOut.ID)
                    existingNames[indextoUpdate].currRep = existingNames[indextoUpdate].currRep + 1
                    console.log(existingNames[indextoUpdate])
                    setWorkouts(existingNames)
                }
            },
            (txObj, error) => console.log(error))
        });
        if (wrkOut.currRep >= wrkOut.rep-1){deleteWorkout(wrkOut.ID)}
    }

    const showWorkouts =() => {
        const [pressed,setPressed]=useState()
        const styl = {
            pr: { width:windowWidth -30},
            nPr: {width:windowWidth -30},
            hide: { display:"none"},
            show: {display:"normal"}
        }

        return workouts.map((wo,index) => {
            return (
                <View key={index} style={styles.wo_cont}>
                    <TouchableOpacity onPress={() => setPressed(wo.ID)}><View><Text style={{fontSize:20,textAlign:'center'}}>{wo.currRep}/{wo.rep} {wo.workout}</Text>
                    <TouchableOpacity style={pressed==wo.ID ? styl.show:styl.hide} onPress={() => updateWorkout(wo)}><View style={styles.workout_btn_cont}><Text>Do a Rep</Text></View></TouchableOpacity>
                    <TouchableOpacity style={pressed==wo.ID ? styl.hide:styl.show} onPress={() => deleteWorkout(wo.ID)}><View style={styles.btn_cont}><Text >Delete</Text></View></TouchableOpacity>
                    <TouchableOpacity style={styl.show} onPress={() => {setPressed(wo.ID)}}><View style={styles.btn_cont}></View></TouchableOpacity>
                    </View></TouchableOpacity>
                    </View>)
        })
    }
  
    return (
        
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={styles.container}>
                <View>
                    <ScrollView style={{height:windowHeight/2.5}}>{showWorkouts()}</ScrollView>
                    <KeyboardAvoidingView behavior='padding'>
                        <ScrollView>
                            <View style={styles.choose}>
                                <Text style={{fontSize:20,fontWeight:"bold",margin:5}}>Choose a Workout:</Text>
                                <TouchableOpacity onPress={() => setSelectedButton("Push Ups")}>
                                <View style={selectedButton == "Push Ups" ? styles.btn_cont:styles.btn_cont2}><Text>Push Ups</Text></View></TouchableOpacity>
                                <TouchableOpacity onPress={() => setSelectedButton("Sit Ups")}>
                                <View style={selectedButton == "Sit Ups" ? styles.btn_cont:styles.btn_cont2}><Text>Sit Ups</Text></View></TouchableOpacity>
                            <Text style={{fontSize:20,fontWeight:"bold",margin:5}}>Desired Repetitions</Text>
                            <TextInput style={styles.reps} keyboardType='numeric' onChangeText={setNumReps}></TextInput>
                            <TouchableOpacity style={styles.btn} onPress={addWorkout}><View><Text>Add Workout</Text></View></TouchableOpacity>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
        </TouchableWithoutFeedback>

    )
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = {
    choose: {
        borderWidth:1,
        borderRadius:10,
        margin:5,
        padding:10,
        backgroundColor:"aquamarine",
        justifyContent:"center",
        textAlign:"center",
        alignItems:"center"
        
    },
    reps: {
        height:50,
        width:100,
        borderWidth:1,
        borderRadius:40,
        borderStyle:"solid",
        textAlign:"center"
     },
    container: {
        flex:1,
        width:windowWidth,
        justifyContent:"center",
        alignItems:"center",
        height:"100%"
    },
    wo_cont: {
        borderWidth:1,
        borderRadius:10,
        padding:10,
        margin:5,
        alignItems:"center",
        justifyContent:"center"
    },
    btn_cont: {
        height: 50,
        width: 200,
        borderWidth:1,
        borderRadius:40,
        justifyContent:"center",
        alignItems:"center",
        margin:5
    },
    btn_cont2: {
        height: 50,
        width: 200,
        justifyContent:"center",
        alignItems:"center"
    },
    btn: {
        height: 50,
        width: 200,
        borderWidth:1,
        borderRadius:40,
        justifyContent:"center",
        alignItems:"center",
        margin:10,
        backgroundColor:"white",
    },
    workout_btn_cont: {
        height: 150,
        width: 200,
        borderWidth:1,
        borderRadius:40,
        justifyContent:"center",
        alignItems:"center",
        margin:5
    },
}
