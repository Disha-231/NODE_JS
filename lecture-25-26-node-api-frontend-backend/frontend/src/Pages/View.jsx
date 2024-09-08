import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../style/style.css'; // Import custom CSS for styling

const View = () => {
  const [record, setRecord] = useState([]);
  const navigate = useNavigate();

  const fetchuser = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/viewuser', {
        method: 'GET',
      });
      const data = await response.json();

      // Check if response contains users data
      if (data && data.success) {
        setRecord(data.users);
      } else {
        console.error('Error fetching users: Data format not as expected', data);
      }
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };

  useEffect(() => {
    fetchuser();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/deleteUser?deleteid=${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (data && data.success) {
        alert('Record deleted successfully');
        fetchuser(); // Refresh the list after deletion
      } else {
        console.error('Error deleting user: Data format not as expected', data);
      }
    } catch (err) {
      console.error('Failed to delete user:', err);
    }
  };

  return (
    <div className="view-container">
      <h1 className="text-center mb-4">User Records</h1>
      <div className="text-center mb-4">
        <Link to="/add" className="btn btn-custom">Add New User</Link>
      </div>
      <div className="card-container">
        {record.length > 0 ? (
          record.map((val) => (
            <div key={val._id} className="card">
              <div className="card-header">
                <h5 className="card-title">{val.name}</h5>
              </div>
              <div className="card-body">
                <p><strong>Email:</strong> {val.email}</p>
                <p><strong>Password:</strong> {val.password}</p>
              </div>
              <div className="card-footer">
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(val._id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-warning text-white"
                  onClick={() => navigate('/edit', { state: val })}
                >
                  Edit
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No user records found.</p>
        )}
      </div>
    </div>
  );
};

export default View;
