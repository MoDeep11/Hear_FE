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
      <Header></Header>
      <Main_middle>
        <Main_first>
          <img src={Left} alt="안녕하세여~!" />
          <Main_main>
            <Title_box>
              <img
                src={Logo}
                alt="Hear-나를 들어주는 일기장"
                width={297}
                height={150}
              />
              <Main_title>
                <Title_text>털어놓으면</Title_text>
                <Title_text>일기</Title_text>
                <Title_text>가 되고, 쌓이면</Title_text>
                <Title_text>내 마음이 보이는</Title_text>
                <Title_text>AI 감정 기록 서비스</Title_text>
              </Main_title>
            </Title_box>
            <Btn_box>
              <Login_btn>로그인</Login_btn>
              <Start_btn>
                시작하기 <img src={Arrow} alt="시작" transform={180} />
              </Start_btn>
            </Btn_box>
          </Main_main>
          <img src={Right} alt="안녕..하세여.." />
        </Main_first>
      </Main_middle>
    </Body>
  );
};

const Body = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Main_middle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 712px;
`;

const Main_first = styled.div`
  width: 1015px;
  height: 572px;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
`;
const Main_main = styled.div`
  width: 535px;
  height: 303px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
const Title_box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 166px;
  margin-bottom: 82px;
`;
const Main_title = styled.div`
  display: flex;
  gap: 1px;
`;
const Title_text = styled.div`
  font-weight: 600;
  color: #575141;
  font-size: 20px;
  white-space: nowrap;
  :nth-child(even) {
    color: #daa005;
  }
`;
const Btn_box = styled.div`
  width: 346px;
  height: 55px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Login_btn = styled.button`
  width: 138px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #575141;
  background-color: #ffffff;
  border: 2px solid #fcd671;
  border-radius: 12px;
  font-weight: 600;
  transition: 0.2s ease-in-out;
  :hover {
    background-color: #fcd671;
    color: #fff;
  }
`;
const Start_btn = styled.button`
  width: 176px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 48px;
  background-color: #fcd671;
  color: #575141;
  border: none;
  font-weight: 600;
  border-radius: 12px;
  transition: 0.2s ease-out;
  overflow: auto;
  :hover {
    background-color: #c7a443;
    color: #fff;
  }
`;

export default Main;
