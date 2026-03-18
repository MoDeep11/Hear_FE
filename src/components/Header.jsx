import styled from "@emotion/styled";
import Logo from "../assets/logo.svg";
import Log from "../assets/Login.svg";

const Header = () => {
  return (
    <HeaderBody>
      <HeaderLeft>
        <img src={Logo} alt="HEAR_FOR_YOU" />
      </HeaderLeft>
      
      <HeaderMiddle>
        <MenuText>홈</MenuText>
        <MenuText>AI일기</MenuText>
        <MenuText>사진첩</MenuText>
        <MenuText>통계</MenuText>
      </HeaderMiddle>
      
      <HeaderRight>
        <LoginImgBox>
          <img src={Log} alt="Login" />
        </LoginImgBox>
        <LoginText>로그인</LoginText>
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
  padding: 0 80px; /* 데스크탑 여백 유지 */
  box-sizing: border-box;

  @media (max-width: 1024px) {
    padding: 0 30px; /* 화면 줄어들면 여백만 먼저 축소 */
  }
`;

const HeaderLeft = styled.div`
  width: 75px;
  height: 35px;
  flex-shrink: 0;
`;

const HeaderMiddle = styled.div`
  width: 423px; /* 기존 디자인 수치 고정 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto; /* 로고와 로그인 사이 정중앙 배치 */

  @media (max-width: 768px) {
    max-width: 320px; /* 폰 화면에서 메뉴 간격 축소 */
  }
`;

const MenuText = styled.p`
  padding: 8px 28px; /* 기존 디자인 여백 유지 */
  color: #867853;
  font-size: 16px;
  font-weight: 600;
  border-radius: 50px;
  white-space: nowrap; 
  cursor: pointer;
  transition: 0.2s;

  &:nth-of-type(1) { background-color: #FFE39A; }
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