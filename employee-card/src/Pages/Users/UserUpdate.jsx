import React, {useState, useEffect} from 'react'
import { Form,Row, Col, InputGroup, Card ,Tabs,Tab} from 'react-bootstrap'
import { database , auth} from '../../firebase';
import {  getDatabase,ref, child, push, update , onValue} from "firebase/database";
import { getStorage ,getDownloadURL,uploadBytes,ref as storageRef} from 'firebase/storage';
import { useNavigate, useParams } from 'react-router-dom';
import '../../assets/css/style.css';

const UserUpdate = () => {
    const {id} =useParams();
    const[error, setError] = useState(false);
    const[userId, setUserId] = useState('');
    const navigate=useNavigate();
    const[profileUrl, setprofileUrl] = useState(null);  
    const [step, setStep] = useState(1);
    const db = getDatabase();
    const [userValue, setUserValue] = useState(null);

    const nextStep = () => {
      setStep((prevStep) => prevStep + 1);
    };

    const prevStep = () => {
      setStep((prevStep) => prevStep - 1);
    };
    const [userData, setUserData] = useState({
        firstname:'',
        lastname:'',
        email:'',
        address:'',
        contact:'',
        img_url:'',
        linkedIn:'',
        twitter:'',
        instagram:'',
        facebook:'',
        role:'',
        company_name:''
    });
    const handleChange=(e)=>{
    const {name , value} = e.target;
        setUserData({
            ...userData,
            [name]:value
        })
    };
    const handleCreateData=(e)=>{
        e.preventDefault();
    };
    async function uploadFileAndPostUrl(file) {
        try {
            const storage = getStorage();
            const storageData = storageRef(storage, file.name); // Update the way of creating the reference
            // Upload the file to Firebase Storage
            await uploadBytes(storageData, file);
            // Get the file's download URL
            const fileUrl = await getDownloadURL(storageData);
            console.log('url', fileUrl)
            setprofileUrl(fileUrl)
            console.log("File URL posted to the database:", fileUrl);
        } catch (error) {
          console.error("Error uploading file and posting URL:", error);
        }
    }

    function writeNewPost( firstname, lastname, address, email, contact, img_url, company_name,role, twitter, instagram, facebook, linkedIn) {
        const db = getDatabase();
        const user = auth.currentUser;
        // A post entry.
        const postData = {
            firstname:firstname,
            lastname:lastname,
            address: address,
            email: email,
            contact: contact,
            img_url:img_url,
            role:role,
            company_name:company_name,
            twitter:twitter,
            linkedIn:linkedIn,
            instagram:instagram,
            facebook:facebook,
            created_at: new Date().toJSON()
        };
        // Get a key for a new Post.
        const newPostKey = push(child(ref(db), 'posts')).key;
        // Write the new post's data simultaneously in the posts list and the user's post list.
        setUserId(newPostKey)
        const updates = {};
        updates['/posts/' + userId] = postData;
        // updates['/user-posts/' + uid + '/' + newPostKey] = postData
        return update(ref(db), updates);
    }
  
    const handleSubmit = (e) => {
      e.preventDefault();
      writeNewPost( userData.firstname, userData.lastname, userData.address, userData.email, userData.contact, profileUrl, userData.company_name, userData.role, userData.twitter, userData.instagram, userData.facebook, userData.linkedIn);
      // Handle form submission logic here
      // You can access the form data using the state variables
    };
    
    useEffect(() => {
        const fetchPosts = async () => {
            const postsRef = ref(db, 'posts/' + id);
            const onDataUpdate = (snapshot) => {
                const postData = snapshot.val() !== null ? snapshot.val() : [];
                setUserValue(postData);
            };
            onValue(postsRef, onDataUpdate);
            // Clean up the listener when the component unmounts
            return () => {
                off(postsRef, onDataUpdate);
            };
        };
        fetchPosts();
    }, [db, id]);
  return (
    <div className="row">
      <div className="col-md-12 col-md-offset-3">
        <form id="msform">
          {/* progressbar */}
          <ul id="progressbar">
            <li className={step === 1 || step > 1 ? 'active' : ''}>Personal Details</li>
            <li className={step === 2 || step > 2 ? 'active' : ''}>Social Profiles</li>
            <li className={step === 3 ? 'active' : ''}>Account Setup</li>
          </ul>
          {/* fieldsets */}
          {step === 1 && (
            <fieldset>
              <h2 className="fs-title">Personal Details</h2>
              <h3 className="fs-subtitle">Tell us something more about you</h3>
              <input type="text" name="firstname" placeholder="First Name" onChange={handleChange}/>
              <input type="text" name="lastname" placeholder="Last Name" onChange={handleChange}/>
              <input type="text" name="contact" placeholder="Phone" onChange={handleChange}/>
              <button type="button" className="next action-button" onClick={nextStep}>
                NEXT
              </button>
            </fieldset>
          )}
          {step === 2 && (
            <fieldset>
              <h2 className="fs-title">Social Networks</h2>
              <h3 className="fs-subtitle">Your presence on the social network</h3>
              <input type="text" name="LinkedIn" placeholder="LinkedIn" onChange={handleChange}/>
              <input type="text" name="twitter" placeholder="Twitter" onChange={handleChange}/>
              <input type="text" name="insta" placeholder="Instagram" onChange={handleChange}/>
              <input type='text' name='facebook' placeholder='Facebook' onChange={handleChange} />
              <button type="button" className="previous action-button-previous" onClick={prevStep}>
              PREVIOUS
              </button>
              <button type="button" className="next action-button" onClick={nextStep}>
                NEXT
              </button>
            </fieldset>
          )}
          {step === 3 && (
            <fieldset>
              <h2 className="fs-title">Create your account</h2>
              <h3 className="fs-subtitle">Fill in your credentials</h3>
              <input type="text" name="email" placeholder="Email" onChange={handleChange}/>
              <input type="text" name="role" placeholder="Designation" onChange={handleChange}/>
              <input type="text" name="company_name" placeholder="Company" onChange={handleChange}/>
              <input type='file' name='img_url' onChange={(e) => uploadFileAndPostUrl(e.target.files[0])}/>
              <input type='text' name='address' placeholder='Address' />
              <button type="button" className="previous action-button-previous" onClick={prevStep}>
                PREVIOUS
              </button>
              <button type="submit" className="submit action-button" onClick={handleSubmit}>
                SUBMIT
              </button>
            </fieldset>
          )}
        </form>
        {/* link to designify.me code snippets */}
      </div>
    </div>
)
}

export default UserUpdate;
