import React, { useState } from "react";
import "antd/dist/antd.css";
import "./showEmployees.css";
import { Button, Form, Input, Select, Space, TimePicker } from "antd";

const Employees = () => {
    
  const week = ["Sunday", "Monday", "Tuesday", "Wednseday", "Thursday", "Friday", "Saturday"];

  const { form } = Form.useForm();

  const [employeesList, setEmployeesList] = useState([
    {
      name: "Muhannad Yazbak",
      govId: "203368246",
      email: "yazbakm@gmail.com",
      phone: "0548034062",
      password: "MyP@$$123",
      shifts: [
        {
          day: "Sunday",
          hours: "08-18",
        },
      ],
    },
  ]);

  const [employee, setEmployee] = useState(
    {
      name: "Muhannad Yazbak",
      govId: "203368246",
      email: "yazbakm@gmail.com",
      phone: "0548034062",
      password: "MyP@$$123",
      shifts: [
        {
          day: "Sunday",
          hours: "08-18",
        },
      ],
    },
  );

  const [shift, setShift] = useState({
    day: "",
    hours: "",
  });

  const [myShifts, setMyShifts] = useState([{
    day: "",
    hours: "",
  }]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmployee((prevState) => ({...prevState, [name]: value }));
  };

  const dayChange = (event) => {
    setShift((prevState)=> ({
      ...prevState,
      day: event
    }));
  };

  const hoursChange = (event) => {
    setShift((prevState)=> ({
      ...prevState,
      hours: event.format("hh")
    }));
  };

  const addShift = () => {
    setMyShifts(()=>
    [shift]);
    console.log("Added shift: ", shift," to myShifts")
  };

  const AddEmployee = () => {
    setEmployee((prevState)=>({...prevState,shifts: myShifts}));
    console.log("Added Employee ", employee);
    setEmployeesList((prevState)=>[...prevState, employee]);
    console.log("Employees list=", employeesList);
  }

  const showEmployeesList = () =>
    employeesList.map((emp) => {
      return (
        <p className="Employee">
          <label>{emp.name}</label>
          <label>{emp.govId}</label>
          <label>{emp.email}</label>
          <label>{emp.phone}</label>
          <label>{emp.password}</label>
          {emp.shifts.map((shift) => (
            <div className="shifts">
              <label>{shift.day}</label>
              <label>{shift.hours}</label>
            </div>
          ))}
        </p>
      );
    });
  return (
    <div className="fullScreen">
      <Form form={form} onFinish={AddEmployee} labelCol={{ span: 7 }} wrapperCol={{ span: 12 }}>
        <Form.Item label="Name:" rules={[{ required: true }]}>
          <Input type="text" name="name" onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Gov ID:" rules={[{ required: true }]}>
          <Input type="number" name="govId" onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Email:" rules={[{ required: true }]}>
          <Input type="email" name="email" onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Phone:" rules={[{ required: true }]}>
          <Input type="number" name="phone" onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Password:" rules={[{ required: true }]}>
          <Input type="password" name="password" onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Day:">
          <Select onChange={dayChange}>
            {week.map((today)=> (
              <Select.Option value={today}>{today}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Hours:">
          <TimePicker format="hh" onChange={hoursChange} />
        </Form.Item>
        <Form.Item label="Add Shift">
          <Button type="dashed" onClick={addShift}>+</Button>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 9 }}>
          <Button type="primary" htmlType="submit">
            Add Employee
          </Button>
        </Form.Item>
      </Form>
      {employeesList.map((emp) => {
        <div>
        <p className="Employee">
          <label>Name: {emp.name}</label>
          <label>Gov ID: {emp.govId}</label>
          <label>Email: {emp.email}</label>
          <label>Phone: {emp.phone}</label>
          <label>Password: {emp.password}</label>
          {emp.shifts.map((shft) => (
            <div className="shifts">
              Shifts: <br />
              <label>Day: {shft.day}</label>
              <label>Hours: {shft.hours}</label>
            </div>
          ))}
        </p>
        </div>
      })}
    </div>
  );
};

export default Employees;
