import react from 'react';
import '../Style.css';
import Container from 'react-bootstrap/Container';
import {Helmet} from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/esm/Button';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
const SignIn=()=>{
    const {search}=useLocation();
    const redirectUrl=new URLSearchParams(search).get('redirect');
    const redirect=redirectUrl?redirectUrl:'/';
    return (
        <div>
            <Container className="small-container">
                 <Helmet>
                    <title>SignIn</title>
                 </Helmet>
                 <h1 className="my-3" style={{textAlign:'center'}}>Sign In</h1>
                 <Card className="sigin-card">
                 <Form>
                    <Form.Group className="mb-3" controlId="email" style={{padding:'10px'}}>
                        <Form.Label><h6>Email</h6></Form.Label>
                        <Form.Control type="email" required/>
                    </Form.Group>
                     <Form.Group className="mb-3" controlId="password" style={{padding:'10px'}}>
                        <Form.Label><h6>Password</h6></Form.Label>
                        <Form.Control type="password" required/>
                    </Form.Group>
                    <div className="mb-3" style={{padding:'10px',textAlign:'center'}}>
                            <Button type="submit" variant="danger"  ><h6>SignIn</h6></Button>
                    </div>
                    <div className="mb-3" style={{padding:'10px',textAlign:'center'}}>
                          New Customer {''}
                          <Link to={`/signup?redirect=${redirect}`}>Creat your account</Link>
                    </div>
                 </Form>
                 </Card>
            </Container>
        </div>
    );
}
export default SignIn;