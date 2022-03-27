import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Space, Button } from "antd";
import { userList } from "./register";
import { collection, deleteDoc, getDocs } from "firebase/firestore";
import { async } from "@firebase/util";
import { db } from "../firebase-congfig";
import Search from "antd/lib/input/Search";
const Users = () => {
  const navigate = useNavigate("");
  const myCollection = collection(db, "users");
  let i = 1;
  // const data = [
  //   {
  //     name: "Muhannad Yazbak",
  //     govId: "203368246",
  //     email: "yazbakm@gmail.com",
  //     phone: "0548034062",
  //     password: "mypass123",
  //     gender: "Male",
  //     dob: "1991-03-08",
  //     shifts: [
  //       {
  //         day: "Sunday",
  //         hours: "02",
  //       },
  //       {
  //         day: "Monday",
  //         hours: "08",
  //       },
  //     ],
  //   },
  // ];
  const [userList, setUserList] = useState([{
    user: {},
  }]);
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(myCollection);
      setUserList(
        data.docs.map((doc) => ({
          ...doc.data(),
        }))
      );
      console.log("Supposed to fetch now")
      fetch("http://localhost:3000/users").then(response => response)
      .then(res=>{
        if (res && res.data) {
        console.log("Fetched ",res.data);
        }
      })
    };
    getUsers();
  },[""] );
  
  
  const removeUser = async (e) => {
    await deleteDoc(myCollection, e);
  };
  const handleSearch = (event) => {
    console.log("Searching ... ", event);
  };

  return (
    <div style={{ minHeight: "190vh" }}>
      <Search name="userSearch" onSubmit={handleSearch} placeholder="Find User" />
      <br />
      <Space direction="vertical" align="center">
        {userList.map(({ name, email, phone, gender, password, dob }) => (
          <div className="userStyle">
            {i++} Name: {name} <br /> Email: {email} <br />
            Password: {password} <br />
            phone: {phone} <br /> Gender: {gender} <br />
            DOB: {dob} <br />
            <Button onClick={removeUser}>Delete User</Button>
          </div>
        ))}
      </Space>
      <div>
        <Button style={{ marginTop: "25px" }} type="primary" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>
    </div>
  );
};

export default Users;
