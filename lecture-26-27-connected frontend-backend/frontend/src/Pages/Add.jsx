import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Add = () => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const record = await fetch('http://localhost:8000/api/v1/addUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    password: password

                })
            })
            const res = await record.json()
            //console.log(res)
            if (res.success) {
                alert('User Added Successfully')
                navigate('/')
            }
        } catch (err) {
            console.log(err)
            return false
        }
    }
    return (
        <div align="center">
            <center>
                <div className="container" >
                    <div className="row">
                        <div className="col-3"></div>
                        <div className="col-6">
                            <form onSubmit={handleSubmit}>

                                <div class="mb-3">
                                    <label for="exampleInputName" class="form-label">Name : </label>
                                    <input type="text"
                                        onChange={(e) => setName(e.target.value)} value={name}
                                        class="form-control" id="exampleInputName" aria-describedby="nameHelp" />
                                </div>

                                <div class="mb-3">
                                    <label for="exampleInputPassword1" class="form-label">Password :</label>
                                    <input type="password"
                                        onChange={(e) => setPassword(e.target.value)} value={password}
                                        class="form-control" id="exampleInputPassword1" />
                                </div>

                                <button type="submit" class="btn btn-primary">Submit</button>
                            </form>
                        </div>
                        <div className="col-3"></div>

                    </div>
                </div>
            </center>
        </div>
    )
}

export default Add
