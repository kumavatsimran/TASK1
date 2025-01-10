import React, { useState } from "react";
import {auth} from '../Firebase'
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

function Home() {
  let nevigate=useNavigate()
  const [profile, setProfile] = useState({
    Name: "",
    email: "",
    contact: "",
    country: "",
    state: "",
    city: "",
  });
  const [error, setError] = useState({});
  const [countryid, setCountryid] = useState(0);
  const [stateid, setStateid] = useState(0);

  const validate = () => {
    let tempError = {};
    if (!profile.Name) tempError.Name = "Name is required";
    if (!profile.email) tempError.email = "Email is required";
    if (!profile.contact) tempError.contact = "Contact is required";
    if (!profile.country) tempError.country = "Country is required";
    if (!profile.state) tempError.state = "State is required";
    if (!profile.city) tempError.city = "City is required";
    setError(tempError);
    return Object.keys(tempError).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      console.log("Validation failed");
      return;
    }
    try {
      await axios.post("http://localhost:3000/comments", profile);
      console.log("Profile saved successfully:", profile);
      alert("Profile saved successfully");
      nevigate('/Show')
      
    } catch (error) {
      console.error("Error saving profile:", error);
    }
    setProfile('')
  };
  const signout=()=>{
    signOut(auth)
    .then(()=>{
      nevigate('/')
    }).catch((err)=>{
      console.log(err);
    })
  }

  return (
    <div className="container py-5">
  <div className="row justify-content-center">
  <div className="d-flex justify-content-between align-items-center mb-4">
    <Link to='/Show' className="btn btn-outline-primary">User TABLE</Link>
  </div>
    <div className="col-md-8">
      <div className="card shadow-lg">
        <div className="card-header bg-black text-white text-center">
          <h2>Registration Form</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                name="Name"
                onChange={handleChange}
              />
              {error.Name && <span className="text-danger">{error.Name}</span>}
            </div>

            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
              />
              {error.email && <span className="text-danger">{error.email}</span>}
            </div>

            <div className="mb-3">
              <label className="form-label">Contact No</label>
              <input
                type="tel"
                className="form-control"
                name="contact"
                placeholder="Enter your number"
                onChange={handleChange}
              />
              {error.contact && (
                <span className="text-danger">{error.contact}</span>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Country</label>
              <CountrySelect
                onChange={(e) => {
                  setCountryid(e.id);
                  setProfile({ ...profile, country: e.name });
                }}
                placeHolder="Select Country"
              />
              {error.country && (
                <span className="text-danger">{error.country}</span>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">State</label>
              <StateSelect
                countryid={countryid}
                onChange={(e) => {
                  setStateid(e.id);
                  setProfile({ ...profile, state: e.name });
                }}
                placeHolder="Select State"
              />
              {error.state && <span className="text-danger">{error.state}</span>}
            </div>

            <div className="mb-3">
              <label className="form-label">City</label>
              <CitySelect
                countryid={countryid}
                stateid={stateid}
                onChange={(e) => {
                  setProfile({ ...profile, city: e.name });
                }}
                placeHolder="Select City"
              />
              {error.city && <span className="text-danger">{error.city}</span>}
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-success btn-block">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="card-footer text-center">
          <button className="btn btn-danger" onClick={signout}>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

  );
}

export default Home;
