// 사진첩

import styled from "@emotion/styled";
import Header from "../components/Header.jsx";
import Test_img from "../assets/Test.svg";
import Arrow from "../assets/Arrow.svg";
import Reverse_Arrow from "../assets/Rev-Arrow.svg";
import Search_tag from "../assets/search_tag.svg";

const Photo_Book = () => {
  return (
    <Body>
      <Header />
      <Photo_Main>
        <Time_box>
          <img src={Arrow} alt="" />
          <Time_line>
            2026년 <span>7</span>월
          </Time_line>
          <img src={Reverse_Arrow} alt="" />
        </Time_box>
        <Search_box>
          <Search_bar placeholder="해시태그를 검색해주세요"></Search_bar>
          <img src={Search_tag} alt="" />
        </Search_box>

        <Photo_box>
          <Photo>
            <img src={Test_img} alt="" />
            <Photo_date>12일</Photo_date>
            <Photo_layer></Photo_layer>
          </Photo>
          <Photo>
            <img src={Test_img} alt="" />
            <Photo_date>12일</Photo_date>
            <Photo_layer></Photo_layer>
          </Photo>
          <Photo>
            <img src={Test_img} alt="" />
            <Photo_date>12일</Photo_date>
            <Photo_layer></Photo_layer>
          </Photo>
          <Photo>
            <img src={Test_img} alt="" />
            <Photo_date>12일</Photo_date>
            <Photo_layer></Photo_layer>
          </Photo>
          <Photo>
            <img src={Test_img} alt="" />
            <Photo_date>12일</Photo_date>
            <Photo_layer></Photo_layer>
          </Photo>
          <Photo>
            <img src={Test_img} alt="" />
            <Photo_date>12일</Photo_date>
            <Photo_layer></Photo_layer>
          </Photo>
          <Photo>
            <img src={Test_img} alt="" />
            <Photo_date>12일</Photo_date>
            <Photo_layer></Photo_layer>
          </Photo>
          <Photo>
            <img src={Test_img} alt="" />
            <Photo_date>12일</Photo_date>
            <Photo_layer></Photo_layer>
          </Photo>
          <Photo>
            <img src={Test_img} alt="" />
            <Photo_date>12일</Photo_date>
            <Photo_layer></Photo_layer>
          </Photo>
          <Photo>
            <img src={Test_img} alt="" />
            <Photo_date>12일</Photo_date>
            <Photo_layer></Photo_layer>
          </Photo>

        </Photo_box>
      </Photo_Main>
    </Body>
  );
};


const Body = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Photo_Main = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  padding: 50px 211px 0px 211px;
`;

const Time_box = styled.div`
  height: 29px;
  padding: 0 294px;
  gap: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Time_line = styled.p`
  font-size: 24px;
  font-weight: 600;
  color: #000;
  span {
    color: #daa005;
  }
`;

const Search_box = styled.div`
  width: 800px;
  height: 54px;
  display: flex;
  padding: 6px 24px;
  align-items: center;
  gap: 10px;
  border-radius: 50px;
  background: #fff;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);
`;

const Search_bar = styled.input`
  width: 700px;
  border: none;
  height: 42px;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 400;
  ::placeholder {
    color: #828282;
  }
  :focus {
    outline: none;
  }
`;

const Photo_box = styled.div`
  width: 944px;
  height: auto; 
  display: flex;
  flex-wrap: wrap;
  gap: 48px; 
  justify-content: flex-start; 
  align-content: flex-start;
`;
const Photo = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 20px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const Photo_layer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 60%, 
    rgba(0, 0, 0, 0.5) 100%
  );
  pointer-events: none; 
  z-index: 1;
`
const Photo_date = styled.div`
  position: absolute;
  left: 12px;
  bottom: 12px;
  font-size: 16px;
  font-weight: 400;
  color: #fff;
  z-index: 2;
`;

export default Photo_Book;
