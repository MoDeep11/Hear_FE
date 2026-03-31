import styled from "@emotion/styled";
import React, { useState } from "react";
import Header from "../components/Header";
import Happy from "../assets/Happy.svg";
import ArrowRight from "../assets/ArrowRight.svg";
import Test from "../assets/Test.svg";
import Star from "../assets/Star.svg";
import { useNavigate } from "react-router-dom";

const Diary = () => {
  const navigate = useNavigate();
  // 슬라이드 이미지 배열 (필요시 추가)
  const images = [Test, Test, Test]; // 같은 이미지 3개 (실제로는 다른 이미지 사용)
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  return (
    <Body>
      <Header />
      <Container>
        <ContentBox>
          <ContentHeaderBox>
            <CategoryBox>
              <CategoryImg src={Happy} alt="로고" />
              <CategoryTitle>
                <span>행복한</span> 하루에요!
              </CategoryTitle>
            </CategoryBox>
            <ButtonBox>
              <UpdateButton onClick={() => navigate("/editDiary")}>
                수정하기 <img src={ArrowRight} alt="수정하기 이동" />
              </UpdateButton>
              <DeleteButton onClick={() => navigate("/home")}>
                삭제
              </DeleteButton>
            </ButtonBox>
          </ContentHeaderBox>
          <DiaryBox>
            <DiaryContent>
              <h2>2026년 7월 20일</h2>
              <p>
                오늘은 정말 행복한 하루였어요! 아침에 일어나서 햇살이 너무
                좋아서 기분이 좋았어요. 친구들과 함께 공원에서 피크닉을 했는데,
                맛있는 음식과 좋은 대화로 즐거운 시간을 보냈어요. 저녁에는
                가족과 함께 맛있는 저녁을 먹으면서 웃음이 끊이지 않았어요. 오늘
                하루가 너무 소중하고 행복했어요!
              </p>
              <HashTagBox>
                <span>#행복</span>
                <span>#행복</span>
                <span>#행복</span>
                <span>#행복</span>
                <span>#행복</span>
              </HashTagBox>
            </DiaryContent>
            <DiaryImg>
              <SlideContainer>
                <SlideImage src={images[currentIndex]} alt="일기 이미지" />
                <PrevButton onClick={goToPrevious}>
                  <Arrow>‹</Arrow>
                </PrevButton>
                <NextButton onClick={goToNext}>
                  <Arrow>›</Arrow>
                </NextButton>
                <DotContainer>
                  {images.map((_, index) => (
                    <Dot
                      key={index}
                      isActive={index === currentIndex}
                      onClick={() => setCurrentIndex(index)}
                    />
                  ))}
                </DotContainer>
              </SlideContainer>
            </DiaryImg>
          </DiaryBox>
          <AiFeedbackBox>
            <AiFeedback>
              <span>2026년 7월</span>은 평범한 하루들이 이어지면서도, 한편으로는
              불안한 마음이 종종 찾아왔던 달이었네요. 그래도 다음 달에는 조금 더
              편안하고 행복한 순간들이 많이 찾아오길 바라요. 이번 달에는 총 19일
              동안 꾸준히 일기를 남겨 주셨어요! 다음 달에는 달력이 더 다양한
              감정들로 가득 채워지길 기대할게요 !
            </AiFeedback>
            <AiFeedbackIcon src={Star} alt="AI 피드백" />
          </AiFeedbackBox>
        </ContentBox>
      </Container>
    </Body>
  );
};

const Body = styled.div``;

const Container = styled.section`
  display: flex;
  margin: 45px 60px;
  gap: 30px;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 24px;
`;

const ContentHeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

const CategoryBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

const CategoryImg = styled.img`
  width: 40px;
  height: 40px;
`;

const CategoryTitle = styled.div`
  font-size: 24px;
  font-weight: bold;

  span {
    color: #5dc19b;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  gap: 12px;
`;

const UpdateButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  padding: 10px 32px;
  border: none;
  background-color: #fcd671;
  border-radius: 12px;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  padding: 10px 32px;
  border: 2px solid #fcd671;
  background-color: white;
  border-radius: 12px;
  cursor: pointer;
`;

const DiaryBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 36px;
  gap: 24px;
  box-shadow: 0px 0px 5px rgba(0, 0, 4, 0.25);
  border-radius: 12px;
`;

const DiaryContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  h2 {
    color: #daa005;
  }
`;

const HashTagBox = styled.div`
  display: flex;
  align-items: end;
  margin-top: auto;
  gap: 12px;
  color: #828282;
`;

const DiaryImg = styled.div`
  position: relative;
`;

// 슬라이드 컨테이너
const SlideContainer = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 슬라이드 이미지
const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease-in-out;
`;

// 이전 버튼
const PrevButton = styled.button`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  transition: background-color 0.3s ease;
  z-index: 10;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

// 다음 버튼
const NextButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  transition: background-color 0.3s ease;
  z-index: 10;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

// 화살표 아이콘
const Arrow = styled.span`
  font-weight: bold;
`;

// 도트 컨테이너
const DotContainer = styled.div`
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 10;
`;

// 도트
const Dot = styled.button`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background-color: ${(props) =>
    props.isActive ? "#fff" : "rgba(255, 255, 255, 0.5)"};
  transition: all 0.3s ease;

  &:hover {
    background-color: #fff;
  }
`;

const AiFeedbackBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 38px;
`;

const AiFeedback = styled.div`
  position: relative;
  span {
    color: #daa005;
    font-weight: bold;
  }
  text-align: center;
  padding: 20px 190px;
  border-radius: 12px;
  border: 2px solid #e5d7b2;
  background-color: #fff9eb;

  /* 오른쪽 면에 삼각형 말풍선 추가 */
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    right: -12px;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-top: 12px solid transparent;
    border-bottom: 12px solid transparent;
    border-left: 12px solid #fff9eb;
  }

  /* 삼각형 테두리 (border 표현) */
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    right: -15px;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-top: 13px solid transparent;
    border-bottom: 13px solid transparent;
    border-left: 13px solid #e5d7b2;
    z-index: -1;
  }
`;

const AiFeedbackIcon = styled.img`
  width: 100px;
  height: 100px;
`;

export default Diary;
