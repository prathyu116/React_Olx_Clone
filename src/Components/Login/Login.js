import React, { useState ,useContext} from 'react';
import {FirebaseContext} from '../../store/FirebaseContext'


import Logo from '../../olx-logo.png';
import './Login.css';
import {useHistory,Link} from 'react-router-dom'
function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err,setErr]=useState(false)
  const {firebase} = useContext(FirebaseContext)
  const history =useHistory()
  const handleLogin = (e)=>{
    
    e.preventDefault()
    firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
      history.push('/')
    }).catch((error)=>{
      setErr(true)
    })

  }
  

  return (
    
    <div>
    <div className="loginParentDiv">
      <img width="200px" height="200px" src={Logo}></img>
      {err &&  <p style={{color:'red'}}>Invalid UserName or Password</p> }
    
     
      <form onSubmit={handleLogin}>
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
        <label htmlFor="lname">Password</label>
        <br />
        <input
          className="input"
          type="password"
          id="lname"
          name="password"
          defaultValue="Doe"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
        />
        <br />
        <br />
        <button>Login</button>
      </form>
     
      <Link to='/signup'>Signup</Link>
    </div>
  </div>
  )
  
}

export default Login;
