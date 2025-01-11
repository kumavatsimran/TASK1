import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ProfileShow() {
  const [data, setData] = useState([]);

  useEffect(() => {
    FetchData();
  }, []);

  const FetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/comments");
      setData(response.data); 
      console.log(response.data,'kk');
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const  DeletData= async (id) => {
    try {
        await axios.delete(`http://localhost:3000/comments/${id}`);
        FetchData();
    } catch (error) {
        console.log(error);
    }
  }



  return (
    <>
    <div className="container py-4">
  <div className="d-flex justify-content-between align-items-center mb-4">
    <h3 className="text-primary">User List</h3>
    <Link to='/Home' className="btn btn-outline-primary">Home</Link>
  </div>

  <div className="table-responsive">
    <table className="table table-striped table-bordered table-hover table-dark">
      <thead>
        <tr>
          <th scope="col">No</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Contact</th>
          <th scope="col">Country</th>
          <th scope="col">State</th>
          <th scope="col">City</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((val, i) => (
            <tr key={i}>
              <th scope="row">{i + 1}</th>
              <td>{val.Name}</td>
              <td>{val.email}</td>
              <td>{val.contact}</td>
              <td>{val.country}</td>
              <td>{val.state}</td>
              <td>{val.city}</td>
              <td>
                <button 
                  onClick={() => DeletData(val.id)} 
                  className="btn btn-danger btn-sm">
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="8" className="text-center">
              No Data Found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>

    </>
  );
}

export default ProfileShow;
