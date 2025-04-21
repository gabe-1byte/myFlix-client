import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            name: username,
            password: password
        };

        console.log("Request payload:", data); // Log the payload

        fetch("https://movies-flix-project-g1byte-f2fe79db7991.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Login response:", data); // Log the successful response
                if (data.user) {
                    onLoggedIn(data.user, data.token);
                } else {
                    alert("No such user");
                }
            })
            .catch((e) => {
                console.error("Error during login:", e); // Log the error
                alert(e.message || "Something went wrong during login");
            });
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <Form.Group controlId='formUsername'>
                <Form.Label className='FormFieldNames'>Username:</Form.Label>
                <Form.Control 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="3"
                />
            </Form.Group>

            <Form.Group controlId='formPassword'>
                <Form.Label className='FormFieldNames'>Password:</Form.Label>
                <Form.Control 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </form>
    );
};