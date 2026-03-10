// 헤더

import styled from "@emotion/styled";
import Logo from "../assets/logo.svg";
import Log from "../assets/Login.svg";

const Header = () => {
  return (
    <Body>
      <Left>
        <img src={Logo} alt="HEAR_FOR_YOU" />
      </Left>
      <Middle>
        <Middle_text>홈</Middle_text>
        <Middle_text>AI일기</Middle_text>
        <Middle_text>사진첩</Middle_text>
        <Middle_text>통계</Middle_text>
      </Middle>
      <Right>
        <Login_img>
          <img src={Log} alt="Login" />
        </Login_img>
        <Login_text>로그인</Login_text>
      </Right>
    </Body>
  );
};

const Body = styled.div`
  width: 100%;
  height: 56px;
  background-color: #fcd671;
  display: flex;
  justify-content: space-between;
  padding: 10.5px 80px;
`;

const Left = styled.div`
  width: 75px;
  height: 35px;
  margin: 0;
  padding: 0;
`;

const Middle = styled.div`
  width: 423px;
  height: 35px;
  display: flex;
  justify-content: space-between;
`;

const Middle_text = styled.p`
  padding: 8px 28px;
  color: #867853;
  font-size: 16px;
  font-weight: 600;
  border-radius: 50px;
  display: flex;
  align-items: center;
  transition: 0.3s ease-in;
  :nth-child(1) {
    background-color: #FFE39A;
  }
  :hover {
    background-color: #FFE39A;
    cursor: pointer;
  }
`;

const Right = styled.div`
  width: 81px;
  height: 35px;
  background-color: #ffe39a;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 3px;
  padding: 8px 5px;
`;
const Login_img = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  justify-items: baseline;
  align-items: center;
`;

const Login_text = styled.div`
  width: 60px;
  display: flex;
  align-items: center ;
  height: 19px;
  color: #867853;
  font-size: 16px;
  font-weight: 700;
`;

export default Header;
