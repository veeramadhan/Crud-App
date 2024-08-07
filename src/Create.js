import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [inputData, setInputData] = useState({ name: '', email: '' });
  const navigate = useNavigate();
  const [nextId, setNextId] = useState(1);

  useEffect(() => {
    axios.get("http://localhost:3030/users")
      .then(res => {
        const records = res.data;
        if (records.length > 0) {
          const maxId = Math.max(...records.map(record => parseInt(record.id)));
          setNextId(maxId + 1);
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecord = { ...inputData, id: nextId.toString() };
    axios.post("http://localhost:3030/users", newRecord)
      .then(res => {
        navigate("/");
      }).catch(err => console.log(err));
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="w-50 border bg-light p-5">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='name'>Name:</label>
            <input type='text' name='name' className='form-control' onChange={e => setInputData({ ...inputData, name: e.target.value })} />
          </div>

          <div>
            <label htmlFor='email'>Email:</label>
            <input type='email' name='email' className='form-control' onChange={e => setInputData({ ...inputData, email: e.target.value })} />
          </div>
          <br></br>
          <button className='btn btn-info' type='submit'>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Create;


