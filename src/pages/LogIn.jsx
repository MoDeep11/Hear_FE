// 로그인
import styled from "@emotion/styled";
import Header from "../components/Header.jsx";
import Left from "../assets/Left.svg";
import Right from "../assets/Right.svg";
import Arrow from "../assets/Arrow.svg";
import Check_Password from "../assets/SeePass.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../apis/auth.js"

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [message, setMessage] = useState("");
  const [pwmessage, setPwmessage] = useState("");

  const handleSubmit = async (e) => {
    setMessage("");
    setPwmessage("");
    e.preventDefault();

    try {
      const data = await login(request_body);

      const token = data.accessToken || data.data?.accessToken;

      if (token) {
        localStorage.setItem("accessToken", token);
        alert("로그인 성공!");
        navigate("/"); 
      }
    } catch (error) {
      alert(
        "로그인 실패: " +
          (error.response?.data?.message || "정보를 확인해주세요."),
      );
    }
    if (!password && !email) {
      setMessage("이메일을 입력해주세요");
      setPwmessage("비밀번호를 입력해주세요");
      return;
    } else if (!password) {
      setPwmessage("비밀번호를 입력해주세요");
      return;
    } else if (!email) {
      setMessage("이메일을 입력해주세요");
      return;
    }
  };
  const request_body = {
    email: email,
    password: password,
  };


  return (
    <Body>
      <Header></Header>
      <Login_middle>
        <Login_first>
          <img src={Left} alt="왼쪽 캐릭터" />
          <Login_box>
            <Out_login>
              <Arrow_btn
                src={Arrow}
                alt="나가기"
                onClick={() => {
                  navigate("/");
                }}
              ></Arrow_btn>
              <Login_main>
                <Login_title>Log in</Login_title>
                <Email_box>
                  <Email_title>이메일</Email_title>
                  <Email_text
                    type="text"
                    placeholder="이메일을 입력해주세요"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Email_text>
                  <Email_check_text>{message}</Email_check_text>
                </Email_box>

                <Password_box>
                  <Password_title>비밀번호</Password_title>
                  <Password_input>
                    <Password_text
                      type={showPw ? "text" : "password"}
                      placeholder="비밀번호를 입력해주세요"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    ></Password_text>
                    <img
                      src={Check_Password}
                      alt="비밀번호 확인"
                      onClick={() => setShowPw((v) => !v)}
                      title={showPw ? "숨기기" : "보기"}
                    />
                  </Password_input>
                  <Email_check_text>{pwmessage}</Email_check_text>
                </Password_box>

                <Btn_box>
                  <Login_btn onClick={handleSubmit}>로그인</Login_btn>
                  <Check_in>
                    <Check_text>계정이 없으신가요?</Check_text>
                    <Check_account onClick={() => navigate("/signup")}>
                      회원가입
                    </Check_account>
                  </Check_in>
                </Btn_box>
              </Login_main>
            </Out_login>
          </Login_box>
          <img src={Right} alt="오른쪽 캐릭터" />
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
  height: 500px;
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
`;

const Login_main = styled.div`
  width: 322px;
  height: 303px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  gap: 4px;
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
const Email_text = styled.input`
  width: 392px;
  height: 42px;
  border: 1px solid #bdbdbd;
  padding-left: 16px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 12px;
  display: flex;
  align-items: center;
  &::placeholder {
    color: #bdbdbd;
  }
  &:focus {
    outline: none;
  }
`;
const Email_check_text = styled.p`
  font-size: 12px;
  font-weight: 500;
  padding: 0 4px;
  color: #e21414;
`;

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
  border: 1px solid #bdbdbd;
  display: flex;
  align-items: center;
  padding: 16px;
  border-radius: 12px;
`;
const Password_text = styled.input`
  width: 392px;
  height: 38px;
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
`;
const Btn_box = styled.div`
  width: 392px;
  height: 66px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-top: 32px;
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
  &:hover {
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
`;

export default Login;
