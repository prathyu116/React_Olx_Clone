import React, { useState,useContext } from 'react';
import { SpinnerRoundOutlined } from 'spinners-react';
import validator from 'validator';
import Logo from '../../olx-logo.png';
import { FirebaseContext} from '../../store/FirebaseContext';
import './Signup.css';
import {useHistory,Link} from 'react-router-dom'


export default function  Signup() {
  const history =useHistory()
  const [username,setUsername]=useState('')
  const [email,setEmail]=useState('')
  const [phone,setPhone]=useState('')
  const [password,setPassword]=useState('')
  const [isLoading,setIsLoading]=useState(false)
  const [errorMessage, setErrorMessage] = useState('')


  const validate = (value) => {
  
    if (validator.isStrongPassword(value, {
      minLength: 8, minLowercase: 1,
      minUppercase: 1, minNumbers: 1, minSymbols: 1
    })) {
      setErrorMessage('Is Strong Password')
    } else {
      setErrorMessage('Is Not Strong Password')
    }
  }
  

const {firebase} =useContext(FirebaseContext)
const handleSubmit = (e) =>{
  setIsLoading(true)


  e.preventDefault()
  firebase.auth().createUserWithEmailAndPassword(email, password).then((result) => { 
    result.user.updateProfile({displayName:username}).then(()=>{
      
      firebase.firestore().collection('users').add({
        id:result.user.uid,
        username:username,
        phone:phone
      }).then(()=>{
       
          history.push("/login")
          
          
      })
    })
  })
  
}

  return isLoading ? (
  
 <div className='spinner'> 
   
   <SpinnerRoundOutlined size={90} thickness={176} speed={126} color="rgba(57, 172, 166, 1)" />

 

   
    
    </div>
   
  ):  (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            id="fname"
            name="name"
            defaultValue="John"
            required
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            defaultValue="Doe"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            required
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
            value={password}
            onChange={(e)=>{setPassword(e.target.value);  validate(e.target.value)}}
            required
          />
          <br />
           <p style={{fontSize:'10px'}}>
          ( minLength: 8, minLowercase: 1, minUppercase: 1,
           minNumbers: 1, minSymbols: 1 )
     
             </p> 
      <br/>
          <span style={{
          fontWeight: 'bold',
          color: `${errorMessage==='Is Not Strong Password' ? 'red': 'green'}`,
        }}>{errorMessage}</span>
          <br />
          <button>Signup</button>
        </form>
        <Link to='/login'>Allready have an account ??</Link>
      </div>
    </div>
  );
}
