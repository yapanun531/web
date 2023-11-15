'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useRouter } from 'next/navigation';

export default function Menu() {
    const [value, setValue] = React.useState('1');
    const router = useRouter()

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      setValue(newValue);
    };

  return (
    
    <div>
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="誠園" onClick={() => router.push("/ChengYuan")} value="1" />
            <Tab label="心園" onClick={() => router.push("/XinYuan") }value="2" />
            <Tab label="理園" onClick={() => router.push("/LiYuan") }value="3" />
            <Tab label="輔園" onClick={() => router.push("/FuYuan") }value="4" />
            <Tab label="登入/註冊" onClick={() => router.push("/account") }value="5" />
          </TabList>
        </Box>
        <TabPanel value="1">菜單一覽A</TabPanel>
        <TabPanel value="2">菜單一覽</TabPanel>
        <TabPanel value="3">菜單一覽</TabPanel>
        <TabPanel value="4">菜單一覽</TabPanel>
      </TabContext>
    </Box>
     
    </div>
    
  );
}