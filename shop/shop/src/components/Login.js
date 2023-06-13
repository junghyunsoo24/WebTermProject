// import './App.css';
import { Fragment, useState, useEffect } from "react";
import { arrayContentsToString, makeHttpRequest } from "./util";
import { useNavigate } from "react-router-dom";

async function getId(userId, pw) {
  console.log("ssss", userId, pw);
  return makeHttpRequest(
    "http://127.0.0.1:3001/login",
    { "Content-Type": "application/json" },
    { id: userId, pw: pw }
  );
}

function Login({ info, setInfo }) {
  const [id, setId] = useState(-1);
  const [pw, setPw] = useState(-1);
  const navigate = useNavigate();

  async function loginUser() {
    const res = await getId(id, pw);
    console.log(id);
    console.log(pw);
    if (res.length === 0) {
      alert("로그인 실패");
    } else {
      setInfo({ ...info, id: res[0].id , userId: id});
      navigate("/mainPage");
    }
  }

  //useEffect(() => {
  //  loginUser();
  //}, [id, pw, info, navigate]);

  return (
    <Fragment>
      <input
        type="text"
        id="id"
        name="address"
        placeholder="id 입력"
        onChange={(e) => {
          setId(e.target.value);
        }}
      />
      <input
        type="password"
        id="password"
        name="address"
        placeholder="pw 입력"
        onChange={(e) => setPw(e.target.value)}
      />
      <button onClick={loginUser}>로그인</button>
    </Fragment>
  );
}

export default Login;
