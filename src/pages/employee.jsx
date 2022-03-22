import { Button, Form, Input, Layout } from "antd";
import { useState } from "react";
import "antd/dist/antd.css";
import "./employee.css";
const { Header, Content } = Layout;

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    govId: "",
    email: "",
    phone: "",
    password: "",
    shifts: [
      {
        day: "",
        hours: "",
      },
    ],
  });

  const [listEmployees, setListEmployees] = useState(new Array(1));
  const { form } = Form.useForm();
  let i = 0;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmployee((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = () => {
    setListEmployees((prevState)=> ({
        ...prevState,
        employee,

    }
    ))
    console.log("list of Employees: ", listEmployees.map(({email})=> ({email})))
    {listEmployees.map(({name, govId, email, phone,password,shifts})=> {

            return (
            <div>
                Employee {i++} <br />
                Name: {name} <br />
                Gov ID: {govId} <br />
                Email: {email} <br />
                Phone: {phone} <br />
                Password: {password} <br />
                Shifts: <br />
            </div> )

    }
    )}
  };
  return (
    <div className="layout">
    <Layout>
      <Header className="header">Add Employee</Header>
      <Content className="content">
        <Form  onFinish={handleSubmit} labelCol={{ span: 7 }} wrapperCol={{ span: 12 }}>
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
          <Form.Item label="Shifts :" name="shifts" rules={[{ required: false }]}></Form.Item>
          <Form.Item wrapperCol={{ offset: 9 }}>
            <Button type="primary" htmlType="submit">
              Add Employee
            </Button>
          </Form.Item>
        </Form>
      </Content>
      {/* {employee.map((name, govId, email, phone, password, shifts) => {
        <div className="employee">
          Employee: {i++} <br />
          Name: {name} <br />
          Gov ID: {govId} <br />
          Email: {email} <br />
          Phone: {phone} <br />
          Password: {password} <br />
          Shifts: <br />
        </div>; 
      })} */}
    </Layout>
    </div>
  );
};

export default AddEmployee;
