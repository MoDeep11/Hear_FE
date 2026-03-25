//메인 (로그인 전의 첫 페이지) << 얘가 접속했을때 첫 화면. 로그인 하면 홈으로 넘어감

import styled from "@emotion/styled";
import Header from "../components/Header.jsx";
import Left from "../assets/Left.svg";
import Right from "../assets/Right.svg";
import Logo from "../assets/logo.svg";
import Arrow from "../assets/Rev-Arrow.svg";

const Main = () => {
  return (
    <Body>
      <Header />
      <Main_middle>
        <Main_first>
          <SideImg src={Left} alt="캐릭터 좌" />
          
          <Main_main>
            <Title_box>
              <LogoImg src={Logo} alt="Hear 로고" />
              <Main_title>
                <Title_text>
                  털어놓으면 <span>일기</span>가 되고,<br className="m-br" /> 
                  쌓이면 <span>내 마음이 보이는</span> AI 감정 기록 서비스
                </Title_text>
              </Main_title>
            </Title_box>
            <Btn_box>
              <Login_btn>로그인</Login_btn>
              <Start_btn>
                시작하기 <img src={Arrow} alt="시작" />
              </Start_btn>
            </Btn_box>
          </Main_main>

          <SideImg src={Right} alt="캐릭터 우" />
        </Main_first>
      </Main_middle>
    </Body>
  );
};

const Body = styled.div`
  width: 100vw;
  min-height: 100vh;
  overflow-x: hidden; 
  display: flex;
  flex-direction: column;
`;

const Main_middle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex: 1;
  padding: 0 20px;
  box-sizing: border-box;
`;

const Main_first = styled.div`
  width: 100%;
  max-width: 1100px; 
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const SideImg = styled.img`
  width: 200px;
  height: auto;
  flex-shrink: 0;

  @media (max-width: 1024px) {
    display: none; 
  }
`;

const Main_main = styled.div`
  width: 535px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 535px) {
    width: 100%;
  }
`;

const Title_box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
`;

const LogoImg = styled.img`
  width: 297px;
  height: auto;
  margin-bottom: 20px;
  @media (max-width: 350px) {
    width: 80%;
  }
`;

const Main_title = styled.div`
  display: flex;
  justify-content: center;
`;

const Title_text = styled.div`
  font-weight: 600;
  color: #575141;
  font-size: 19px;
  text-align: center;
  white-space: nowrap;
  line-height: 1.4;

  span { color: #DAA005; }

  .m-br { display: none; }

  @media (max-width: 600px) {
    white-space: normal;
    word-break: keep-all;
    .m-br { display: block; }
  }
`;

const Btn_box = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  align-items: center;
`;

const Login_btn = styled.button`
  width: 138px; 
  height: 55px;
  background: #fff;
  border: 2px solid #fcd671;
  border-radius: 12px;
  font-weight: 600;
  color: #575141;
  cursor: pointer;
  flex-shrink: 0;

  @media (max-width: 380px) {
    width: 110px; 
  }
`;

const Start_btn = styled.button`
  width: 176px;
  height: 55px;
  background: #fcd671;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  color: #575141;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  flex-shrink: 0;

  @media (max-width: 380px) {
    width: 140px;
  }
`;

export default Main;