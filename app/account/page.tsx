'use client'
import React, { CSSProperties, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import app from "@/app/_firebase/Config"
import { FirebaseError } from 'firebase/app';
import '../globals.css';
import { relative } from 'path';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import "@fortawesome/fontawesome-free/css/all.min.css"


export default function Account() {
  
  const borderStyle: React.CSSProperties = { 
    
  };
  const myStyle: CSSProperties = {
    boxSizing: 'border-box',
    border: '7px solid		#D0D0D0',
    backgroundColor: 'white',
    width: '50%',
    marginLeft:'25%'
    
   
  };
  const sstyle = {
    paddingTop:'15px',
    display: 'flex',
    justifyContent: 'center',
    fontFamily: 'iansui',
    
  }

  const buttonPad ={
    paddingTop:'15px',
    paddingLeft:"55px"
  }
  const headStyle ={
    paddingTop:'65px',
    display: 'flex',
    justifyContent: 'center'
  }
  const fontStyle={
    fontFamily: '游明朝',
    fontSize:'17px',
    color:'White'
  }

  
  const auth = getAuth(app);
  const [account, setAccount] = useState({ email: "", password: "", name: "" });
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("註冊");
  const handleChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    setAccount({ ...account, [e.target.name]: e.target.value })
  }
  const changeStatus = function (e: React.MouseEvent<HTMLElement>) {
    if (status === "註冊") {
      setStatus("登入");
    }
    else {
      setStatus("註冊");
    }
  }
  const statusLogin = function (e: React.MouseEvent<HTMLElement>) {
      setStatus("登入");
  }
  const statusRegister = function (e: React.MouseEvent<HTMLElement>) {
    setStatus("註冊");
}

  const handleSubmit = async function (e: React.MouseEvent<HTMLElement>) {
    try {
        if (status === "註冊") {
          const res = await createUserWithEmailAndPassword(auth, account.email, account.password);
          await updateProfile(res.user, { displayName: account.name });
          setMessage(`註冊成功，歡迎 ${res.user?.email}`);
          // console.log(res)
        }
        else {
          const res = await signInWithEmailAndPassword(auth, account.email, account.password);
          setMessage(`登入成功，歡迎 ${res.user?.email}`);
        }
      }
      catch (e) {
        if (e instanceof FirebaseError) {
          let message = "";
          switch (e.code) {
            case "auth/email-already-in-use":
              message = "電子信箱已註冊";
              break;
            case "auth/weak-password":
              message = "密碼強度不足";
              break;
            case "auth/invalid-email":
              message = "電子郵件格式錯誤";
              break;
            case "auth/user-not-found":
              message = "電子郵件信箱不存在";
              break;
            case "auth/wrong-password":
              message = "密碼錯誤";
              break;
            case "auth/too-many-requests":
              message = "登入失敗次數過多，請稍後再試";
              break;
            default:
              message = "系統錯誤:" + e.code;
          }
          setMessage(message);
        }
        else {
          if (e instanceof Error) {
            setMessage(e.message);
          }
          else {
            setMessage("系統錯誤");
          }
        }
      }

  }
  const logout = function (e: React.MouseEvent<HTMLElement>) {
    auth.signOut();
    setMessage("登出成功");
  }
  return (
    <div>
    <div style={borderStyle}>
      <h1 style={headStyle}>{status === '註冊' ? "REGISTER" : "LOGIN"}</h1>
    <form style={myStyle}>
    <MDBContainer className=" my-5 d-flex flex-column w-50">
    <MDBTabs pills justify className=' d-flex flex-row justify-content-between'>
        <MDBTabsItem>
          <MDBTabsLink style={fontStyle} onClick={statusRegister} color='secondary'>
            註冊
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink style={fontStyle} onClick={statusLogin} color='primary'>
            登入
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>
      <div style={sstyle} >
        {status === '註冊' && <TextField type="text" name="name" value={account.name}
          placeholder="姓名" label="姓名:" onChange={handleChange} />
        }
      </div>
      <div style={sstyle}>
        <TextField type="email" name="email" value={account.email}
          placeholder="電子郵件信箱" label="電子郵件信箱:" onChange={handleChange} autoComplete='username' />
      </div>
      <div style={sstyle}>
        <TextField type="password" name="password" value={account.password}
          placeholder="密碼" label="密碼:" onChange={handleChange} autoComplete='current-password' />
      </div>
      
      <div style={buttonPad}>
        
        <Button variant="contained" color="primary" onClick={handleSubmit}>{status}</Button>
        {/* <a  color="secondary" onClick={changeStatus}>
          {status === '註冊' ? "已經註冊，我要登入" : "尚未註冊，我要註冊"}</a> */}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {status === '登入' ? <Button variant="outlined" color="secondary" onClick={logout} >登出</Button> : null}
      </div>

      
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div>{message}</div>
      
      <div style={sstyle}>
        
      </div>
      </MDBContainer>
    </form>
    
    </div>
    </div>
  )
}