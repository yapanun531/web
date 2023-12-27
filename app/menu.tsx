'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { usePathname, useRouter } from 'next/navigation';
import { useContext } from 'react';
import { AuthContext } from './account/AuthContext';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Link from 'next/link';

export function Icon() {
  const authContext = useContext(AuthContext);

  const sss = {
    display: 'flex',
    paddingBottom: '5px'
  };

  const ssss = {
    paddingTop: '12px',
    paddingLeft: '12px'
  };

  const sssss = {
    paddingTop: '12px',
  };

  let content;

  if (authContext && authContext.displayName !== "") {
    if (authContext && authContext.displayName === "普通") {
      content = (
        <div style={sss}>
          <Link href="/account">
            <i style={{color:'black'}} className="fas fa-circle-user fa-3x"></i>
          </Link>
          <h5 style={sssss}>使用者 {authContext.email}，您好</h5>
        </div>
      );
    } else if(authContext && authContext.displayName === "管理員"){
      content = (
        <div style={sss}>
          <Link href="/account">
            <i className="fas fa-circle-user fa-3x"></i>
          </Link>
          <h5 style={ssss}>管理員 , 您好</h5>
        </div>
      );
    }
    else{
      content = (
      <div style={sss}>
      <Link href="/account">
        <i style={{color:'black'}} className="fas fa-circle-user fa-3x"></i>
      </Link>
      <h5 style={ssss}>商家 {authContext.displayName} , 您好</h5>
    </div>
    );
    }
  } else {
    content = (
      <div style={sss}>
        <Link href="/account">
          <i style={{color:'black'}} className="fas fa-circle-user fa-3x"></i>
        </Link>
        <h5 style={ssss}>登入/註冊</h5>
      </div>
    );
  }

  return content;
}


export function Menu() {
  const [value, setValue] = React.useState('1');
  const router = useRouter()
  const pathname = usePathname();
  const authContext = useContext(AuthContext);



  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  
  if(authContext.displayName!=""){
  if (authContext.displayName == "普通") {
    return (

      <div>
        <Box sx={{ width: '100%' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="輔園" onClick={() => router.push("/FuYuan")} value="1" />
                <Tab label="心園" onClick={() => router.push("/XinYuan")} value="2" />
                <Tab label="理園" onClick={() => router.push("/LiYuan")} value="3" />
                <Tab label="誠園" onClick={() => router.push("/ChengYuan")} value="4" />
                <Tab label="登出" onClick={() => router.push("/account")} value="5" />
                <Tab label="排行榜" onClick={() => router.push("/RankingList")} value="6" />
              </TabList>
            </Box>
          </TabContext>
        </Box>

      </div>
    );
  }
  else if(authContext.displayName == "管理員"){
    return(
      <div>
        <Box sx={{ width: '100%' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="輔園" onClick={() => router.push("/FuYuan")} value="1" />
                <Tab label="心園" onClick={() => router.push("/XinYuan")} value="2" />
                <Tab label="理園" onClick={() => router.push("/LiYuan")} value="3" />
                <Tab label="誠園" onClick={() => router.push("/ChengYuan")} value="4" />
                <Tab label="登出" onClick={() => router.push("/account")} value="5" />
                <Tab label="帳號管理" onClick={() => router.push("/Menager")} value="6" />
                <Tab label="排行榜" onClick={() => router.push("/RankingList")} value="7" />
              </TabList>
            </Box>
          </TabContext>
        </Box>

      </div>
    )
  }
  else {
    return (

      <div>
        <Box sx={{ width: '100%' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="輔園" onClick={() => router.push("/FuYuan")} value="1" />
                <Tab label="心園" onClick={() => router.push("/XinYuan")} value="2" />
                <Tab label="理園" onClick={() => router.push("/LiYuan")} value="3" />
                <Tab label="誠園" onClick={() => router.push("/ChengYuan")} value="4" />
                <Tab label="登出" onClick={() => router.push("/account")} value="5" />
                <Tab label="菜單管理" onClick={() => router.push("/menuChange")} value="6" />
                <Tab label="排行榜" onClick={() => router.push("/RankingList")} value="7" />
              </TabList>
            </Box>
          </TabContext>
        </Box>

      </div>
    );
  }
}

else{
  return(
    <div>
        <Box sx={{ width: '100%' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="輔園" onClick={() => router.push("/FuYuan")} value="1" />
                <Tab label="心園" onClick={() => router.push("/XinYuan")} value="2" />
                <Tab label="理園" onClick={() => router.push("/LiYuan")} value="3" />
                <Tab label="誠園" onClick={() => router.push("/ChengYuan")} value="4" />
                <Tab label="登入/註冊" onClick={() => router.push("/account")} value="5" />
              </TabList>
            </Box>
          </TabContext>
        </Box>

      </div>
  )
}
}
