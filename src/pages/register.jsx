import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, DatePicker, Form, Input, Radio, Space, Table } from "antd";
import { collection, addDoc, getDocs, deleteDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, deleteUser } from "firebase/auth";
import "antd/dist/antd.css";
import "./register.css";
import { db, auth } from "../firebase-congfig";
import { async } from "@firebase/util";

const RegisterUser = () => {
  const [user, setUser] = useState({
    name: "",
    govId: "",
    email: "",
    phone: "",
    password: "",
    dob: "", // Date Of Birth
    gender: "",
  });
  const genders = ["Male", "Female", "Other"];
  const myCollection = collection(db, "users");
  let i = 1;
  const [userList, setUserList] = useState([{}]);
  const navigate = useNavigate("");
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const dobChange = (event) => {
    setUser((prevState) => ({
      ...prevState,
      dob: event.format("YYYY-MM-DD"),
    }));
  };
  const { form } = Form.useForm();
  const writeToDB = async () => {
    await addDoc(myCollection, user);
    createUserWithEmailAndPassword(auth, user.email, user.password);
    console.log("added user: ", user);
    navigate("/");
  };
   const removeUser = () => {
      deleteDoc(myCollection, this);
      deleteUser(auth, this);
  }

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

  return (
    <div className="background">
      <h1 className="centered">Register New User</h1>
      <br />
      <Form className="formStyle" form={form} onFinish={writeToDB} labelCol={{ span: 7 }} wrapperCol={{ span: 14 }}>
        <br />
        <Form.Item label="Name:" name="name" rules={[{ required: true }]}>
          <Input type="text" name="name" onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Gov ID:" name="govId" rules={[{ required: true }]}>
          <Input type="text" name="govId" onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Email:" name="email" rules={[{ required: true }]}>
          <Input type="email" name="email" onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Phone Number:" name="phone" rules={[{ required: true }]}>
          <Input type="number" name="phone" onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Password:" name="password" rules={[{ required: true }]}>
          <Input type="password" name="password" onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Gender:" name="gender" rules={[{ required: true }]}>
          <Space direction="horizental">
            <Radio.Group name="gender" onChange={handleChange}>
              {genders.map((value) => {
                return (
                  <Radio name="gender" value={value}>
                    {value}
                  </Radio>
                );
              })}
            </Radio.Group>
          </Space>
        </Form.Item>
        <Form.Item label="Birth Date:" name="dob" rules={[{ required: false }]}>
          <DatePicker name="dob" onChange={dobChange} format="DD/MM/YYYY" />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 9 }}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
      <div className="centered">Already Registered log-in</div>
      <div className="centered">
          <Button type="link" onClick={()=>navigate("/")}>Go to Log In</Button>
      </div>
      <Space direction="horizental">
        {userList.map(({ name, email, phone, gender, password, dob }) => (
          <div className="userStyle">
            {i++} Name: {name} <br /> Email: {email} <br />
            Password: {password} <br /> 
            phone: {phone} <br /> Gender: {gender} <br />
            DOB: {dob} <br />
            <Button onClick={removeUser}>Delete User</Button>
          </div>
          //   i = i +1
        ))}
      </Space>
    </div>
  );
};

export default RegisterUser;
