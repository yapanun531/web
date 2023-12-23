'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { usePathname, useRouter } from 'next/navigation';
import { useContext } from 'react';
import { AuthContext } from './account/AuthContext';

export default function Menu() {
  const [value, setValue] = React.useState('1');
  const router = useRouter()
  const pathname = usePathname();
  const authContext = useContext(AuthContext);



  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  if (authContext.displayName == "普通") {
    return (

      <div>
        <Box sx={{ width: '100%' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="誠園" onClick={() => router.push("/ChengYuanCustomer")} value="1" />
                <Tab label="心園" onClick={() => router.push("/XinYuanCustomer")} value="2" />
                <Tab label="理園" onClick={() => router.push("/LiYuanCustomer")} value="3" />
                <Tab label="輔園" onClick={() => router.push("/FuYuanCustomer")} value="4" />
                <Tab label="登入/註冊" onClick={() => router.push("/account")} value="5" />
                <Tab label="菜單管理" onClick={() => router.push("/menuChange")} value="6" />
              </TabList>
            </Box>
          </TabContext>
        </Box>

      </div>
    );
  }
  else {
    return (

      <div>
        <Box sx={{ width: '100%' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="誠園" onClick={() => router.push("/ChengYuan")} value="1" />
                <Tab label="心園" onClick={() => router.push("/XinYuan")} value="2" />
                <Tab label="理園" onClick={() => router.push("/LiYuan")} value="3" />
                <Tab label="輔園" onClick={() => router.push("/FuYuan")} value="4" />
                <Tab label="登入/註冊" onClick={() => router.push("/account")} value="5" />
                <Tab label="菜單管理" onClick={() => router.push("/menuChange")} value="6" />
              </TabList>
            </Box>
          </TabContext>
        </Box>

      </div>
    );
  }
}