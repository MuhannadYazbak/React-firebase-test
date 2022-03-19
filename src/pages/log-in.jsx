import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { LoginOutlined, GoogleOutlined } from "@ant-design/icons";
import { auth, GoogleProvider } from "../firebase-congfig";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const LogIn = ({ setAuth }) => {
  const navigate = useNavigate("");
  const { form } = Form.useForm();
  const [signIn, setSignIn] = useState({
    email: "",
    password: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignIn((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const signInWithEmail = () => {
    signInWithEmailAndPassword(auth, signIn.email, signIn.password)
      .then((result) => {
        navigate("/main");
        setAuth(true);
        console.log("Email: ", signIn.email, " Password: ", signIn.password);
      })
      .catch("Not authorized");
  };
  const signInWithGoogle = () => {
    signInWithPopup(auth, GoogleProvider).then((result) => {
      navigate("/main");
      setAuth(true);
      console.log("signed in with ", GoogleProvider.getCustomParameters.arguments);
    });
  };
  return (
    <div style={{ minHeight: "90vh" }}>
      <h1>LogIn</h1>
      <Form form={form} onFinish={signInWithEmail} labelCol={{ span: 7 }} wrapperCol={{ span: 14 }}>
        <Form.Item label="Email:" name="email" rules={[{ required: true }]}>
          <Input type="email" name="email" onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Password:" name="password" rules={[{ required: true }]}>
          <Input type="password" name="password" onChange={handleChange} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 9 }}>
          <Button type="primary" htmlType="submit" icon={<LoginOutlined />}>
            Log-In
          </Button>
        </Form.Item>
      </Form>
      <Button type="primary" onClick={signInWithGoogle} icon={<GoogleOutlined />}>
        Log-in with Google
      </Button>
      <Button type="dashed" onClick={() => navigate("/register")}>
        Register
      </Button>
    </div>
  );
};

export default LogIn;
