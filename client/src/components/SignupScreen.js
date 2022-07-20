import react, { useContext, useEffect, useState } from 'react';
import '../Style.css';
import Container from 'react-bootstrap/Container';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/esm/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { Store } from '../Store';
const Signup = () => {
    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectUrl ? redirectUrl : '/';
    const [name,setName]=useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword,setconfirmPassword]=useState('');
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;
    const submitHandler = async (e) => {
        e.preventDefault();
        if(password!==confirmPassword)
        {
            toast.error('Password do not match');
            return;
        }
        try {
            const { data } = await axios.post('/api/users/signup', {
                name,
                email,
                password,
            });
            ctxDispatch({ type: 'USER_SIGNIN', payload: data })
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate(redirect || '/');
        } catch (error) {
            toast.error('Invalid email or password');

        }
    }
    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }


    }, [navigate, redirect, userInfo]);
    return (
        <div>
            <Container className="small-container">
                <Helmet>
                    <title>SignUp</title>
                </Helmet>
                <h1 className="my-3" style={{ textAlign: 'center' }}>Sign Up</h1>
                <Card className="sigin-card">
                    <Form onSubmit={submitHandler}>
                             <Form.Group className="mb-3" controlId="name" style={{ padding: '10px' }}>
                            <Form.Label><h6>Name</h6></Form.Label>
                            <Form.Control type="text" required onChange={(e) => setName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email" style={{ padding: '10px' }}>
                            <Form.Label><h6>Email</h6></Form.Label>
                            <Form.Control type="email" required onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password" style={{ padding: '10px' }}>
                            <Form.Label><h6>Password</h6></Form.Label>
                            <Form.Control type="password" required onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                             <Form.Group className="mb-3" controlId="confirmpassword" style={{ padding: '10px' }}>
                            <Form.Label><h6>ConfirmPassword</h6></Form.Label>
                            <Form.Control type="password" required onChange={(e) => setconfirmPassword(e.target.value)} />
                        </Form.Group>

                        <div className="mb-3" style={{ padding: '10px', textAlign: 'center' }}>
                            <Button type="submit" variant="danger"  ><h6>SignUp</h6></Button>
                        </div>
                        <div className="mb-3" style={{ padding: '10px', textAlign: 'center' }}>
                            Already have an account {''}
                            <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
                        </div>
                    </Form>
                </Card>
            </Container>
        </div>
    );
}
export default Signup;