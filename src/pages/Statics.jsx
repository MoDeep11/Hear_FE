import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";
import Header from "../components/Header.jsx";
import ReverseArrow from "../assets/Rev-Arrow.svg";
import Arrow from "../assets/Arrow.svg";
import Happy from "../assets/Star.svg";
import { useState, useEffect } from "react";
import { getStatistics } from "../apis/statics.js";

const globalStyles = css`
  @property --rate {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 0%;
  }
`;


const Statics = () => {
  const colors = ["#FEA2A9", "#FCD671", "#5DC19B", "#89D9FF", "#CBA3FF"];
  const emotionLabels = ["화남", "슬픔", "행복", "불안", "평범"];
  const emotionKeys = ["ANGRY", "SAD", "HAPPY", "ANXIETY", "NEUTRAL"];

  const [dateNum, setDateNum] = useState(3);
  const [yearNum, setYearNum] = useState(2026);
  const [statistics, setStatistics] = useState(null);

  


  const maxEmotion = statistics
    ? Math.max(
        ...emotionKeys.map(
          (key) => statistics.emotionDistribution.values[key] ?? 0,
        ),
      )
    : 1;

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const res = await getStatistics(yearNum, dateNum);
        console.log("통계 데이터:", res.data);
        setStatistics(res.data);
      } catch (error) {
        console.error("통계 로드 실패:", error);
      }
    };
    fetchStatistics();
  }, [yearNum, dateNum]);

  const date_minus = () => {
    if (dateNum > 1) {
      setDateNum(dateNum - 1);
    } else {
      setDateNum(12);
      setYearNum(yearNum - 1);
    }
  };
  const date_plus = () => {
    if (dateNum < 12) {
      setDateNum(dateNum + 1);
    }
    if (dateNum >= 12) {
      (setDateNum(1), setYearNum(yearNum + 1));
    }
  };

  return (
    <Body>
      <Global styles={globalStyles} />
      <Header />
      <Main_box>
        <Date_box>
          <Left_Arrow onClick={date_minus}>
            <img src={Arrow} alt="" />
          </Left_Arrow>
          <Date_title>
            {yearNum}년 <span>{dateNum}</span>월
          </Date_title>
          <Right_arrow onClick={date_plus}>
            <img src={ReverseArrow} alt="" />
          </Right_arrow>
        </Date_box>
        <Static_Main>
          <Static_Graphbox>
            <Static_circlebox>
              <Circle_graph rate={statistics ? statistics.writingRate : 0}>
                <Circle_status>
                  <Status_text>일기 작성률</Status_text>
                  <Status_percent>
                    {statistics ? `${statistics.writingRate}%` : "0%"}
                  </Status_percent>
                </Circle_status>
              </Circle_graph>
            </Static_circlebox>
            <Static_stickbox>
              <Stick_status>
                <Left_status>
                  <Stick_date>
                    총{" "}
                    <span>
                      {statistics ? `${statistics.diaryCount}일` : "0일"}
                    </span>
                  </Stick_date>
                  <Stick_b></Stick_b>
                  <Photo_date>
                    사진 {statistics ? `${statistics.photoCount}회` : "0회"}
                  </Photo_date>
                </Left_status>
                <Right_status>
                  <Emotion_ul>
                    {emotionLabels.map((label, index) => (
                      <Emotion_li key={index}>{label}</Emotion_li>
                    ))}
                  </Emotion_ul>
                </Right_status>
              </Stick_status>
              <Bar_graphbox>
                {emotionKeys.map((key, index) => {
                  const value = statistics
                    ? (statistics.emotionDistribution.values[key] ?? 0)
                    : 0;
                  const height =
                    maxEmotion > 0 ? (value / maxEmotion) * 100 : 0;
                  return (
                    <Bar_box key={index}>
                      <Bar_date>
                        {statistics ? `${Math.round(value)}일` : "0일"}
                      </Bar_date>
                      <Emotion_bar bgColor={colors[index]} height={height} />
                    </Bar_box>
                  );
                })}
              </Bar_graphbox>
            </Static_stickbox>
          </Static_Graphbox>
          <Static_Message>
            <Message>
              {statistics
                ? statistics.aiReportContent
                : "데이터를 불러오는 중..."}
            </Message>
            <Message_tr></Message_tr>
            <Message_tr></Message_tr>
            <Character>
              <img src={Happy} alt="" />
            </Character>
          </Static_Message>
        </Static_Main>
      </Main_box>
    </Body>
  );
};
const Body = styled.div`
  width: 100%;
  height: 100%;
`;

