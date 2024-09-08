import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/style.css'; // Import custom CSS for styling

const Edit = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location?.state) {
            setName(location.state.name || '');
            setEmail(location.state.email || '');
            setPassword(location.state.password || '');
        }
    }, [location.state]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/api/v1/updateUser', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: location?.state?._id,
                    name,
                    email,
                    password,
                }),
            });

            const res = await response.json();
            if (res.success) {
                navigate('/');
                alert('Record updated successfully');
            } else {
                alert('Failed to update record: ' + res.message);
            }
        } catch (err) {
            console.error('An error occurred:', err);
            alert('An error occurred while updating the record.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card shadow-lg border-light custom-card">
                        <div className="card-body p-4">
                            <h2 className="card-title text-center mb-4">Edit User</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="form-control"
                                        placeholder="Enter name"
                                        required
                                    />
                                    <label htmlFor="name">Name</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="form-control"
                                        placeholder="Enter email"
                                        required
                                    />
                                    <label htmlFor="email">Email</label>
                                </div>

                                <div className="form-floating mb-4">
                                    <input
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="form-control"
                                        placeholder="Enter password"
                                        required
                                    />
                                    <label htmlFor="password">Password</label>
                                </div>

                                <button type="submit" className="btn btn-primary w-100">Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Edit;
