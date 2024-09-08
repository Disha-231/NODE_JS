import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/style.css'; // Import custom styles

const Add = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/api/v1/addUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            });

            if (!response.ok) {
                const res = await response.json();
                alert("Failed to add user: " + (res.message || "Unknown error"));
                return;
            }

            const res = await response.json();
            console.log(res);

            if (res.success) {
                navigate('/');
            } else {
                alert("Failed to add user: " + res.message);
            }
        } catch (err) {
            console.error("An error occurred:", err);
            alert("An error occurred while adding the user. Please try again later.");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card shadow-lg border-light custom-card animated-card">
                        <div className="card-body p-4">
                            <h2 className="card-title text-center mb-4 hover-underline">Add New User</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-floating mb-3 animated-input">
                                    <input
                                        type="text"
                                        onChange={(e) => setName(e.target.value)}
                                        value={name}
                                        className="form-control custom-input"
                                        id="name"
                                        placeholder="Enter your name"
                                        required
                                    />
                                    <label htmlFor="name">Name</label>
                                </div>

                                <div className="form-floating mb-3 animated-input">
                                    <input
                                        type="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                        className="form-control custom-input"
                                        id="email"
                                        placeholder="Enter your email"
                                        required
                                    />
                                    <label htmlFor="email">Email</label>
                                </div>

                                <div className="form-floating mb-4 animated-input">
                                    <input
                                        type="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                        className="form-control custom-input"
                                        id="password"
                                        placeholder="Enter your password"
                                        required
                                    />
                                    <label htmlFor="password">Password</label>
                                </div>
<center>
<button type="submit" className="btn-add">Add User</button>


</center>
                           
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Add;
