// 마이페이지

import styled from "@emotion/styled";
import Header from "../components/Header.jsx";
import Happy from "../assets/Happy.svg";
import Edit_pen from "../assets/Edit_pen.svg";
import Profile from "../assets/Profile.svg";
import ReverseArrow from "../assets/Rev-Arrow.svg";
import Sad from "../assets/Sadness.svg";
import Arrow from "../assets/Arrow.svg";
import Random from "../assets/random.svg"
import Upload_btnimg from "../assets/Upload_btn.svg"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Mypage = () => {

  const user_info = {
  "status": "success",
  "data": {
    "userId": 102,
    "email": "seungri@example.com",
    "nickname": "쿠수리",
    "profileImageUrl": "https://s3.../profiles/user_102.png",
    "createdAt": "2025-06-09T10:00:00Z",
    "updatedAt": "2026-03-04T23:55:00Z"
  }
} 

  const [isChangeModal, setIsChangeModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isPwModal, setIsPwModal] = useState(false);

  const navigate = useNavigate()
  
  return (
    <Body>
      <Header />
      <Page_container>
        <Page_main>
          <Info_box>
            <Profile_box>
              <Profile_img onClick={()=>{setIsChangeModal(true)}}>
                <Img_box>
                  <img src={Profile} alt="" />
                </Img_box>
                <Img_edit>
                  <img src={Edit_pen} alt="" />
                </Img_edit>
              </Profile_img>
              <Nickname_box>
                <Nick_name>
                  {user_info.data.nickname}
                  <Nickname_edit onClick={()=>{setIsChangeModal(true)}}>
                    <img src={Edit_pen} alt="" />
                  </Nickname_edit>
                </Nick_name>
                <Email>{user_info.data.email}</Email>
              </Nickname_box>
            </Profile_box>
            <Check_box>
              <Email_box>
                <Email_text>이메일 알림</Email_text>
                <Email_check>
                  <Email_checkbtn></Email_checkbtn>
                </Email_check>
              </Email_box>
              <Password_change>
                <Password_text>비밀번호 변경</Password_text>
                <Password_click onClick={()=>{setIsPwModal(true)}}>
                  <img src={ReverseArrow} alt="" />
                </Password_click>
              </Password_change>
            </Check_box>
            <Log_box>
              <Log_out onClick={()=>{navigate("/")}}>로그아웃</Log_out>
              <User_delete onClick={()=>{setIsDeleteModal(true)}}>회원 탈퇴</User_delete>
            </Log_box>
          </Info_box>
          <Guitar_box>
            <Locate_box>
              <Locate_text>
                더 나은 서비스를 위해 의견을 들려주세요!
              </Locate_text>
              <Locate_btn>
                설문조사 하러가기 <img src={ReverseArrow} alt="" />
              </Locate_btn>
            </Locate_box>
            <Character>
              <img src={Happy} alt="해피!" />
            </Character>
          </Guitar_box>
        </Page_main>
      </Page_container>

      {/*계정 탈퇴 모달*/}
{isDeleteModal && 
      <Delete_modalback onClick={() => {setIsDeleteModal(false)}}>
        <Modal_main onClick={(e) => {e.stopPropagation()}}>
          <Delete_textbox>
            <Sadness>
            <img src={Sad} alt="" />
          </Sadness>
          <Text_box>
            <Check_title>정말 탈퇴하시겠어요?</Check_title>
            <Check_text>
              지금 탈퇴하시면 작성하신 일기 추억들을 다시 볼 수 없게됩니다.{" "}
              <span>그래도 탈퇴를 진행하시겠어요?</span>
            </Check_text>
          </Text_box>
            
          </Delete_textbox>

          <Delete_btnbox >
            <Delete_button onClick={()=>{navigate("/")}}>회원탈퇴</Delete_button>
            <Cancel_button onClick={()=>{setIsDeleteModal(false)}}>취소</Cancel_button>
          </Delete_btnbox>
        </Modal_main>
      </Delete_modalback>
}

      {/* 비밀번호 변경 모달 */}
      {isPwModal&&
      <Password_back onClick={() => {setIsPwModal(false)}}>
        <Password_modal onClick={(e) => {e.stopPropagation()}}>
          <Out_modal onClick={()=>{setIsPwModal(false)}}>
            <img src={Arrow} alt="" />
          </Out_modal>
          <Change_box>
            <Input_box>
              <Pass_box>
                <Change_pass>비밀번호</Change_pass>
                <Pass_input placeholder="변경할 비밀번호를 입력해주세요"></Pass_input>
              </Pass_box>
              <Checking_box>
                <Check_pass>비밀번호 확인</Check_pass>
                <Check_input placeholder="변경할 비밀번호를 다시 입력해주세요"></Check_input>
              </Checking_box>
            </Input_box>
            <Save_button onClick={()=>{setIsPwModal(false)}}>저장</Save_button>
          </Change_box>
        </Password_modal>
      </Password_back>
}

      {/*프로필 변경 모달*/}
      {isChangeModal &&
      <Profile_modalback onClick={() => {setIsChangeModal(false)}}>
        <Profile_modal onClick={(e) => {e.stopPropagation()}}>
          <Out_modal onClick={()=>{setIsChangeModal(false)}}>
            <img src={Arrow} alt="" />
          </Out_modal>
          <Pf_modalmain>
            <Profile_change>
              <Change_imgbox>
                <Change_img>
                  <img src={Profile} alt="" />
                </Change_img>
                <Profile_rand>
                  <img src={Random} alt="" />
                </Profile_rand>
              </Change_imgbox>
              <Change_nickbox>
                <Nick_text>닉네임 변경</Nick_text>
                <Nick_input placeholder="변경할 닉네임을 입력해주세요"></Nick_input>
              </Change_nickbox>
            </Profile_change>
            <Profile_btnbox>
              <Img_upload>
              <img src={Upload_btnimg} alt="" width={16} height={16}/>
              파일 업로드
              </Img_upload>
              <Save_btn onClick={()=>{setIsChangeModal(false)}}>저장</Save_btn>
            </Profile_btnbox>
          </Pf_modalmain>
        </Profile_modal>
      </Profile_modalback>
}
    </Body>
  );
};

