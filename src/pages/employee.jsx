import { Button, Form, Input, Layout, Select, TimePicker } from "antd";
import { useEffect, useState } from "react";
import "antd/dist/antd.css";
import "./employee.css";
const { Header, Content } = Layout;

const AddEmployee = () => {
  let i = 1;
  let shft = 1;
  const [employee, setEmployee] = useState([
    {
    
      number: i++,
      name: "Muhannad Yazbak",
      govId: "203368246",
      email: "yazbakm@gmail.com",
      phone: "0548034062",
      password: "mypass123",
      shifts: [
        {
          number: shft++,
          day: "Monday",
          hours: "14-18",
        },
        {
          number: shft++,
          day: "Tuesday",
          hours: "08-15",
        },
      ],
    },
  ]);
  
  const [shift, setShift] = useState([{
    day: "",
    hours: "",
  }])
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  //const [listEmployees, setListEmployees] = useState([employee]);
  //setListEmployees([data,]);
  const { form } = Form.useForm();
  //let i = 1;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmployee((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = () => {
    setEmployee((prevState)=> ({
      ...prevState,
      shifts: {shift},
    }))
    console.log("list of Employees: ",employee);
    shft=1;
    return (
      Object.keys(employee).map(key => <div>employee[key]</div>)
    )
  };
  const dayChange = (event) => {
    setShift((prevState)=> ( {
      ...prevState,
      day: event
    }));
  };
  const timeChange = (event) => {
    setShift((prevState)=> ( {
      ...prevState,
      hours: event.format("hh"),
    }));
  };
  useEffect(()=>{
    const showEmployees = () => {
      console.log("Employees: ", employee);
    };
    showEmployees();
  },
  []
  )
  return (
    <div className="layout">
      <Layout>
        <Header className="header">Add Employee</Header>
        <Content className="content">
        <div className="centered">
        <Button  onClick={() => console.log("list of employees: ", employee)}>Show Employees</Button></div>
          <Form onFinish={handleSubmit} labelCol={{ span: 7 }} wrapperCol={{ span: 12 }}>
            <Form.Item label="Name :" name="name" rules={[{ required: true }]}>
              <Input type="text" name="name" onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Gov ID :" name="govId" rules={[{ required: true }]}>
              <Input type="number" name="govId" onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Email :" name="email" rules={[{ required: true }]}>
              <Input type="email" name="email" onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Phone :" name="phone" rules={[{ required: true }]}>
              <Input type="number" name="phone" onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Password :" name="password" rules={[{ required: true }]}>
              <Input type="password" name="password" onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Shifts :" name="shifts" rules={[{ required: false }]}>
              <Select name="day" onChange={dayChange} placeholder="Day">
                  {days.map((today) => <Select.Option value={today}>{today}</Select.Option>)}
              </Select>
              <br />
              <TimePicker format="hh" onChange={timeChange} />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 9 }}>
              <Button type="primary" htmlType="submit">
                Add Employee
              </Button>
            </Form.Item>
          </Form>
        </Content>
        {/* {employee.map((emp) => (
          <div key={emp.number}>
            Employee: {emp.number} <br />
            Name: {emp.name} <br />
            Gov ID: {emp.govId} <br />
            Email: {emp.email} <br />
            Phone: {emp.phone} <br />
            Password: {emp.password} <br />
            Shifts: {emp.shifts} <br />
          </div>
        ))} */}
      </Layout>
    </div>
  );
};

export default AddEmployee;
