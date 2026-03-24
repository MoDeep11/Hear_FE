import styled from "@emotion/styled";
import Header from "../components/Header.jsx";
import ReverseArrow from "../assets/Rev-Arrow.svg";
import Arrow from "../assets/Arrow.svg";

const Statics = () => {
  const colors = ["#FEA2A9", "#FCD671", "#5DC19B", "#89D9FF", "#CBA3FF"];
  return (
    <Body>
      <Header />
      <Main_box>
        <Date_box>
          <Right_arrow>
            <img src={Arrow} alt="" />
          </Right_arrow>
          <Date_title>
            2026년 <span>7</span>월
          </Date_title>
          <Left_Arrow>
            <img src={ReverseArrow} alt="" />
          </Left_Arrow>
        </Date_box>
        <Static_Main>
          <Static_Graphbox>
            <Static_circlebox>
              <Circle_graph></Circle_graph>
              <Circle_status>
                <Status_text>일기 작성률</Status_text>
                <Status_percent>60%</Status_percent>
              </Circle_status>
            </Static_circlebox>
            <Static_stickbox>
              <Stick_status>
                <Left_status>
                  <Stick_date>
                    총 <span> 19일</span>
                  </Stick_date>
                  <Stick_b></Stick_b>
                  <Photo_date>사진 8회</Photo_date>
                </Left_status>

                <Right_status>
                  <Emotion_ul>
                    <Emotion_li>화남</Emotion_li>
                    <Emotion_li>평범</Emotion_li>
                    <Emotion_li>행복</Emotion_li>
                    <Emotion_li>슬픔</Emotion_li>
                    <Emotion_li>불안</Emotion_li>
                  </Emotion_ul>
                </Right_status>
              </Stick_status>
              <Bar_graphbox>
                {colors.map((color, index) => (
                  <Bar_box key={index}>
                    <Bar_date>12일</Bar_date>
                    <Emotion_bar bgColor={color} />
                  </Bar_box>
                ))}
              </Bar_graphbox>
            </Static_stickbox>
          </Static_Graphbox>
          <Static_Message>
            <Message>메세지에요!</Message>
            <Character>캐릭터</Character>
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
`;

const Static_Main = styled.div`
  width: 1206px;
  height: 534px;
  background-color: bisque;
  display: flex;
  flex-direction: column;
  gap: 42px;
`;

const Static_Graphbox = styled.div`
  width: 100%;
  height: 370px;
  display: flex;
  background-color: aqua;
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
`;

const Circle_graph = styled.div``;

const Circle_status = styled.div``;

const Status_text = styled.div``;

const Status_percent = styled.div``;

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

  :nth-child(1) {
    ::marker {
      color: #fea2a9;
    }
  }
  :nth-child(2) {
    ::marker {
      color: #fcd671;
    }
  }
  :nth-child(3) {
    ::marker {
      color: #5dc19b;
    }
  }
  :nth-child(4) {
    ::marker {
      color: #89d9ff;
    }
  }
  :nth-child(5) {
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
  overflow-y: hidden;
`;

const Bar_box = styled.div`
  width: 60px;
  height: 100%;
  margin-top: 200px; // 기본값 235px
`;

const Bar_date = styled.p`
  color: #828282;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  margin-bottom: 6px;
`;

const Emotion_bar = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background-color: ${props => props.bgColor};
`;

const Static_Message = styled.div`
  width: 100%;
  height: 122px;
  display: flex;
`;

const Message = styled.div`
  background-image: url(../assets/Text_bubble.svg);
`;

const Character = styled.div``;

export default Statics;