const Body = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f3f3f3;
  overflow-y: hidden;
  position: relative;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Page_container = styled.div`
  width: 100%;
  height: calc(100% - 56px);
  display: flex;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  padding: 50px 80px 57px 80px;
`;

const Page_main = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 44px 64px;
  position: relative;
  border-radius: 12px;
`;
const Info_box = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 40%;
  gap: 12px;
`;
const Profile_box = styled.div`
  width: 1078px;
  height: 84px;
  padding: 12px;
  gap: 16px;
  display: flex;
  align-items: center;
`;
const Profile_img = styled.div`
  width: 60px;
  height: 60px;
  border: 2px solid #e0e0e0;
  border-radius: 50px;
  background-color: #cfcfcf;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
`;
const Img_box = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Img_edit = styled.div`
  position: absolute;
  bottom: -4px;
  right: 2px;
`;
const Nickname_box = styled.div`
  display: flex;
  flex-direction: column;
`;
const Nick_name = styled.div`
  display: flex;
  font-size: 24px;
  font-weight: 700;
  color: #000;
  gap: 6px;
  align-items: center;
`;
const Nickname_edit = styled.div`
  display: flex;
  cursor: pointer;
`;
const Email = styled.p`
  color: #828282;
  font-weight: 500;
  font-size: 16px;
`;
const Check_box = styled.div`
  width: 100%;
  height: 120px;
  padding: 26.5px 12px;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  box-sizing: border-box;
`;
const Email_box = styled.div`
  height: 48px;
  display: flex;
  justify-content: space-between;
`;
const Email_text = styled.div`
  font-size: 16px;
  font-weight: 500;
`;
const Email_check = styled.div`
  width: 46px;
  height: 24px;
  border: 1px solid #e0e0e0;
  box-sizing: border-box;
  border-radius: 50px;
  background-color: #fff;
  transition: 0.1s ease-in;
  position: relative;
  cursor: pointer;
  &:focus-within {
    background-color: #fcd671;
    border-color: #fcd671;
  }
  &:focus-within > button {
    background-color: #fff;
    left: 25px;
  }
`;
const Email_checkbtn = styled.button`
  width: 18px;
  height: 18px;
  position: absolute;
  left: 3px;
  top: 2px;
  background-color: #fcd671;
  border: none;
  border-radius: 50px;
  transition: 0.2s ease-in;
  z-index: 1;
  outline: none;
`;
const Password_change = styled.div`
  height: 48px;
  display: flex;
  justify-content: space-between;
`;
const Password_text = styled.div`
  font-size: 16px;
  font-weight: 500;
`;
const Password_click = styled.div`
  cursor: pointer;
`;
const Log_box = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 98px;
  padding: 12px;
  box-sizing: border-box;
  gap: 24px;
