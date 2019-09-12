import React, { useState } from "react";
import { WindowHeader, WindowContent, Tabs, Tab, TabBody } from "react95";
import { AuthContainer, AuthWindow } from "../../styles";
import Login from "./Login";
import SignUp from "./SignUp";

function Auth() {
  const [tab, setTab] = useState(0);
  return (
    <AuthContainer>
      <AuthWindow>
        <WindowHeader>social app 95</WindowHeader>
        <WindowContent>
          <Tabs value={tab} onChange={value => setTab(value)}>
            <Tab value={0}>login</Tab>
            <Tab value={1}>sign up</Tab>
          </Tabs>
          {tab === 0 && (
            <TabBody>
              <Login />
            </TabBody>
          )}
          {tab === 1 && (
            <TabBody>
              <SignUp />
            </TabBody>
          )}
        </WindowContent>
      </AuthWindow>
    </AuthContainer>
  );
}

export default Auth;
