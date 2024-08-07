import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Update = () => {
    const { id } = useParams();
    const [data, setData] = useState({ name: '', email: '' }); 
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3030/users/${id}`) 
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3030/users/${id}`, data) 
            .then(res => {
                navigate("/"); 
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
            <div className="w-50 border bg-light p-5">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">ID:</label>
                        <input
                            type="text"
                            name="id"
                            className="form-control"
                            value={data.id}
                            onChange={e => setData({ ...data, id: e.target.value })}
                            disabled
                        />
                    </div>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={data.name}
                            onChange={e => setData({ ...data, name: e.target.value })}
                        />
                    </div>

                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={data.email}
                            onChange={e => setData({ ...data, email: e.target.value })}
                        />
                    </div>
                    <br />
                    <button className="btn btn-info" type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Update;
