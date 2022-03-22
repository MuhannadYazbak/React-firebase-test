import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import LogIn from "./pages/log-in";
import RegisterUser from "./pages/register";
import React, { useState } from "react";
import MainPage from "./pages/main";
import Users from "./pages/users";
import AddEmployee from "./pages/employee";
import { Layout, Menu } from "antd";
import { LoginOutlined, UserAddOutlined, WeiboSquareOutlined, UserOutlined } from "@ant-design/icons";
const { Header, Sider, Content } = Layout;

function App() {
  const navigate = useNavigate("");
  const [collapse, setCollapse] = useState(false);
  const [auth, setAuth] = useState(false);
  return (
    <div>
      <Layout>
        <Header className="centered">
          <h1 style={{ color: "white" }}> First-project</h1>
        </Header>
        <Layout style={{ minHeigh: "90vh" }}>
          <Sider collapsible collapsed={collapse} onCollapse={setCollapse}>
            <Menu theme="dark" mode="inline">
              <Menu.Item key="1" onClick={() => navigate("/")} icon={<LoginOutlined />}>
                Log-In
              </Menu.Item>
              <Menu.Item key="2" onClick={() => navigate("/register")} icon={<UserAddOutlined />}>
                Register
              </Menu.Item>
              <Menu.Item key="3" onClick={() => navigate("/main")} icon={<WeiboSquareOutlined />}>
                Main Page
              </Menu.Item>
              <Menu.Item key="4" onClick={() => navigate("/users")} icon={<UserOutlined />}>
                Users
              </Menu.Item>
              <Menu.Item key="5" onClick={() => navigate("/addEmployee")} icon={<UserAddOutlined />}>
                Add Employee
              </Menu.Item>
            </Menu>
          </Sider>
          <Content>
            <Routes>
              <Route path="/" element={<LogIn setAuth={setAuth} />} />
              <Route path="/register" element={<RegisterUser />} />
              <Route path="/main" element={<MainPage auth={auth} />} />
              <Route path="/users" element={<Users />} />
              <Route path="/addEmployee" element={<AddEmployee />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
