import styled from "@emotion/styled";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Header from "../components/Header";
import ArrowRight from "../assets/ArrowRight.svg";
import NoDiary from "../assets/NoImg.svg";

const Home = () => {
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
                <Graph></Graph>
                <DateCount>
                  총 <span>0일</span>
                </DateCount>
              </TotalDate>
              <Category>
                <ul>
                  <Angry as="li">화남</Angry>
                  <Normal as="li">평범</Normal>
                  <Happy as="li">행복</Happy>
                  <Sad as="li">슬픔</Sad>
                  <Anxiety as="li">불안</Anxiety>
                </ul>
              </Category>
            </StatSection>

            <ImgContainer>
              <TextContainer>
                <span>최근 사진</span>
                <ImgTotal>전체보기</ImgTotal>
              </TextContainer>
              <ImgBox>
                <NoImg>사진이 없어요...</NoImg>
                <StartText>일기에 추억을 남기러 가볼까요?</StartText>
              </ImgBox>
            </ImgContainer>
            <NoDiaryContainer>
              <BubbleContainerWrapper>
                <BubbleContainer>
                  <BubbleContent>
                    <MessageText>hear 에 오신 것을 환영해요!</MessageText>
                    <MessageText>
                      아래 버튼을 눌러 일기를 작성해볼까요?
                    </MessageText>
                  </BubbleContent>
                  <BubbleTail></BubbleTail>
                </BubbleContainer>
              </BubbleContainerWrapper>
              <DiaryContainer>
                <img src={NoDiary} alt="" />
              </DiaryContainer>
            </NoDiaryContainer>
          </TotalDateBox>

          <AiChatButton>
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
  margin: 45px 60px; // 상하좌우 여백 축소
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
    font-size: 26px; // 32px -> 26px 크기 축소
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
      font-size: 20px; // 24px -> 20px
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
    height: 75px; // 90px -> 80px
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

  .react-calendar__month-view__days__day--neighboringMonth {
    color: #d4d4d0 !important;
  }
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
  border: 1px solid #f3f3f3;
  box-shadow: 2px 2px 4px #f3f3f3;
  border-radius: 50px;
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

const Happy = styled.li`
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
  height: 210px; // 250px -> 210px 축소
  background-color: #f3f3f3;
  border-radius: 12px;
  padding: 14px;
  gap: 10px;
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
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NoImg = styled.span`
  color: #828282;
  font-size: 13px;
`;

const StartText = styled.span`
  font-size: 17px;
  font-weight: 500;
`;

const ImgTotal = styled.span`
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
  align-items: center;
  width: 100%;
  background: white;
  border: 1.5px solid #d4d4d0;
  border-radius: 18px;
  padding: 15px 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const BubbleContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const MessageText = styled.span`
  font-size: 12px;
  color: #6b6560;
  word-break: keep-all;
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
