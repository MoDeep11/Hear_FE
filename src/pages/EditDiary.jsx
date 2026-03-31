import styled from "@emotion/styled";
import React, { useState } from "react";
import Header from "../components/Header";
import Happy from "../assets/Happy.svg";
import ArrowRight from "../assets/ArrowRight.svg";
import Test from "../assets/Test.svg";
import NoAngry from "../assets/NoAngry.svg";
import NoStar from "../assets/NoStar.svg";
import NoSad from "../assets/NoSad.svg";
import NoAnxiety from "../assets/NoAnxiety.svg";
import { useNavigate } from "react-router-dom";

const EditDiary = () => {
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
              <CategoryImg src={NoAngry} alt="로고" />
              <CategoryImg src={NoStar} alt="로고" />
              <CategoryImg src={Happy} alt="로고" />
              <CategoryImg src={NoSad} alt="로고" />
              <CategoryImg src={NoAnxiety} alt="로고" />
            </CategoryBox>
            <ButtonBox>
              <UpdateButton onClick={() => navigate("/diary")}>
                취소
              </UpdateButton>
              <FinishButton onClick={() => navigate("/diary")}>
                완료
              </FinishButton>
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

const FinishButton = styled.button`
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

const UpdateButton = styled.button`
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

export default EditDiary;
