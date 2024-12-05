import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import styles from "./Location.module.css";

const Location = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [details, setDetails] = useState({
    country: "",
    state: "",
    city: "",
  });

  const getStates = async () => {
    try {
      const response = await axios.get(
        `https://crio-location-selector.onrender.com/country=${details.country}/states`
      );
      setStates(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getCities = async () => {
    try {
      const response = await axios.get(
        `https://crio-location-selector.onrender.com/country=${details.country}/state=${details.state}/cities`
      );
      setCities(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getCountries = async () => {
    try {
      const response = await axios.get(
        "https://crio-location-selector.onrender.com/countries"
      );
      setCountries(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    if (details.country) {
      getStates();
    }

    setDetails({ ...details, state: "", city: "" });
  }, [details.country]);

  useEffect(() => {
    if (details.state) {
      getCities();
    }

    setDetails({ ...details, city: "" });
  }, [details.state]);

  return (
    <div className={styles.wrapper}>
      <h1>Select Location</h1>
      <div className={styles.dropdownWrapper}>
        <select
          name="country"
          id="country-dropdown"
          value={details.country}
          style={{ width: "40%", height: "34px" }}
          onChange={(e) => {
            setDetails({ ...details, country: e.target.value });
          }}
         
        >
          <option value="" selected>
            Select Country
          </option>
          {countries.map((item) => (
            <option value={item}>{item}</option>
          ))}
        </select>
        <select
          name="state"
          id="state-dropdown"
          style={{ width: "30%", height: "34px" }}
          value={details.state}
          onChange={(e) => {
            setDetails({ ...details, state: e.target.value });
          }}
          disabled={!details.country}
        >
          <option value="" selected>
            Select state
          </option>
          {states.map((item) => (
            <option value={item}>{item}</option>
          ))}
        </select>
        <select
          name="city"
          id="city-dropdown"
          value={details.city}
          style={{ width: "30%", height: "34px" }}
          onChange={(e) => {
            setDetails({ ...details, city: e.target.value });
          }}
          disabled={!details.state}
        >
          <option value="" selected>
            Select City
          </option>
          {cities.map((item) => (
            <option value={item}>{item}</option>
          ))}
        </select>
      </div>
      {
        details.city && <span>You selected <span style={{fontSize:"20px", fontWeight:"bold"}}>{details.city}</span>, {details.state}, {details.city}</span>
      }
      
      
    </div>
  );
};
export default Location;
