import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Space, Button } from "antd";
import { userList } from "./register";
import { collection, deleteDoc, getDocs } from "firebase/firestore";
import { async } from "@firebase/util";
import { db } from "../firebase-congfig";
const Users = () => {
  const navigate = useNavigate("");
  const myCollection = collection(db, "users");
  let i = 1;
  const [userList, setUserList] = useState([{}]);
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(myCollection);
      setUserList(
        data.docs.map((doc) => ({
          ...doc.data(),
        }))
      );
    };
    getUsers();
  }, [userList, ""]);
  const removeUser = async (e) => {
    await deleteDoc(myCollection, e);
  };

  return (
    <div style={{minHeight: '90vh'}}>
      <Space direction="horizental">
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
      <Button style={{marginTop: "25px"}} type="primary" onClick={() => navigate(-1)}>
        Back
      </Button>
      </div>
    </div>
  );
};

export default Users;
