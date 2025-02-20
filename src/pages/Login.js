import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import {Navigate, Link} from 'react-router-dom'; 
import UserContext from '../context/UserContext'
import { Notyf } from 'notyf';
 
export default function Login() {
	const notyf = new Notyf();

	const { user, setUser } = useContext(UserContext);

	const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isActive, setIsActive] = useState(true);


	function authenticate(e) {


        e.preventDefault();
		fetch(`https://blogapp-server-1-uj1f.onrender.com/users/login`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({

				email: email,
				password: password

			})
		})
		.then(res => res.json())
		.then(data => {

			if(data.access !== undefined){

				console.log(data.access);

				localStorage.setItem('token', data.access);
				retrieveUserDetails(data.access);


				setEmail('');
				setPassword('');
				
				notyf.success('Successful Login');

			} else if (data.message === "Incorrect email or password") {

				notyf.error('Incorrect Credentials. Try Again');

			} else {

				notyf.error('User Not Found. Try Again.');

			}
		})

    }

    function retrieveUserDetails(token){
            
        fetch(`https://blogapp-server-1-uj1f.onrender.com/users/details`, {
    		headers: {
    			Authorization: `Bearer ${ token }`
    		}
        })
        .then(res => res.json())
        .then(data => {

        	console.log(data);

            setUser({
              id: data._id,
              isAdmin: data.isAdmin
            });

        })

    };

	useEffect(() => {

	        if(email !== '' && password !== ''){
	            setIsActive(true);
	        }else{
	            setIsActive(false);
	        }

	    }, [email, password]);

	    return (
	    	(user.id !== null) ?
	    		<Navigate to="/" />
	    		:
		        <Form onSubmit={(e) => authenticate(e)}>
		        	<h1 className="my-5 text-center">Login</h1>
		            <Form.Group>
		                <Form.Label>Email address</Form.Label>
		                <Form.Control 
		                    type="email" 
		                    placeholder="Enter email" 
		                    required
		                    value={email}
		        			onChange={(e) => setEmail(e.target.value)}
		                />
		            </Form.Group>

		            <Form.Group className="mb-3">
		                <Form.Label>Password</Form.Label>
		                <Form.Control 
		                    type="password" 
		                    placeholder="Password" 
		                    required
		                    value={password}
		        			onChange={(e) => setPassword(e.target.value)}
		                />
		            </Form.Group>

		            { isActive ? 
		            	<div className="d-flex justify-content-center my-5">
		                <Button variant="primary" type="submit" id="loginBtn">
		                    Login
		                </Button>
		                </div>
		                : 
		               	<div className="d-flex justify-content-center my-5">
		                <Button variant="danger" type="submit" id="loginBtn" disabled>
		                    Login
		                </Button>
		                </div>
		            }
		            <p className="text-center">Don't have an account? you can <Link to="/register">register</Link> here</p>
	        	</Form>

	    )
	}