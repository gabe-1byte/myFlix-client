import React from 'react';
import { useState } from 'react';

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
            .then(async (response) => {
                console.log("Response status:", response.status); // Log the response status
                const responseData = await response.json().catch(() => null); // Handle invalid JSON
                console.log("Response body:", responseData); // Log the response body
                if (!response.ok) {
                    throw new Error(responseData?.message || "Login failed");
                }
                return responseData;
            })
            .then((data) => {
                console.log("Login response:", data); // Log the successful response
                if (data.user) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                    localStorage.setItem("token", data.token);
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
        <label>
            Username:
            <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
        </label>
        <label>
            Password:
            <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                required
            />
        </label>
        <button type="submit"><strong>Submit</strong></button>
        </form>
    );
};