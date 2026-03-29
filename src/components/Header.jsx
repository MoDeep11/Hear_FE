import styled from "@emotion/styled";
import Logo from "../assets/logo.svg";
import Log from "../assets/Login.svg";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate()
  const Locate = useLocation();

  return (
    <HeaderBody>
      <HeaderLeft onClick={() => navigate("/")}>
        <img src={Logo} alt="HEAR_FOR_YOU" />
      </HeaderLeft>
      
      <HeaderMiddle>
        <MenuText onClick={() => navigate("/home")} isActive={location.pathname === "/home"}>홈</MenuText>
        <MenuText onClick={() => navigate("/ai/chats")} isActive={location.pathname === "/ai/chats"}>AI일기</MenuText>
        <MenuText onClick={() => navigate("/photobook")} isActive={location.pathname === "/photo"}>사진첩</MenuText>
        <MenuText onClick={() => navigate("/statics")} isActive={location.pathname === "/statics"}>통계</MenuText>
      </HeaderMiddle>
      
      <HeaderRight>
        <LoginImgBox>
          <img src={Log} alt="Login" />
        </LoginImgBox>
        <LoginText onClick={() => navigate("/login")}>로그인</LoginText>
      </HeaderRight>
    </HeaderBody>
  );
};

const HeaderBody = styled.div`
  width: 100%;
  height: 56px;
  background-color: #fcd671;
  display: flex;
  justify-content: space-between; 
  align-items: center;
  padding: 0 80px; 
  box-sizing: border-box;

  @media (max-width: 1024px) {
    padding: 0 30px; 
  }
`;

const HeaderLeft = styled.div`
  width: 75px;
  height: 35px;
  flex-shrink: 0;
  cursor: pointer;
`;

const HeaderMiddle = styled.div`
  width: 423px; 
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;

  @media (max-width: 768px) {
    max-width: 320px;
  }
`;

const MenuText = styled.p`
  padding: 8px 28px;
  color: #867853;
  font-size: 16px;
  font-weight: 600;
  border-radius: 50px;
  white-space: nowrap; 
  cursor: pointer;
  transition: 0.2s;
  background-color: ${(props) => (props.isActive ? "#FFE39A" : "transparent")};
  &:hover { background-color: #FFE39A; }

  @media (max-width: 850px) {
    padding: 8px 15px; 
    font-size: 14px;
  }
`;

const HeaderRight = styled.div`
  width: 81px;
  height: 35px;
  background-color: #ffe39a;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  padding: 8px 5px;
  flex-shrink: 0;
  cursor: pointer;
`;

const LoginImgBox = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
`;

const LoginText = styled.div`
  color: #867853;
  font-size: 16px;
  font-weight: 700;
`;

export default Header;