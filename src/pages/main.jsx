import { Button } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

const MainPage = ({ auth }) => {
  const navigate = useNavigate("");
  useEffect((auth) => {
    console.log("is Autherized? ", auth);
    if (auth == false) navigate(-1);
  }, []);
  return (
    <div style={{ minHeight: "90vh" }}>
      <h1 style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "32px" }}>Welcome to Main Page</h1>
      <br />
      <div className="centered">
        <Button type="primary" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>
    </div>
  );
};

export default MainPage;