const Main_box = styled.div`
  width: 100%;
  height: 100%;
  padding: 50px 80px 57px 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 42px;
`;

const Date_box = styled.div`
  width: 212px;
  height: 29px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Right_arrow = styled.div`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

const Date_title = styled.div`
  font-size: 24px;
  font-weight: 600;
  span {
    color: #daa005;
  }
`;

const Left_Arrow = styled.div`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

const Static_Main = styled.div`
  width: 1206px;
  height: 534px;
  display: flex;
  flex-direction: column;
  gap: 42px;
`;

const Static_Graphbox = styled.div`
  width: 100%;
  height: 370px;
  display: flex;
  gap: 42px;
`;

const Static_circlebox = styled.div`
  width: 370px;
  height: 100%;
  background-color: #fff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);
  padding: 45px;
`;

const Circle_graph = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  --rate: ${(props) => props.rate}%;
  background: conic-gradient(
    #fcd671 0% var(--rate),
    #f3f3f3 var(--rate) 100%
  );
  border: 2px solid #e0e0e0;
  transition: --rate 0.8s ease;
`;

const Circle_status = styled.div`
  width: 50%;
  height: 50%;
  border-radius: 50%;
  border: 2px solid #e0e0e0;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Status_text = styled.div`
  color: #333333;
  font-size: 16px;
  font-weight: 500;
`;

const Status_percent = styled.div`
  font-size: 20px;
  color: #daa005;
  font-weight: 600;
`;

const Static_stickbox = styled.div`
  width: 794px;
  height: 100%;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);
  padding: 32px 64px;
`;

const Stick_status = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Left_status = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const Stick_b = styled.div`
  width: 0px;
  height: 16px;
  border: 1px solid #828282;
`;

const Stick_date = styled.div`
  height: 24px;
  font-size: 16px;
  font-weight: 500;
  color: #828282;
  display: flex;
  justify-content: baseline;
  align-items: center;
  gap: 3px;
  span {
    font-size: 20px;
    font-weight: 600;
    color: #daa005;
    margin-bottom: 2.5px;
  }
`;

const Photo_date = styled.div`
  display: flex;
  justify-content: baseline;
  align-items: center;
  font-weight: 500;
  font-size: 16px;
  color: #828282;
`;

const Right_status = styled.div``;

const Emotion_ul = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;
  gap: 20px;
`;

const Emotion_li = styled.li`
  font-size: 13px;
  font-weight: 500;
  color: #828282;
  margin-left: 4px;

  :nth-of-type(1) {
    ::marker {
      color: #fea2a9;
    }
  }
  :nth-of-type(2) {
    ::marker {
      color: #fcd671;
    }
  }
  :nth-of-type(3) {
    ::marker {
      color: #5dc19b;
    }
  }
  :nth-of-type(4) {
    ::marker {
      color: #89d9ff;
    }
  }
  :nth-of-type(5) {
    ::marker {
      color: #cba3ff;
    }
  }
`;

const Bar_graphbox = styled.div`
  width: 100%;
  height: 258px;
  border-bottom: 2px solid #828282;
  padding: 0 50px;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  overflow-y: hidden;
`;

const Bar_box = styled.div`
  width: 60px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 6px;
`;

const Emotion_bar = styled.div`
  width: 100%;
  height: ${(props) => props.height}%;
  border-radius: 12px 12px 0 0;
  background-color: ${(props) => props.bgColor};
  transition: height 0.8s ease;
`;

const Bar_date = styled.p`
  color: #828282;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  margin-bottom: 6px;
`;

const Static_Message = styled.div`
  width: 100%;
  height: 122px;
  display: flex;
  gap: 38px;
  align-items: center;
`;

const Message = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff9eb;
  color: #575141;
  padding: 31px 185px;
  display: flex;
  align-items: center;
  text-align: center;
  flex-wrap: wrap;
  border-radius: 12px;
  border: 2px solid #e5d7b2;
`;

const Message_tr = styled.div`
  position: absolute;
  right: 280px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 19px 0px 19px 24px;
  border-color: transparent transparent transparent #fff9eb;
  :nth-of-type(2) {
    border-width: 20.5px 0px 20.5px 26px;
    border-color: transparent transparent transparent #e5d7b2;
    right: 278px;
  }
`;

const Character = styled.div``;

export default Statics;
