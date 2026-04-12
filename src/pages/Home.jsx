import styled from "@emotion/styled";
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Header from "../components/Header";
import ArrowRight from "../assets/ArrowRight.svg";

import Sadness from "../assets/Sadness.svg";
import Special from "../assets/Special.svg";
import Happy from "../assets/Happy.svg";
import Star from "../assets/Star.svg";
import DefaultIcon from "../assets/NoImg.svg";
import { useNavigate } from "react-router-dom";

import { getUserSummary } from "../apis/user";
import { getDiariesList, getDiaryRecommendation } from "../apis/diaries";
import { getCalendars } from "../apis/user";

const emotionMap = {
  HAPPY: { text: "행복한", color: "#5dc19b", icon: Happy },
  SAD: { text: "슬픈", color: "#89D9FF", icon: Sadness },
  ANGRY: { text: "화나는", color: "#FEA2A9", icon: Special },
  ANXIETY: { text: "불안한", color: "#CBA3FF", icon: Special },
  NEUTRAL: { text: "평범한", color: "#FCD671", icon: Star },
};

const Home = () => {
  const navigate = useNavigate();

  const [diaries, setDiaries] = useState([]);
  const [calendarData, setCalendarData] = useState([]);
  const [totalDays, setTotalDays] = useState(0);
  const [recentPhotos, setRecentPhotos] = useState([]);
  const [recommendation, setRecommendation] = useState(null);
  const [summary, setSummary] = useState(null);

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handlePhotoClick = (diaryId) => {
    navigate(`/diary/${diaryId}`);
  };

  const handleRecommendationClick = () => {
    if (recommendation && recommendation.diaryId) {
      navigate(`/diary/${recommendation.diaryId}`);
    }
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const diaryRes = await getDiariesList();
        const diaryData = Array.isArray(diaryRes)
          ? diaryRes
          : (diaryRes?.data ?? []);
        setDiaries(diaryData);
        setTotalDays(diaryData.length);

        const photos = diaryData
          .filter((d) => d.thumbnailUrl && d.thumbnailUrl !== "string")
          .map((d) => ({
            url: d.thumbnailUrl,
            diaryId: d.id,
          }));
        setRecentPhotos(photos);

        const recRes = await getDiaryRecommendation();
        const recData = recRes?.data ?? recRes;
        if (recData) setRecommendation(recData);

        const summaryRes = await getUserSummary();
        setSummary(summaryRes.data);
      } catch (error) {
        console.error("데이터 로딩 실패:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let cancelled = false;

    const fetchCalendarData = async () => {
      try {
        const yearMonth = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}`;
        const res = await getCalendars(yearMonth);
        if (!cancelled) {
          setCalendarData(res.data || []);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("캘린더 데이터 로딩 실패:", error);
        }
      }
    };
    fetchCalendarData();

    return () => {
      cancelled = true;
    };
  }, [currentMonth]);

  const getGraphStyle = () => {
    if (!summary || !summary.emotionDistribution) return { background: "#eee" };
    const dist = summary.emotionDistribution;
    const values = dist.values || dist;
    const total = Object.values(values).reduce((a, b) => a + b, 0);
    if (total === 0) return { background: "#eee" };

    let currentPos = 0;
    const gradientParts = [];
    Object.keys(emotionMap).forEach((key) => {
      const count = values[key] || 0;
      if (count > 0) {
        const percentage = (count / total) * 100;
        const color = emotionMap[key].color;
        gradientParts.push(
          `${color} ${currentPos}% ${currentPos + percentage}%`,
        );
        currentPos += percentage;
      }
    });
    return {
      background: `linear-gradient(to right, ${gradientParts.join(", ")})`,
    };
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const dateString = formatDate(date);
      const dayData = calendarData.find((item) => item.date === dateString);

      if (dayData && dayData.hasDiary) {
        const emotionIcon = emotionMap[dayData.emotion]?.icon;
        return (
          <DiaryMark>
            {emotionIcon ? (
              <EmotionIcon
                src={emotionIcon}
                alt={emotionMap[dayData.emotion]?.text ?? "감정"}
              />
            ) : (
              <Dot color="#fcd671" />
            )}
          </DiaryMark>
        );
      }
    }
    return null;
  };

  const getRecommendationDisplay = () => {
    const defaultEmotion = emotionMap.NEUTRAL;
    if (!recommendation || !recommendation.targetDate) {
      return {
        dateText: "",
        emotionText: "",
        emotionColor: defaultEmotion.color,
        icon: defaultEmotion.icon,
      };
    }
    const dateParts = recommendation.targetDate.split("-");
    const formattedDate = `${dateParts[0]}년 ${parseInt(dateParts[1], 10)}월 ${parseInt(dateParts[2], 10)}일`;
    const emotionInfo = emotionMap[recommendation.emotion] ?? defaultEmotion;
    return {
      dateText: `${formattedDate},`,
      emotionText: emotionInfo.text,
      emotionColor: emotionInfo.color,
      icon: emotionInfo.icon,
    };
  };

  const recDisplay = getRecommendationDisplay();

  return (
    <Body>
      <Header />
      <Container>
        <CalendarWrapper>
          <StyledCalendar
            locale="ko-KR"
            calendarType="gregory"
            formatDay={(locale, date) => date.getDate()}
            formatShortWeekday={(locale, date) =>
              [
                "일요일",
                "월요일",
                "화요일",
                "수요일",
                "목요일",
                "금요일",
                "토요일",
              ][date.getDay()]
            }
            tileContent={tileContent}
            onActiveStartDateChange={({ activeStartDate }) =>
              setCurrentMonth(activeStartDate)
            }
            onClickDay={(value) => {
              const dateString = formatDate(value);
              const selectedDiary = diaries.find((diary) => {
                const diaryDate = diary.date ?? diary.createdAt?.slice(0, 10);
                return diaryDate === dateString;
              });

              if (selectedDiary) {
                navigate(`/diary/${selectedDiary.id}`);
              } else {
                alert("해당 날짜에 작성된 일기가 없습니다.");
              }
            }}
          />
        </CalendarWrapper>

        <ContentBox>
          <TotalDateBox>
            <DateTitleBox>
              <span>오늘의 일기를 쓰러 가볼까요?</span>
              <hr />
            </DateTitleBox>

            <StatSection>
              <TotalDate>
                <Graph style={getGraphStyle()} />
                <DateCount>
                  총 <span>{totalDays}일</span>
                </DateCount>
              </TotalDate>

              <Category>
                <ul>
                  <Happyspan>행복</Happyspan>
                  <Sad>슬픔</Sad>
                  <Angry>화남</Angry>
                  <Anxiety>불안</Anxiety>
                  <Normal>평범</Normal>
                </ul>
              </Category>
            </StatSection>

            <ImgContainer>
              <TextContainer>
                <span>최근 사진</span>
                <ImgTotal onClick={() => navigate("/photobook")}>
                  전체보기
                </ImgTotal>
              </TextContainer>
              <ImgBox>
                {recentPhotos.length > 0 ? (
                  <RecentPhotosList>
                    {recentPhotos.slice(0, 3).map((photo, index) => (
                      <RecentImageWrapper
                        key={index}
                        onClick={() => handlePhotoClick(photo.diaryId)}
                      >
                        <RecentImage
                          src={photo.url}
                          alt={`최근 사진 ${index + 1}`}
                        />
                      </RecentImageWrapper>
                    ))}
                  </RecentPhotosList>
                ) : (
                  <NoImgContent>
                    <NoImg>사진이 없어요...</NoImg>
                    <StartText>일기에 추억을 남기러 가볼까요?</StartText>
                  </NoImgContent>
                )}
              </ImgBox>
            </ImgContainer>

            {recommendation && recommendation.diaryId ? (
              <NoDiaryContainer $clickable onClick={handleRecommendationClick}>
                <BubbleContainerWrapper>
                  <BubbleContainer>
                    <BubbleContent>
                      <MessageText>
                        <span>{recDisplay.dateText}</span>
                        <br />
                        나에게는 무슨{" "}
                        <EmotionText color={recDisplay.emotionColor}>
                          {recDisplay.emotionText}
                        </EmotionText>{" "}
                        일이 있었을까요?
                      </MessageText>
                    </BubbleContent>
                    <BubbleTail></BubbleTail>
                  </BubbleContainer>
                </BubbleContainerWrapper>
                <DiaryContainer>
                  <img src={recDisplay.icon} alt="일기 추천 감정 아이콘" />
                </DiaryContainer>
              </NoDiaryContainer>
            ) : (
              <NoDiaryContainer $clickable={false}>
                <BubbleContainerWrapper>
                  <BubbleContainer>
                    <BubbleContent>
                      <MessageText>
                        Hear에 오신 것을 환영해요!
                        <br />
                        아래 버튼을 눌러 <span>일기</span>를 작성해볼까요?
                      </MessageText>
                    </BubbleContent>
                    <BubbleTail></BubbleTail>
                  </BubbleContainer>
                </BubbleContainerWrapper>
                <DiaryContainer>
                  <img src={DefaultIcon} alt="일기 추천 감정 아이콘" />
                </DiaryContainer>
              </NoDiaryContainer>
            )}
          </TotalDateBox>

          <AiChatButton onClick={() => navigate("/ai/chats")}>
            AI와 일기 작성하러 가기
            <img src={ArrowRight} alt="화살표" />
          </AiChatButton>
        </ContentBox>
      </Container>
    </Body>
  );
};

const Body = styled.section``;

const Container = styled.section`
  display: flex;
  margin: 45px 60px;
  gap: 30px;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 20px;
`;

const TotalDateBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10px;
  margin-top: 8px;
  gap: 18px;
`;

const DateTitleBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  hr {
    flex: 1;
    border: none;
    border-top: 1px solid #ccc;
    margin: 0;
  }
  span {
    font-size: 26px;
    font-weight: 600;
    color: #575141;
  }
`;

const CalendarWrapper = styled.div`
  background-color: white;
  border: 1px solid #f3f3f3;
  border-radius: 25px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
  height: fit-content;
  flex: 1.1;
`;

const StyledCalendar = styled(Calendar)`
  border: none !important;
  width: 100% !important;
  font-family: "Pretendard", sans-serif;
  .react-calendar__navigation {
    justify-content: center;
    margin-bottom: 15px;
    button {
      background: none;
      font-size: 20px;
      font-weight: 700;
      color: #575141;
      &:disabled {
        background: none;
      }
      &:enabled:hover,
      &:enabled:focus {
        background: none;
      }
    }
    .react-calendar__navigation__prev2-button,
    .react-calendar__navigation__next2-button {
      display: none;
    }
  }
  .react-calendar__month-view__weekdays {
    text-align: center;
    font-weight: 600;
    font-size: 13px;
    border-top: 1px solid #f0f0f0;
    border-bottom: 1px solid #f0f0f0;
    padding: 10px 0;
    margin-bottom: 15px;
    abbr {
      text-decoration: none;
      color: #7d7d7d;
    }
    .react-calendar__month-view__weekdays__weekday:nth-of-type(1) abbr {
      color: #ff6b6b;
    }
    .react-calendar__month-view__weekdays__weekday:nth-of-type(7) abbr {
      color: #4d8aff;
    }
  }
  .react-calendar__tile {
    height: 76px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding-top: 12px;
    font-size: 16px;
    font-weight: 500;
    color: #444;
    background: none !important;
    &:nth-of-type(7n + 1) {
      color: #ff6b6b;
    }
    &:nth-of-type(7n) {
      color: #4d8aff;
    }
    &:enabled:hover,
    &:enabled:focus,
    &.react-calendar__tile--active {
      background: #fff9eb;
      border-radius: 12px;
    }

    &.react-calendar__month-view__days__day--neighboringMonth {
      opacity: 0.4;
      color: #bbb !important;
    }
  }
  .react-calendar__tile--now {
    background: none !important;
    abbr {
      background: #fcd671;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }
  }

  .react-calendar__navigation__prev-button,
  .react-calendar__navigation__next-button {
    display: none;
  }

  .react-calendar__navigation__prev2-button,
  .react-calendar__navigation__next2-button {
    display: none;
  }

  .react-calendar__navigation__label {
    pointer-events: none;
  }
`;

const DiaryMark = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4px;
`;

const EmotionIcon = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  background-color: ${(props) => props.color || "#fcd671"};
  border-radius: 50%;
`;

const StatSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;
`;

const Category = styled.div`
  ul {
    display: flex;
    flex-direction: row;
    gap: 16px;
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 14px;
  }
`;

const TotalDate = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

const Graph = styled.div`
  width: 100%;
  height: 14px;
  background-color: #f3f3f3;
  border-radius: 50px;
  overflow: hidden;
  transition: background 0.5s ease;
  box-shadow: inset 1px 1px 2px rgba(0, 0, 0, 0.1);
`;

const DateCount = styled.p`
  margin: 0;
  white-space: nowrap;
  font-size: 14px;
  span {
    color: #daa005;
  }
`;

const Angry = styled.li`
  display: flex;
  align-items: center;
  gap: 4px;
  &::before {
    content: "•";
    color: #fea2a9;
  }
`;
const Normal = styled.li`
  display: flex;
  align-items: center;
  gap: 4px;
  &::before {
    content: "•";
    color: #fcd671;
  }
`;
const Happyspan = styled.li`
  display: flex;
  align-items: center;
  gap: 4px;
  &::before {
    content: "•";
    color: #5dc19b;
  }
`;
const Sad = styled.li`
  display: flex;
  align-items: center;
  gap: 4px;
  &::before {
    content: "•";
    color: #89d9ff;
  }
`;
const Anxiety = styled.li`
  display: flex;
  align-items: center;
  gap: 4px;
  &::before {
    content: "•";
    color: #cba3ff;
  }
`;

const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 210px;
  background-color: #f3f3f3;
  border-radius: 12px;
  padding: 16px;
  gap: 12px;
`;

const TextContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  span {
    font-size: 14px;
    font-weight: 600;
  }
`;

const ImgBox = styled.div`
  width: 100%;
  background-color: white;
  flex: 1;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const RecentPhotosList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 15px;
  width: 100%;
  height: 100%;
  padding: 10px;
`;

const RecentImageWrapper = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 12px;
  overflow: hidden;
  background-color: #f9f9f9;
  border: 1px solid #eee;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const RecentImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const NoImgContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const NoImg = styled.span`
  color: #828282;
  font-size: 13px;
`;
const StartText = styled.span`
  font-size: 17px;
  font-weight: 500;
`;
const ImgTotal = styled.a`
  color: #828282;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const NoDiaryContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 15px;
  margin-top: 10px;
  cursor: ${({ $clickable }) => ($clickable ? "pointer" : "default")};
  transition: ${({ $clickable }) =>
    $clickable ? "transform 0.2s ease" : "none"};

  &:hover {
    transform: ${({ $clickable }) =>
      $clickable ? "translateY(-2px)" : "none"};
  }
`;

const BubbleContainerWrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
`;
const BubbleContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  background: white;
  border: 1.5px solid #d4d4d0;
  border-radius: 18px;
  padding: 15px 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s ease;
`;

const BubbleContent = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  gap: 4px;
`;
const MessageText = styled.span`
  font-size: 13px;
  text-align: center;
  color: #6b6560;
  line-height: 1.4;
  word-break: keep-all;

  span {
    font-weight: bold;
    display: inline-block;
  }
`;
const EmotionText = styled.span`
  color: ${(props) => props.color || "inherit"};
  font-weight: bold;
`;

const BubbleTail = styled.div`
  position: absolute;
  right: -9px;
  top: 50%;
  transform: translateY(-50%);
  width: 10px;
  height: 20px;
  &::after {
    content: "";
    position: absolute;
    right: 1.5px;
    top: 50%;
    transform: translateY(-50%);
    border-left: 9px solid white;
    border-top: 9px solid transparent;
    border-bottom: 9px solid transparent;
    z-index: 2;
  }
  &::before {
    content: "";
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    border-left: 10.5px solid #d4d4d0;
    border-top: 10.5px solid transparent;
    border-bottom: 10.5px solid transparent;
    z-index: 1;
  }
`;

const DiaryContainer = styled.div`
  img {
    width: 80px;
    height: 80px;
  }
`;

const AiChatButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 0;
  background-color: #fcd671;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  gap: 8px;
  img {
    width: 12px;
    height: 12px;
  }
`;

export default Home;
