import styled from "@emotion/styled";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Happy from "../assets/Happy.svg";
import ArrowRight from "../assets/ArrowRight.svg";
import Test from "../assets/Test.svg";
import NoAngry from "../assets/NoAngry.svg";
import NoStar from "../assets/NoStar.svg";
import NoSad from "../assets/NoSad.svg";
import NoAnxiety from "../assets/NoAnxiety.svg";

import { getDiaries, updateDiaries } from "../apis/diaries";

const EditDiary = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [hashTags, setHashTags] = useState([]);
  const [imageUrls, setImageUrls] = useState([Test]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDiaryData = async () => {
      if (!id) return;
      try {
        setIsLoading(true);
        const data = await getDiaries(id);

        setDate(data.createdAt || "");
        setContent(data.content || "");
        setHashTags(data.tags || []);

        if (data.imageUrls && data.imageUrls.length > 0) {
          setImageUrls(data.imageUrls);
        }
      } catch (error) {
        console.error("데이터를 불러오는데 실패했습니다.", error);
        alert("일기 데이터를 가져올 수 없습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDiaryData();
  }, [id]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1,
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handleUpdate = async () => {
    try {
      await updateDiaries(id, { content });
      alert("일기가 성공적으로 수정되었습니다.");
      navigate(`/diary/${id}`);
    } catch (error) {
      console.error("일기 수정 실패:", error);
      alert(
        "일기 수정에 실패했습니다: " +
          (error.response?.data?.message || error.message),
      );
    }
  };

  if (isLoading)
    return (
      <Body style={{ textAlign: "center", marginTop: "50px" }}>로딩 중...</Body>
    );

  return (
    <Body>
      <Header />
      <Container>
        <ContentBox>
          <ContentHeaderBox>
            <CategoryBox>
              <CategoryImg src={NoAngry} alt="화남" />
              <CategoryImg src={NoStar} alt="보통" />
              <CategoryImg src={Happy} alt="행복" />
              <CategoryImg src={NoSad} alt="슬픔" />
              <CategoryImg src={NoAnxiety} alt="불안" />
            </CategoryBox>
            <ButtonBox>
              <UpdateButton onClick={() => navigate(`/diary/${id}`)}>
                취소
              </UpdateButton>
              <FinishButton onClick={handleUpdate}>완료</FinishButton>
            </ButtonBox>
          </ContentHeaderBox>
          <DiaryBox>
            <DiaryContent>
              <h2>
                {date.includes("-")
                  ? `${date.split("-")[0]}년 ${parseInt(date.split("-")[1])}월 ${parseInt(date.split("-")[2])}일`
                  : date}
              </h2>
              <TextArea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="일기 내용을 입력해주세요."
              />
              <HashTagBox>
                {hashTags.length > 0 ? (
                  hashTags.map((tag, idx) => <span key={idx}>#{tag}</span>)
                ) : (
                  <span>태그가 없습니다.</span>
                )}
              </HashTagBox>
            </DiaryContent>
            <DiaryImg>
              <SlideContainer>
                <SlideImage src={imageUrls[currentIndex]} alt="일기 이미지" />
                {imageUrls.length > 1 && (
                  <>
                    <PrevButton
                      type="button"
                      onClick={goToPrevious}
                      aria-label="이전 이미지"
                    >
                      <Arrow>‹</Arrow>
                    </PrevButton>
                    <NextButton
                      type="button"
                      onClick={goToNext}
                      aria-label="다음 이미지"
                    >
                      <Arrow>›</Arrow>
                    </NextButton>
                  </>
                )}
                <DotContainer>
                  {imageUrls.map((_, index) => (
                    <Dot
                      key={index}
                      type="button"
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
  cursor: pointer;
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
    margin-bottom: 16px;
  }
`;
const TextArea = styled.textarea`
  flex: 1;
  width: 100%;
  min-height: 200px;
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  resize: none;
  font-size: 16px;
  line-height: 1.5;
  font-family: inherit;
  margin-bottom: 16px;
  &:focus {
    outline: none;
    border-color: #fcd671;
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

export default EditDiary;
