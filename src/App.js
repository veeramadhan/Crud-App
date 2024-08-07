import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

function App({ setAuthenticated }) {
  const [columns, setColumns] = useState([]);
  const [record, setRecord] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = () => {
    axios
      .get("http://localhost:3030/users")
      .then((res) => {
        setColumns(Object.keys(res.data[0]));
        setRecord(res.data);
        console.log("setRecord", res.data);
        console.log("col", res.data);
      })
      .catch((err) => console.error(err));
  };

  const handleSubmit = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3030/users/${id}`)
          .then((res) => {
            console.log("Deleted successfully");
            setRecord(record.filter((item) => item.id !== id)); 
            Swal.fire("Deleted!", "The record has been deleted.", "success");
          })
          .catch((err) => {
            console.log(err);
            Swal.fire("Error!", "There was an error deleting the record.", "error");
          });
      }
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken"); 
    setAuthenticated(false); 
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <Link className="navbar-brand" to="/">CRUD App</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <button className="nav-link btn btn-link logout" onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-5">
        <div className="text-end mb-3">
          <Link to="/create" className="btn btn-primary">
            Add+
          </Link>
        </div>
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              {columns.map((c, i) => (
                <th key={i}>{c}</th>
              ))}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {record.map((d, i) => (
              <tr key={i}>
                <td>{d.id}</td>
                <td>{d.name}</td>
                <td>{d.email}</td>
                <td className="btnsize">
                  <Link to={`/update/${d.id}`} className="btn btn-success">
                    Update
                  </Link>
                  <button
                    onClick={() => handleSubmit(d.id)}
                    className="btn btn-danger ms-lg-3"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
