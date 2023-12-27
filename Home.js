import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';


function Home() {

    const [data, setData] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3030/products')
        .then(res => setData(res.data))
        .catch(err => console.log(err))
    }, [])

  return (
    <div className=''>


        <table className='table table-striped table-bordered'>

        
            <tbody>
                {data.map((d, i) => (
                    <tr key={i}>
                        <td>{d.id}</td>
                        <td>{d.name}</td>
                        <td>{d.category}</td>
                        <td>{d.price}</td>
                        <td>
                            <img src={d.image} alt={d.name} style={{ width: "100px" }}/>
                        </td>
                    </tr>
                ))}
            </tbody>
            
        </table>
    </div>
  )

  function handleDelete(id){
    const confirm = window.confirm("Are you sure that you want to delete it?");
    if(confirm){
        axios.delete('http://localhost:3030/products/'+id)
        .then(res => {
            alert("Your records have been deleted from this JSON-Server");
            navigate('/')
        })
    }
  }

}

export default Home;