// 회원가입

import styled from "@emotion/styled";
import Header from "../components/Header.jsx";
import Left from "../assets/Left.svg";
import Right from "../assets/Right.svg";
import Arrow from "../assets/Arrow.svg";
import Check_Password from "../assets/SeePass.svg";

const SignUp = () => {
  return (
    <Body>
      <Header></Header>
      <Login_middle>
        <Login_first>
          <img src={Left} alt="로그인 하세여~" />
          <Login_box>
            <Out_login>
              <Arrow_btn src={Arrow} alt="나가기"></Arrow_btn>
              <Login_main>
                <Login_title>sign up</Login_title>
                <Email_box>
                  <Email_title>이메일</Email_title>
                  <Email_input>
                    <Email_text placeholder="이메일을 입력해주세요"></Email_text>
                    <Email_check_btn>코드 발송</Email_check_btn>
                  </Email_input>
                  <Email_check_box>
                    <Email_check_input placeholder="발송된 인증 코드를 입력해주세요"></Email_check_input>
                    <Check_timer>3:00</Check_timer>
                  </Email_check_box>
                </Email_box>
                <Password_box>
                  <Password_title>비밀번호</Password_title>
                  <Password_input>
                    <Password_text
                      type="password"
                      placeholder="비밀번호를 입력해주세요"
                    ></Password_text>
                    <img src={Check_Password} alt="비밀번호 표시" />
                  </Password_input>
                </Password_box>
                <Password_box>
                  <Password_title>비밀번호 확인</Password_title>
                  <Password_input>
                    <Password_text
                      type="password"
                      placeholder="비밀번호를 다시 입력해주세요"
                    ></Password_text>
                    <img src={Check_Password} alt="비밀번호 표시" />
                  </Password_input>
                </Password_box>

                <Btn_box>
                  <Login_btn>회원가입</Login_btn>
                  <Check_in>
                    <Check_text>계정이 있으신가요?</Check_text>
                    <Check_account>로그인</Check_account>
                  </Check_in>
                </Btn_box>
              </Login_main>
            </Out_login>
          </Login_box>
          <img src={Right} alt="로그인..하세여.." />
        </Login_first>
      </Login_middle>
    </Body>
  );
};

const Body = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Login_middle = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 70px 0;
`;

const Login_first = styled.div`
  display: flex;
  align-items: center;
`;

const Login_box = styled.div`
  width: 520px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Out_login = styled.div`
  position: relative;
  width: 520px;
  height: 572px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 71px 98.5px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);
`;

const Arrow_btn = styled.img`
  width: 16px;
  height: 16px;
  position: absolute;
  left: 44px;
  top: 24px;
  cursor: pointer;
`;

const Login_main = styled.div`
  width: 322px;
  height: 433px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0;
`;

const Login_title = styled.p`
  font-weight: 700;
  font-size: 36px;
  line-height: 21px;
  color: #867853;
  margin-bottom: 32px;
  font-style: Pretendard;
`;

const Email_box = styled.div`
  width: 392px;
  height: auto;
  gap: 16px;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  margin-bottom: 16px;
`;
const Email_title = styled.p`
  color: #575141;
  font-size: 16px;
  font-weight: 500;
`;

const Email_input = styled.div`
    width: 100%;
    display: flex;
    gap: 12px;
    align-items: center;
`
const Email_text = styled.input`
  width: 280px;
  height: 39px;
  border: 1px solid #bdbdbd;
  padding-left: 16px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 12px;
  display: flex;
  align-items: center;
  ::placeholder {
    color: #bdbdbd;
  }
  :focus {
    outline: none;
  }
`;
const Email_check_btn = styled.button`
  width: 100px;
  height: 40px;
  border: none;
  border-radius: 12px;
  color: #575141;
  background-color: #FCD671;
  font-size: 16px;
  font-weight: 600;
  transition: 0.1s ease-in;
    :hover {
    color: white;
    background-color: #daa005;
    cursor: pointer;
  }
  
`
const Email_check_box = styled.div`
  width: 392px;
  height: 39px;
  border: 1px solid #bdbdbd;
  padding: 0 16px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 12px;
  display: flex;
  align-items: center;
  overflow: hidden;
  box-sizing: border-box;
  ::placeholder {
    color: #bdbdbd;
  }
  :focus {
    outline: none;
  }
`
const Email_check_input = styled.input`
  width: 360px;
  height: 100%;
  border: none;
  font-size: 16px;
  font-weight: 500;
  border-radius: 12px;
  display: flex;
  align-items: center;
  ::placeholder {
    color: #bdbdbd;
  }
  :focus {
    outline: none;
  }
`
const Check_timer = styled.p`
  display: flex;
  align-items: center;
  height: 42px;
  margin-bottom: 2px;
  color: #DAA005;
`
const Password_box = styled.div`
width: 392px;
height: auto;
gap: 4px;
display: flex;
flex-direction: column;
align-items: baseline;
`;
const Password_title = styled.p`
color: #575141;
font-size: 16px;
font-weight: 500;
`;
const Password_input = styled.div`
  width: 392px;
  height: 42px;
  border: 1px solid #BDBDBD;
  display: flex;
  align-items: center;
  padding: 16px;
  border-radius: 12px;
`
const Password_text = styled.input`
width: 392px;
height: 38px;
border: none;
font-size: 16px;
font-weight: 500;
border-radius: 12px;
display: flex;
align-items: center;
::placeholder{
  color: #BDBDBD;
}
:focus {
  outline: none;
}
`;

const Btn_box = styled.div`
  width: 392px;
  width: 66px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  gap: 6px;
`;
const Login_btn = styled.div`
  width: 392px;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fcd671;
  border-radius: 12px;
  color: #575141;
  font-size: 16px;
  font-weight: 600;
  transition: 0.1s ease-in;
  :hover {
    color: white;
    background-color: #daa005;
    cursor: pointer;
  }
`;
const Check_in = styled.div`
  display: flex;
  width: 392px;
  align-items: center;
  justify-content: center;
  gap: 2px;
`;
const Check_text = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #828282;
`;
const Check_account = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: #daa005;
  text-decoration: underline;
  transition: 0.1s ease-in;
  :hover {
    color: #fcd671;
    cursor: pointer;
  }
`



export default SignUp;
