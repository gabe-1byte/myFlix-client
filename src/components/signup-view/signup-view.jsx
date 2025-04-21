import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            name: username,
            password: password,
            email: email,
            birthday: birthday
        };

        fetch("https://movies-flix-project-g1byte-f2fe79db7991.herokuapp.com/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.ok) {
                alert("Registration successful! Please log in.");
                window.location.reload();
            } else {
                alert("Registration failed.");
            }
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

            <Form.Group controlId='formEmail'>
                <Form.Label className='FormFieldNames'>Email:</Form.Label>
                <Form.Control 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                />
            </Form.Group>

            <Form.Group controlId='formBirthday'>
                <Form.Label className='FormFieldNames'>Birthday:</Form.Label>
                <Form.Control
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)} 
                    required
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </form>
    );
};