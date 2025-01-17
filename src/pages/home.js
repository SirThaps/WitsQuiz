import { db } from "../config/firebase";
import{ ref, onValue } from "firebase/database";
import { useNavigate } from "react-router-dom";
import React , { useEffect } from "react";
import { useState } from "react";
import {auth} from "../config/firebase"
import 'firebase/auth';


export let Timevalue = '';
export let TittleValue = '';

export const setValueTitle = (newTittleValue ) => {
  //Timevalue = newTimeValue;
  TittleValue = newTittleValue;
};
export const setValueTime = (newTimeValue ) => {
  Timevalue = newTimeValue;
 // TittleValue = newTittleValue;
};


export const Home =()=> {
//Main method returns layout of html home page
const [data, setData] = useState([]);
const navigate = useNavigate();


// let setTime = "01:00";
// let settitle = "Math Quiz";

const [getTimer , setTime] = useState(Timevalue);
const[quiztit ,settitle]= useState(TittleValue);

const getData = () => {
  const dataRef = ref(db, '/quizlist') // CHANGE 'chars' TO YOUR DATABASE NAME
  onValue(dataRef, (snapshot) => {
    if(snapshot.exists()){
      setData(snapshot.val());
  
    }else{
      console.log("No data available")
    }
  });
};
useEffect(() => {
  getData()
}, []);

const [currentUser, setCurrentUser] = useState(null);

const getQuiz_ = () => {
  const unsubscribe = auth.onAuthStateChanged((user) => {
    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }
  });

    }
    useEffect(() => {
      getQuiz_()
    }, []);
   

      const checkLoginStatus = (val1 ,val2) => {
        setTime(val1);
        settitle(val2);
        if (currentUser) {
          navigate("/viewquiz")
        } else {
          navigate("/login")
        }
      };
   
  return (
    <div>
    <h1 data-testid = "main-1">WitsQuiz Home Page</h1>
    <img src={"/logo2.jpg"} alt = "/logo1.jpg" width="600" height="600" />
    <h3>Available Quizzes</h3>
    
      
      {data &&
        Object.entries(data).map(([id, value]) => (
          <div key={id}>
            <button
              className="first"
              onClick={() => {
                checkLoginStatus( value.timer ,value.quizTitle);
              }}
            >
              {value.quizTitle}
              <p>Duration: {value.timer}</p>
            </button>
          </div>
        ))}
    </div>
  );   
 }
export default Home;

