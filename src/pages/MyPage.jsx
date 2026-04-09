import styled from "@emotion/styled";
import Header from "../components/Header.jsx";
import Happy from "../assets/Happy.svg";
import Edit_pen from "../assets/Edit_pen.svg";
import Profile from "../assets/Profile.svg";
import ReverseArrow from "../assets/Rev-Arrow.svg";
import Sad from "../assets/Sadness.svg";
import Arrow from "../assets/Arrow.svg";
import Random from "../assets/random.svg";
import Upload_btnimg from "../assets/Upload_btn.svg";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getMyInfo, updateProfile, changePassword, deleteUser, logout } from "../apis/mypages.api.js";

const Mypage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isChangeModal, setIsChangeModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isPwModal, setIsPwModal] = useState(false);

  const [newNickname, setNewNickname] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await getMyInfo();
        setUserInfo(res.data);
      } catch (error) {
        console.error("유저 정보 로드 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const [password, setPassword] = useState("");

  const handleOpenEditModal = () => {
    if (!userInfo) return;
    setNewNickname(userInfo.nickname);
    setPreviewImage(userInfo.profileImageUrl || Profile);
    setSelectedFile(null);
    setIsChangeModal(true);
  };

    const handleOpenDeleteModal = () => {
    if (!userInfo) return;
    setIsDeleteModal(true);
  };

      const handleOpenPwModal = () => {
    if (!userInfo) return;
    setConfirmPassword("");
    setPassword("")
    setNewPassword("")
    setIsPwModal(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

const handleSaveProfile = async () => {
  if (!newNickname.trim()) return alert("닉네임을 입력해주세요.");

  try {
    const formData = new FormData();

    const jsonBlob = new Blob(
        [JSON.stringify({ nickname: newNickname })], 
        { type: "application/json" }
    );
    
    formData.append("data", jsonBlob);
    formData.append("image", selectedFile ? selectedFile : null);

    const res = await updateProfile(formData);

    if (res.status === 200) {
      alert("프로필이 성공적으로 변경되었습니다.");
      setUserInfo((prev) => ({
        ...prev,
        nickname: newNickname,
        profileImageUrl: previewImage,
      }));
      setIsChangeModal(false);
    }
  } catch (error) {
    console.error("수정 실패:", error);
    alert("수정 중 오류가 발생했습니다.");
  }
};

  const handleChangePassword = async () => {
    if (!newPassword || newPassword !== confirmPassword) {
      return alert("비밀번호가 일치하지 않거나 입력되지 않았습니다.");
    }

    try {
      const res = await changePassword({
         oldPassword: password,
         newPassword: newPassword,
         confirmPassword: confirmPassword
        
        });
      if (res.status === 200) {
        alert("비밀번호가 변경되었습니다.");
        setIsPwModal(false);
      }
    } catch (error) {
      alert(
        "비밀번호 변경 실패: " + (error.response?.data?.message || "오류 발생"),
      );
    }
  };

const handleDeleteAccount = async () => {
  try {
    const res = await deleteUser(); 
    if (res.status === 200) {
      alert("탈퇴가 완료되었습니다.");
      localStorage.clear();
      navigate("/");
      window.location.reload();
    }
  } catch (error) {
    console.error("탈퇴 에러 상세:", error.response?.data);
    alert(error.response?.data?.message || "탈퇴 처리 중 오류가 발생했습니다.");
  }
};


const handleLogout = async () => {
  if (window.confirm("로그아웃 하시겠습니까?")) {
    try {
      await logout(); 
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("로그아웃 실패:", error);
      alert("로그아웃 실패")
    } 
  }
};

  if (isLoading)
    return (
      <Body>
        <Header />
        <div>로딩 중...</div>
      </Body>
    );
  if (!userInfo)
    return (
      <Body>
        <Header />
        <div>정보를 불러올 수 없습니다.</div>
      </Body>
    );

  return (
    <Body>
      <Header />
      <Page_container>
        <Page_main>
          <Info_box>
            <Profile_box>
              <Profile_img onClick={handleOpenEditModal}>
                <Img_box>
                  <img
                    src={userInfo.profileImageUrl || Profile}
                    alt="Profile"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Img_box>
              </Profile_img>
              <Nickname_box>
                <Nick_name>
                  {userInfo.nickname}
                  <Nickname_edit onClick={handleOpenEditModal}>
                    <img src={Edit_pen} alt="Edit" />
                  </Nickname_edit>
                </Nick_name>
                <Email>{userInfo.email}</Email>
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
                <Password_click onClick={handleOpenPwModal}>
                  <img src={ReverseArrow} alt="Change" />
                </Password_click>
              </Password_change>
            </Check_box>
            <Log_box>
              <Log_out onClick={handleLogout}>로그아웃</Log_out>
              <User_delete onClick={handleOpenDeleteModal}>
                회원 탈퇴
              </User_delete>
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

      {/* 계정 탈퇴 모달 */}
      {isDeleteModal && (
        <Delete_modalback onClick={() => setIsDeleteModal(false)}>
          <Modal_main onClick={(e) => e.stopPropagation()}>
            <Delete_textbox>
              <Sadness>
                <img src={Sad} alt="Sad" />
              </Sadness>
              <Text_box>
                <Check_title>정말 탈퇴하시겠어요?</Check_title>
                <Check_text>
                  지금 탈퇴하시면 작성하신 일기 추억들을 다시 볼 수 없게됩니다.{" "}
                  <span>그래도 탈퇴를 진행하시겠어요?</span>
                </Check_text>
              </Text_box>
            </Delete_textbox>
            <Delete_btnbox>
              <Delete_button onClick={handleDeleteAccount}>
                회원탈퇴
              </Delete_button>
              <Cancel_button onClick={() => setIsDeleteModal(false)}>
                취소
              </Cancel_button>
            </Delete_btnbox>
          </Modal_main>
        </Delete_modalback>
      )}

      {/* 비밀번호 변경 모달 */}
      {isPwModal && (
        <Password_back onClick={() => setIsPwModal(false)}>
          <Password_modal onClick={(e) => e.stopPropagation()}>
            <Out_modal onClick={() => setIsPwModal(false)}>
              <img src={Arrow} alt="Back" />
            </Out_modal>
            <Change_box>
              <Input_box>
              <Pass_box>
                  <Change_pass>기존 비밀번호</Change_pass>
                  <Pass_input placeholder="기존 비밀번호를 입력해주세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  />
                </Pass_box>
                <Pass_box>
                  <Change_pass>비밀번호</Change_pass>
                  <Pass_input placeholder="변경할 비밀번호를 입력해주세요"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  />
                </Pass_box>
                <Checking_box>
                  <Check_pass>비밀번호 확인</Check_pass>
                  <Check_input 
                  placeholder="변경할 비밀번호를 다시 입력해주세요"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Checking_box>
              </Input_box>
              <Save_button onClick={handleChangePassword}>
                저장
              </Save_button>
            </Change_box>
          </Password_modal>
        </Password_back>
      )}

      {/* 프로필 변경 모달 */}
      {isChangeModal && (
        <Profile_modalback onClick={() => setIsChangeModal(false)}>
          <Profile_modal onClick={(e) => e.stopPropagation()}>
            <Out_modal onClick={() => setIsChangeModal(false)}>
              <img src={Arrow} alt="Close" />
            </Out_modal>
            <Pf_modalmain>
              <Profile_change>
                <Change_imgbox>
                  <img
                    src={previewImage}
                    alt="Preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                  <Profile_rand>
                    <img src={Random} alt="Random" />
                  </Profile_rand>
                </Change_imgbox>
                <Change_nickbox>
                  <Nick_text>닉네임 변경</Nick_text>
                  <Nick_input
                    value={newNickname}
                    onChange={(e) => setNewNickname(e.target.value)}
                    placeholder="변경할 닉네임을 입력해주세요"
                  />
                </Change_nickbox>
              </Profile_change>
              <Profile_btnbox>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <Img_upload onClick={() => fileInputRef.current.click()}>
                  <img src={Upload_btnimg} alt="" width={16} height={16} />
                  파일 업로드
                </Img_upload>
                <Save_btn onClick={handleSaveProfile}>저장</Save_btn>
              </Profile_btnbox>
            </Pf_modalmain>
          </Profile_modal>
        </Profile_modalback>
      )}
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
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  cursor: pointer;
`;
const Img_box = styled.div`
  width: 60px;
  height: 60px;
  background-color: #cfcfcf;
  display: flex;
  align-items: center;
  justify-content: center;
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
`;
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
  height: 432px;
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
  display: flex;
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
`;
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
  border: 1px solid #cfd3dc;
  padding: 9.5px 16px;
  border-radius: 12px;
  ::placeholder {
    color: #cfd3dc;
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
  border: 1px solid #cfd3dc;
  padding: 9.5px 16px;
  border-radius: 12px;
  ::placeholder {
    color: #cfd3dc;
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
  background-color: #fcd671;
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
`;

const Profile_modal = styled.div`
  width: 480px;
  height: 352px;
  background-color: #fff;
  padding: 63px 81px;
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
`;
const Pf_modalmain = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 32px;
`;
const Profile_change = styled.div`
  gap: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Change_imgbox = styled.div`
  width: 60px;
  height: 60px;
  background-color: #cfcfcf;
  border: 2px solid #e0e0e0;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  overflow: hidden;
`;

const Profile_rand = styled.div`
  position: absolute;
  right: 210px;
  top: 105px;
  width: 22px;
  height: 22px;
  display: flex;
  background-color: #fff;
  border: 1px solid #f3f3f3;
  border-radius: 12px;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
`;
const Change_nickbox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const Nick_text = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #575141;
`;
const Nick_input = styled.input`
  width: 100%;
  height: auto;
  padding: 9.5px 16px;
  font-size: 16px;
  font-weight: 500;
  border: 1px solid #cfd3dc;
  border-radius: 12px;
  ::placeholder {
    color: #cfd3dc;
  }
  :focus {
    outline: none;
  }
`;
const Profile_btnbox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 12px;
`;
const Img_upload = styled.button`
  width: 100%;
  border: 2px solid #fcd671;
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
  cursor: pointer;
`;
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
`;

export default Mypage;
