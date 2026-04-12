import styled from "@emotion/styled";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDiaries, deleteDiaries } from "../apis/diaries";

import Header from "../components/Header";
import Sadness from "../assets/Sadness.svg";
import Special from "../assets/Special.svg";
import Happy from "../assets/Happy.svg";
import ArrowRight from "../assets/ArrowRight.svg";
import Star from "../assets/Star.svg";

const EMOTION_MAP = {
  HAPPY: { text: "행복한", color: "#5dc19b", icon: Happy },
  SAD: { text: "슬픈", color: "#89D9FF", icon: Sadness },
  ANGRY: { text: "화나는", color: "#FEA2A9", icon: Special },
  ANXIETY: { text: "불안한", color: "#CBA3FF", icon: Special },
  NEUTRAL: { text: "평범한", color: "#FCD671", icon: Star },
};

const Diary = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [diary, setDiary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchDiary = async () => {
      try {
        setIsLoading(true);
        const data = await getDiaries(id);
        setDiary(data);
      } catch (error) {
        console.error("일기를 불러오는 데 실패했습니다.", error);
        alert("일기를 불러올 수 없습니다.");
        navigate("/home");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchDiary();
    }
  }, [id, navigate]);

  const currentEmotion = EMOTION_MAP[diary?.emotion] || EMOTION_MAP.HAPPY;

  const handleDelete = async () => {
    const isConfirm = window.confirm("정말 이 일기를 삭제하시겠습니까?");
    if (!isConfirm) return;

    try {
      await deleteDiaries(id);
      alert("삭제되었습니다.");
      navigate("/home");
    } catch (error) {
      console.error("일기 삭제 실패:", error);
      alert("일기 삭제에 실패했습니다.");
    }
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? diary?.imageUrls.length - 1 : prevIndex - 1,
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === diary?.imageUrls.length - 1 ? 0 : prevIndex + 1,
    );
  };

  if (isLoading) {
    return (
      <Body>
        <Header />
        <LoadingText>로딩 중...</LoadingText>
      </Body>
    );
  }

  if (!diary) {
    return null;
  }

  return (
    <Body>
      <Header />
      <Container>
        <ContentBox>
          <ContentHeaderBox>
            <CategoryBox>
              <CategoryImg
                src={currentEmotion.icon}
                alt={currentEmotion.text}
              />
              <CategoryTitle color={currentEmotion.color}>
                <span>{currentEmotion.text}</span> 하루에요!
              </CategoryTitle>
            </CategoryBox>
            <ButtonBox>
              <UpdateButton onClick={() => navigate(`/editDiary/${id}`)}>
                수정하기 <img src={ArrowRight} alt="수정하기 이동" />
              </UpdateButton>
              <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
            </ButtonBox>
          </ContentHeaderBox>

          <DiaryBox>
            <DiaryContent>
              <h2>
                {diary.createdAt
                  ? `${diary.createdAt.split("-")[0]}년 ${parseInt(diary.createdAt.split("-")[1])}월 ${parseInt(diary.createdAt.split("-")[2])}일`
                  : "날짜 정보 없음"}
              </h2>
              <p>{diary.content}</p>

              <HashTagBox>
                {diary.tags?.map((tag, idx) => (
                  <span key={idx}>#{tag}</span>
                ))}
              </HashTagBox>
            </DiaryContent>

            <DiaryImg>
              <SlideContainer>
                {diary.imageUrls && diary.imageUrls.length > 0 ? (
                  <>
                    <SlideImage
                      src={diary.imageUrls[currentIndex]}
                      alt="일기 이미지"
                    />
                    {diary.imageUrls.length > 1 && (
                      <>
                        <PrevButton onClick={goToPrevious}>
                          <Arrow>‹</Arrow>
                        </PrevButton>
                        <NextButton onClick={goToNext}>
                          <Arrow>›</Arrow>
                        </NextButton>
                        <DotContainer>
                          {diary.imageUrls.map((_, index) => (
                            <Dot
                              key={index}
                              isActive={index === currentIndex}
                              onClick={() => setCurrentIndex(index)}
                            />
                          ))}
                        </DotContainer>
                      </>
                    )}
                  </>
                ) : (
                  <NoImageText>이미지가 없습니다</NoImageText>
                )}
              </SlideContainer>
            </DiaryImg>
          </DiaryBox>

          {diary.aiFeedback && (
            <AiFeedbackBox>
              <AiFeedback>{diary.aiFeedback}</AiFeedback>
              <AiFeedbackIcon src={Star} alt="AI 피드백" />
            </AiFeedbackBox>
          )}
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
    color: ${(props) => props.color || "#5dc19b"};
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

const NoImageText = styled.span``;

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

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease-in-out;
`;

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

const Arrow = styled.span`
  font-weight: bold;
`;

const DotContainer = styled.div`
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 10;
`;

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

const LoadingText = styled.div`
  font-size: 18px;
  color: #828282;
  text-align: center;
  margin-top: 50px;
`;

export default Diary;
