import './App.css';
import Notelist from './components/NoteList';
import Notepad from './components/Notepad';
import Sidenavbar from './components/SideNavbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useState } from 'react';
import Login from './Login/Login';
import fireBase,{ auth }  from './server/firebase';
import {useAuthState} from 'react-firebase-hooks/auth';

function App() {

    const [yourName, setYourName] = useState(null);
    const [nameError, setNameError] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [hasAccount, setHasAccount] = useState(false);

    const clearInputs = ()=>{
      setEmail('');
      setPassword('');
      setEmailError('');
      setPasswordError('');
      setYourName('');
    }
    const clearErrors = ()=>{
      setEmailError('');
      setPasswordError('');
      setNameError(false);
    }
    
    const [user] = useAuthState(auth);

    const handleUserName=async ()=>{
      await auth.currentUser?.updateProfile({
        displayName: yourName
      })
    
    }

    const handleSignUp = async ()=>{
      clearErrors();
      if(yourName===null || yourName===''){
        setNameError(true);
        return;
      }
      await fireBase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(res=>console.log(res))
          .catch(err =>{
            switch(err.code){
              case "auth/email-already-in-use":
              case "auth/invalid-email":
                setEmailError(err.message);
                break;
              
                case "auth/weak-password":
                  setPasswordError(err.message);
                  break;
                default: break;
            }
          })
        await handleUserName();
        clearInputs();
    }
  

    const handleLogin = async ()=>{
      clearErrors();
      await fireBase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .catch(err =>{
            switch(err.code){
              case "auth/invalid-email":
              case "auth/user-disabled":
              case "auth/user-not-found":
                setEmailError(err.message);
                break;
              
                case "auth/wrong-password":
                  setPasswordError(err.message);
                  break;
                default: break;
            }
          })
          clearInputs();
    }
  
    const handleLogout = () =>{
      fireBase.auth().signOut();
    };

  if(!user){
    return (
      <Login
      email = {email}
      setEmail = {setEmail}
      password = {password}
      setPassword = {setPassword}
      emailError = {emailError}
      passwordError = {passwordError}
      handleLogin = {handleLogin}
      handleSignUp = {handleSignUp}
      hasAccount = {hasAccount}
      setHasAccount = {setHasAccount}
      clearInputs = {clearInputs}
      clearErrors = {clearErrors}
      setYourName={setYourName}
      yourName = {yourName}
      nameError = {nameError}
      />
    )
  }

  return (

    <Router>
    <div className="App">
      
      <Sidenavbar handleLogout={handleLogout}/>
      <Switch>
        <Route exact path="/" render={()=>{
          return (
            <Redirect to="/all-notes"/>
          )
        }}/>
        <Route path="/all-notes">
          <Notelist title="All Notes"/>
          <Route path="/all-notes/:id">
            <Notepad/>
          </Route>
        </Route>

        <Route path="/trash">
          <Notelist title="Trash"/>
          <Route path="/trash/:id">
            <Notepad/>
          </Route>
        </Route>
      </Switch> 
      

    </div>
    </Router>
  );
}

export default App;
