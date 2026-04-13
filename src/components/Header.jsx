import styled from "@emotion/styled";
import Logo from "../assets/logo.svg";
import Log from "../assets/Login.svg";
import User from "../assets/User.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isLogin = !!localStorage.getItem("accessToken");

  const [, forceUpdate] = useState(0);
  useEffect(() => {
    const handleStorage = () => forceUpdate((n) => n + 1);
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <HeaderBody>
      <HeaderLeft>
        <img src={Logo} alt="HEAR_FOR_YOU" />
      </HeaderLeft>

      {/* 로그인 시에만 표시 */}
      {isLogin && (
        <HeaderMiddle>
          <MenuText
            onClick={() => navigate("/home")}
            isActive={location.pathname === "/home"}
          >
            홈
          </MenuText>
          <MenuText
            onClick={() => navigate("/ai/chats")}
            isActive={location.pathname === "/ai/chats"}
          >
            AI일기
          </MenuText>
          <MenuText
            onClick={() => navigate("/photobook")}
            isActive={location.pathname === "/photobook"}
          >
            사진첩
          </MenuText>
          <MenuText
            onClick={() => navigate("/statics")}
            isActive={location.pathname === "/statics"}
          >
            통계
          </MenuText>
        </HeaderMiddle>
      )}

      <HeaderRight isLogin={isLogin}>
        {isLogin ? (
          <Login_complete onClick={() => navigate("/mypage")}>
            <User_page>
              <img src={User} alt="마이페이지" />
            </User_page>
          </Login_complete>
        ) : (
          <LoggedOutWrapper onClick={() => navigate("/login")}>
            <LoginImgBox>
              <img src={Log} alt="Login" />
            </LoginImgBox>
            <LoginText>로그인</LoginText>
          </LoggedOutWrapper>
        )}
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
  &:hover {
    background-color: #ffe39a;
  }

  @media (max-width: 850px) {
    padding: 8px 15px;
    font-size: 14px;
  }
`;

const HeaderRight = styled.div`
  min-width: 81px;
  height: 35px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  flex-shrink: 0;
  cursor: pointer;

  background-color: ${(props) => (props.isLogin ? "transparent" : "#ffe39a")};
`;
const Login_complete = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const User_page = styled.div`
  width: 24px; /* 아이콘 크기 적절히 조절 */
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const LoggedOutWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
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
