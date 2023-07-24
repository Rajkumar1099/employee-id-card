import React, {useState, useEffect} from 'react'
import { Form,Row, Col, InputGroup } from 'react-bootstrap'
import { database } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const UserUpdate = () => {
    const[error, setError] = useState(false);
    const[userId, setUserId] = useState('');
    const navigate=useNavigate()
    const[profileUrl, setprofileUrl] = useState(null)
    const [userData, setUserData] = useState({
        username:'',
        email:'',
        address:'',
        contact:'',
        whats_app:'',
        img_url:'',
        password:'',
        role:'',
        company_name:''
    })
    const handleChange=(e)=>{
    const {name , value} = e.target;
        setUserData({
            ...userData,
            [name]:value
        })
    }
    const handleCreateData=(e)=>{
        e.preventDefault();
        console.log(userData);
        createUser( userData.email,userData.password, userData.contact);
    }
    const updateUsers=()=>{

    }
  return (
    <Col xs={12} sm={6} md={6} lg={6}>
    <div className='h4'> Create Id Card</div>
    <Form>
        <InputGroup size="sm" className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-sm">User Name</InputGroup.Text>
        <Form.Control
            type='test'
            name='username'
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            onChange={handleChange}
        />
        </InputGroup>
        <br />
        <InputGroup size="sm" className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-sm">User email</InputGroup.Text>
        <Form.Control 
            type="email"
            name='email'
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            onChange={handleChange}
        />
        </InputGroup>
        <br />
        <InputGroup size="sm" className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-sm">Contact</InputGroup.Text>
        <Form.Control
            type='number'
            name='contact'
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            onChange={handleChange}
        />
        </InputGroup>
        <br />
        <InputGroup size="sm" className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-sm">Whats App</InputGroup.Text>
        <Form.Control
            type='number'
            name='whats_app'
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            onChange={handleChange}
        />
        </InputGroup>
        <br />
        <InputGroup size="sm" className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-sm">Address</InputGroup.Text>
        <Form.Control
            type='textarea'
            name='address'
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            onChange={handleChange}
        />
        </InputGroup>
        <br />
        <InputGroup size="sm" className="mb-3">
        <Form.Control
            type='file'
            name='img_url'
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            onChange={(e) => uploadFileAndPostUrl(e.target.files[0])}
        />
        </InputGroup>
        <br />
        <InputGroup size="sm" className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-sm">Designation</InputGroup.Text>
        <Form.Control
            type='text'
            name='role'
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            onChange={handleChange}
        />
        </InputGroup>
        <br/>
        <InputGroup size="sm" className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-sm">Company</InputGroup.Text>
        <Form.Control
            type='text'
            name='company_name'
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            onChange={handleChange}
        />
        </InputGroup>
        <br/>
        <InputGroup size="sm" className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-sm">Password</InputGroup.Text>
        <Form.Control
            type='password'
            name='password'
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            onChange={handleChange}
        />
        </InputGroup>
        <br/>
        <Row>
        <Col xs={12} sm={6} md={6} lg={6}>
            <div className='btn btn-primary w-100 m-2' onClick={(e)=>handleCreateData(e)}>Save</div>
        </Col>
        <Col xs={12} sm={6} md={6} lg={6}>
            <div className='btn btn-primary w-100 m-2' onClick={()=>{navigate('/admin/vcard')}}>Cancel</div>
        </Col>
        </Row>
    </Form>
</Col>
)
}

export default UserUpdate