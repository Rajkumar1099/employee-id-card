import React, {useState, useEffect} from 'react'
import { Form,Row, Col, InputGroup, Card ,Tabs,Tab} from 'react-bootstrap'
import { database , auth} from '../../firebase';
import {  getDatabase,ref, child, push, update , onValue,off} from "firebase/database";
import { getStorage ,getDownloadURL,uploadBytes,ref as storageRef} from 'firebase/storage';
import { useNavigate, useParams } from 'react-router-dom';
import '../../assets/css/style.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../Redux/User/Action';

const UserUpdate = () => {
    const {id, steps} =useParams();
    let userData = sessionStorage.getItem('userData');
    userData = JSON.parse(userData);
    const userRole = userData !== null ? userData.userRole : null
    const [firstname, setFirstName]=useState('')
    const [lastname, setLastName] =useState('')
    const [email,setEmail] = useState('')
    const [contact, setContact] =useState('')
    const [linkedIn, setLinkedIn] =useState('')
    const [twitter, setTwitter] =useState('')
    const [facebook, setFacebook] =useState('')
    const [insta, setInsta] =useState('')
    const [address, setAddress] =useState('')
    const [role, setRole] =useState('')
    const [company, setCompany] =useState('')

    const navigate=useNavigate();
    const [profileUrl, setprofileUrl] = useState(null);
    const [step, setStep] = useState(1);

    const nextStep = () => {
      setStep((prevStep) => prevStep + 1);
    };

    const prevStep = () => {
      setStep((prevStep) => prevStep - 1);
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

    function updateCard() {
        const db = getDatabase();
        const user = auth.currentUser;
        // A post entry.
        const postData = {
            firstname:firstname,
            lastname:lastname,
            address: address,
            email: email,
            contact: contact,
            // img_url:profileUrl,
            role:role,
            company_name:company,
            twitter:twitter,
            linkedIn:linkedIn,
            insta:insta,
            facebook:facebook,
            created_at: new Date().toJSON()
        };
        const newPostKey = push(child(ref(db), 'posts')).key;
        const updates = {};
        updates['/posts/' + id] = postData;
        return update(ref(db), updates);
    }

    const handleSubmit = (e) => {
      e.preventDefault();
        updateCard();
        if(userRole==='admin')
        {
            navigate(`/vcard/${id}`)
        }
        if(userRole ==='customer')
        {
            navigate(`/user/details/${id}`)
        }
    };
    
    useEffect(()=>{
        const db=getDatabase();
        const fetchPosts = async () => {
            const postsRef = ref(db, 'posts/' + id);
            const onDataUpdate = (snapshot) => {
                const postData = snapshot.val() !== null ? snapshot.val() : [];
                setFirstName(postData.firstname)
                setLastName(postData.lastname)
                setEmail(postData.email)
                setLinkedIn(postData.linkedIn)
                setContact(postData.contact)
                setAddress(postData.address)
                setContact(postData.contact)
                setTwitter(postData.twitter)
                setFacebook(postData.facebook)
                setInsta(postData.insta)
                setCompany(postData.company_name)
                setRole(postData.role)
            };
            onValue(postsRef, onDataUpdate);
            return () => {
              off(postsRef, onDataUpdate);
            };
          };
          fetchPosts();
    },[])
    useEffect(()=>{
        if( steps > 1 || steps > 3) {
            setStep(steps-1);
            nextStep();
          }
    },[])
  return (
    <div className="row" style={{height:'100vh', paddingTop:'40px'}}>
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
              <input type="text" name="firstname" placeholder="First Name" value={firstname || ''}  onChange={(e)=>setFirstName(e.target.value)}/>
              <input type="text" name="lastname" placeholder="Last Name"  value={lastname || ''} onChange={(e)=>setLastName(e.target.value)} />
              <input type="text" name="contact" placeholder="Phone" value={contact || ''} onChange={(e)=>setContact(e.target.value)}/>
              <button type="button" className="next action-button" onClick={nextStep}>
                NEXT
              </button>
            </fieldset>
          )}
          {step === 2 && (
            <fieldset>
              <h2 className="fs-title">Social Networks</h2>
              <h3 className="fs-subtitle">Your presence on the social network</h3>
              <input type="text" name="linkedIn" placeholder="LinkedIn" value={linkedIn || ''} onChange={(e)=>setLinkedIn(e.target.value)}/>
              <input type="text" name="twitter" placeholder="Twitter" value={twitter} onChange={(e)=>setTwitter(e.target.value)}/>
              <input type="text" name="insta" placeholder="Instagram" value={insta} onChange={(e)=>setInsta(e.target.value)}/>
              <input type='text' name='facebook' placeholder='Facebook' value={facebook} onChange={(e)=>setFacebook(e.target.value)} />
              {/* <input type='text' name='thread' placeholder='Thread' value={thread} onChange={(e)=>set(e.target.value)} /> */}
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
              <input type="text" name="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
              <input type="text" name="role" placeholder="Designation" value={role} onChange={(e)=>setRole(e.target.value)}/>
              <input type="text" name="company_name" placeholder="Company" value={company} onChange={(e)=>setCompany(e.target.value)}/>
              {/* <input type='file' name='img_url' value={} onChange={(e) => uploadFileAndPostUrl(e.target.files[0])}/> */}
              <input type='text' name='address' placeholder='Address' value={address || ''} onChange={(e)=>setAddress(e.target.value)} />
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