`;
const Log_out = styled.p`
  color: #828282;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
`;
const User_delete = styled.p`
  color: #e21414;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
`;
const Guitar_box = styled.div`
  width: 342px;
  height: 80px;
  position: absolute;
  right: 46px;
  bottom: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px;
`;
const Locate_box = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  gap: 8px;
`;
const Locate_text = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #828282;
`;
const Locate_btn = styled.button`
  border: none;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #575141;
  background-color: #fcd671;
`;
const Character = styled.div`
  width: 80px;
  height: 80px;
`;

const Delete_modalback = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Modal_main = styled.div`
  width: 478px;
  height: 378px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border-radius: 12px;
  padding: 48px 64px;
  justify-content: space-between;
`;
const Sadness = styled.div``;
const Delete_textbox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;
const Text_box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Check_title = styled.div`
  font-size: 20px;
  font-weight: 600;
`;
const Check_text = styled.div`
  display: flex;
  width: 120%;
  flex-direction: column;
  font-size: 14px;
  font-weight: 500;
  align-items: center;
  color: #828282;
`;
const Delete_btnbox = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 32px;
`;
const Delete_button = styled.button`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  border: 1.5px solid #e21414;
  box-sizing: border-box;
  background-color: #ffdfdf;
  color: #e21414;
  font-size: 16px;
  font-weight: 600;
  padding: 5px 0;
  cursor: pointer;
`;
const Cancel_button = styled.button`
  width: 100%;
  height: 100%;
  display: flex;
  color: #828282;
  background: none;
  border: none;
  font-size: 16px;
  font-weight: 600;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Password_back = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Password_modal = styled.div`
  position: relative;
  width: 480px;
  height: 352px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 12px;
  padding: 70px 79px;
  gap: 16px;
`;
const Out_modal = styled.div`
  position: absolute;
  display: flex;
  left: 24px;
  top: 24px;
  cursor: pointer;
`;
const Change_box = styled.div`
  display: flex ;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  gap: 32px;
`;

const Input_box = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`
const Pass_box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const Change_pass = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #575141;
`;
const Pass_input = styled.input`
width: 100%;
height: 100%;
font-weight: 500;
font-size: 16px;
border: 1px solid #CFD3DC;
padding: 9.5px 16px;
border-radius: 12px;
::placeholder {
  color: #CFD3DC;
}
`;
const Checking_box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;

`;
const Check_pass = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #575141;
`;
const Check_input = styled.input`
width: 100%;
height: 100%;
font-weight: 500;
font-size: 16px;
border: 1px solid #CFD3DC;
padding: 9.5px 16px;
border-radius: 12px;
::placeholder {
  color: #CFD3DC;
}
`;
const Save_button = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  background-color: #FCD671;
  color: #575141;
  border-radius: 12px;
  cursor: pointer;
`;

const Profile_modalback = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
`

const Profile_modal = styled.div`
  width: 480px;
  height: 352px;
  background-color: #fff;
  padding: 63px 81px;
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
`
const Pf_modalmain = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 32px;
`
const Profile_change = styled.div`
  gap: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Change_imgbox = styled.div`
  width: 60px;
  height: 60px;
  background-color: #CFCFCF;
  border: 2px solid #E0E0E0;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
`
const Change_img = styled.div`
width: 40px;
height: 40px;
`
const Profile_rand = styled.div`
  position: absolute;
  right: -7px;
  bottom: -7px;
  width: 22px;
  height: 22px;
  display: flex;
  background-color: #fff;
  border: 1px solid #F3F3F3;
  border-radius: 12px;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
`
const Change_nickbox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
`
const Nick_text = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #575141;
`
const Nick_input = styled.input`
  width: 100%;
  height: auto;
  padding: 9.5px 16px;
  font-size: 16px;
  font-weight: 500;
  border: 1px solid #CFD3DC;
  border-radius: 12px;
  ::placeholder{
    color: #CFD3DC;
  }
  :focus{
    outline: none;
  }
`
const Profile_btnbox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 12px;

`
const Img_upload = styled.button`
  width: 100%;
  border: 2px solid #FCD671;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  color: #575141;
  font-weight: 600;
  font-size: 16px;
  border-radius: 12px;
  box-sizing: border-box;
`
const Save_btn = styled.button`
  width: 100%;
  background-color: #fcd671;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  box-sizing: border-box;
  color: #575141;
  font-weight: 600;
  font-size: 16px;
  border-radius: 12px;
  cursor: pointer;
`

export default Mypage;