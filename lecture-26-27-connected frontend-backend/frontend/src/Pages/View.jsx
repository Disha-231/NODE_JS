import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const View = () => {
  const [record, setRecord] = useState()
  
  const fetchuser = async()=>{
    // alert(`hieeeeee`)
    try{
      const record = await fetch('http://localhost:8000/api/v1/viewuser',{
        method: 'GET',

      })
      const res = await record.json()
      // console.log(res)
      if(res.success){
        setRecord(res.users)
      }
    }catch(err){
      console.log(err)
      return false
    }
  }
  useEffect(()=>{
    fetchuser()
  })
  return (
    <div>
      <center>
        <h1>View</h1>
        <table class="table" border={1} cellPadding={5} cellSpacing={5}>
  <thead>
    <tr>
      <th scope="col">No</th>
      <th scope="col">Name</th>
      <th scope="col">Password</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
{
  record && record.map((val, index) => {
    <tr key={index}>
      <td>{++index}</td>
      <td>{val.name}</td>
      <td>{val.password}</td>
    </tr>
  })

}
  </tbody>
</table>

<Link to={'/add'}>ADD</Link>
      </center>
      
    </div>
  )
}

export default View
