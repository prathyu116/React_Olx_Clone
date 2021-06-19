import React, { Fragment, useState,useContext } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { useHistory } from 'react-router-dom';
import { SpinnerRoundOutlined } from 'spinners-react';

import { AuthContext, FirebaseContext } from '../../store/FirebaseContext';

const Create = () => {
  const history=useHistory()
  const {firebase} = useContext(FirebaseContext)
  const {user} = useContext(AuthContext)
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const [isLoading,setIsLoading]=useState(false)
const date =new Date()

  const handleSubmit =()=>{
    setIsLoading(true)

    firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref})=>{
      ref.getDownloadURL().then((url)=>{
        firebase.firestore().collection('products').add({
         name,
        
         category,
         price,
         image:url,
         userId:user.uid,
         createdAt:date.toISOString()
       }).then(()=>{
       
        history.push("/")
        
        
    })
      })

    })
    

  }


  return isLoading ? (
  
    <div className='spinner'> 
      
      <SpinnerRoundOutlined size={90} thickness={176} speed={126} color="rgba(57, 172, 166, 1)" />
   
    
   
      
       
       </div>
      
     )
  :(
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              onChange={(e)=>setName(e.target.value)}
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              defaultValue="John"
              onChange={(e)=>setCategory(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" 
            onChange={(e)=>setPrice(e.target.value)}
            name="Price" />
            <br />
          </form>
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ' '}></img>
         
            <br />
            <input onChange={(e)=>{
              setImage(e.target.files[0])
             

            }} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
         
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
