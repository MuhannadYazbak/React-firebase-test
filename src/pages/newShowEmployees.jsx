import React, { useEffect, useState } from "react";
import { Select, Button, Form, Layout, Input, Space, TimePicker, Radio, DatePicker } from "antd";
import "antd/dist/antd.css";
import { useNavigate } from "react-router-dom";
const { Header, Content } = Layout;

const EmployeeList = () => {

  const [employee, setEmployee] = useState({
    name: "",
    govId: "",
    email: "",
    phone: "",
    password: "",
    gender: "",
    age: "",
    shifts: [],
  });

  const [employeeList, setEmployeeList] = useState([]);

  const { form } = Form.useForm();

  const navigate = useNavigate("");

  const genders = ["Male", "Female", "Other"];

  const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let pDay = "";
  let pHours = "";

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmployee((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("List :", employee);
    setEmployeeList((prevState)=>[
      ...prevState, employee
    ]);
    setEmployee(()=>({
      shifts: [],
    }));
    form.reset();
  };

  const getEmpAge = (event) => {
    var today = new Date();
    var birthDate = new Date(event);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    setEmployee((prevState) => ({
      ...prevState,
      age: age,
    }));
  };

  const dayChange = (event) => {
    pDay = event;
  };

  const hoursChange = (event) => {
    pHours = event.format("hh");
  };

  const addShift = () => {
    setEmployee((prevState)=> ({
      ...prevState,
      shifts: [...prevState.shifts,{day: pDay, hours:pHours}],
    }));
    pDay = "";
    pHours = "";
  };
  useEffect(()=> {
    const showEmployeesList = () => {
      return (
      employeeList.map((emp) => ( 
        <div className="Employee">
          <label> Name: {emp.name}</label>
          <br />
          <label>Gov ID: {emp.govId}</label>
          <br />
          <label>Email: {emp.email}</label>
          <br />
          <label>Phone: {emp.phone}</label>
          <br />
          <label>Password: {emp.password}</label>
          <br />
          <label>Gender: {emp.gender}</label>
          <br />
          {emp.shifts.map((shft) => (
            <div className="shifts">
              <label>Day: {shft.day}</label>
              <br />
              <label>Hours: {shft.hours}</label>
              <br />
            </div>
          ))} 
          </div> 
      ),
       fetch("http://localhost:3001/users").then(response => response.json())
       .then(res=>{
         if (res.data) {
         console.log("Fetched ",res.data);
         }
       })   
      )
      )
    }
  },[employeeList, ""]);

  return (
    <Layout>
      <Header style={{ color: "white", fontSize: "24px", display: "flex", justifyContent: "center", alignItems: "center" }}>Add New Employee</Header>
      <Content>
        <div className="in-center">
          <Button onClick={() => navigate(-1)}>Back</Button>
        </div>
        <Form form={form} onFinish={handleSubmit} labelCol={{ span: 7 }} wrapperCol={{ span: 12 }}>
          <Form.Item label="Name:" name="name" rules={[{ required: true }]}>
            <Input type="text" name="name" onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Gov ID:" name="govId" rules={[{ required: true }]}>
            <Input type="number" name="govId" onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Email:" name="email" rules={[{ required: true }]}>
            <Input type="email" name="email" onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Phone:" name="phone" rules={[{ required: true }]}>
            <Input type="number" name="phone" onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Password:" name="password" rules={[{ required: true }]}>
            <Input type="password" name="password" onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Gender:" name="gender" rules={[{ required: true }]}>
            <Space direction="horizental">
              <Radio.Group name="gender" onChange={handleChange}>
                {genders.map((g) => (
                  <Radio value={g}>{g}</Radio>
                ))}
              </Radio.Group>
            </Space>
          </Form.Item>
          <Form.Item label="BirthDay" name="age" rules={[{ required: true }]}>
            <DatePicker format="DD-MM-YYYY" onChange={getEmpAge} />
          </Form.Item>
          <Form.Item label="Shifts:" name="shifts" style={{backgroundColor: "lightgrey", borderStyle: "dashed", paddingTop: "15px", paddingBottom: "15px"}}>
            <Space direction="horizental">
              <Space direction="vertical">
                <Select name="day" placeholder="Shift Day" onChange={dayChange}>
                  {week.map((today) => (
                    <Select.Option value={today}>{today}</Select.Option>
                  ))}
                </Select>
                <TimePicker format="hh" name="hours" onChange={hoursChange} />
              </Space>
              <Space direction="vertical">
              <Button onClick={addShift}>+ shift</Button>
              </Space>
            </Space>
          </Form.Item> 
          <Form.Item label="Add">
            <Button type="primary" htmlType="submit">
              Add Employee
            </Button>
          </Form.Item>
        </Form>
        <div className="in-center"> 
          {employeeList.map((emp) => (
            <div className="Employee">
              <label> Name: {emp.name}</label>
              <br />
              <label>Gov ID: {emp.govId}</label>
              <br />
              <label>Email: {emp.email}</label>
              <br />
              <label>Phone: {emp.phone}</label>
              <br />
              <label>Password: {emp.password}</label>
              <br />
              <label>Gender: {emp.gender}</label>
              <br />
              {emp.shifts.map((shft) => (
                <div className="shifts">
                  <label>Day: {shft.day}</label>
                  <br />
                  <label>Hours: {shft.hours}</label>
                  <br />
                </div>
              ))} 
              </div> 
              ))} 
        </div>
      </Content>
    </Layout>
  );
};

export default EmployeeList;
