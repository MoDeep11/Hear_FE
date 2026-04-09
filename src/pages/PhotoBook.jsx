import styled from "@emotion/styled";
import Header from "../components/Header.jsx";
import Arrow from "../assets/Arrow.svg";
import Reverse_Arrow from "../assets/Rev-Arrow.svg";
import Search_tag from "../assets/search_tag.svg";
import { useState, useEffect } from "react";
import { getMyGallery } from "../apis/photo.api.js";

const Photo_Book = () => {
  const [dateNum, setDateNum] = useState(4); 
  const [yearNum, setYearNum] = useState(2026);
  const [galleryData, setGalleryData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const formatYearMonth = (y, m) => {
    return `${y}-${String(m).padStart(2, "0")}`;
  };

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const currentYM = formatYearMonth(yearNum, dateNum);
      const res = await getMyGallery(currentYM, searchTerm);
      
      if (res.data && res.data.length > 0) {
        setGalleryData(res.data[0].diaries);
      } else {
        setGalleryData([]);
      }
    } catch (error) {
      console.error("갤러리 로드 실패:", error);
      setGalleryData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, [dateNum, yearNum]);

  const handleSearch = (e) => {
    if (e.key === "Enter") fetchGallery();
  };

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
    } else {
      setDateNum(1);
      setYearNum(yearNum + 1);
    }
  };

  return (
    <Body>
      <Header />
      <Photo_Main>
        <Time_box>
          <img src={Arrow} alt="prev" onClick={date_minus} style={{ cursor: 'pointer' }} />
          <Time_line>
            {yearNum}년 <span>{dateNum}</span>월
          </Time_line>
          <img src={Reverse_Arrow} alt="next" onClick={date_plus} style={{ cursor: 'pointer' }} />
        </Time_box>

        <Search_box>
          <Search_bar 
            placeholder="해시태그를 검색해주세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
          />
          <img src={Search_tag} alt="search" onClick={fetchGallery} style={{ cursor: 'pointer' }} />
        </Search_box>

        <Photo_box>
          {loading ? (
            <p>사진을 불러오는 중...</p>
          ) : galleryData.length > 0 ? (
            galleryData.map((item) => (
              <Photo key={item.id} onClick={() => window.location.href=`/diary/${item.id}`}>
                <img src={item.thumbnailUrl} alt="diary" />
                <Photo_date>{item.createdAt.split('-')[2]}일</Photo_date>
                <Photo_layer />
              </Photo>
            ))
          ) : (
            <NoData>
              <Nophoto>
                사진이 없어요...
              </Nophoto>
              <Letsgo>
                일기에 추억을 남기러 갈까요?
              </Letsgo>
            </NoData>
          )}
        </Photo_box>
        
        {/* 페이징 처리: 명세서상 한 달 단위로 32개를 가져오므로, 
            만약 32개가 꽉 찼다면 '더보기' 버튼을 만들거나 다음 페이지 API를 호출해야 합니다.
            현재는 달력 이동 방식으로 충분히 커버 가능합니다. */}
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
  max-width: auto;
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
`;
const Photo_date = styled.div`
  position: absolute;
  left: 12px;
  bottom: 12px;
  font-size: 16px;
  font-weight: 400;
  color: #fff;
  z-index: 2;
`;


const NoData = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Nophoto = styled.p`
  font-weight: 500;
  font-size: 14px;
  color: #828282;
`
const Letsgo = styled.p`
  font-weight: 600;
  font-size: 20px;
  color: #4f4f4f;
`

export default Photo_Book;
