import styled from "@emotion/styled";
import Header from "../components/Header.jsx";
import Arrow from "../assets/Arrow.svg";
import Reverse_Arrow from "../assets/Rev-Arrow.svg";
import Search_tag from "../assets/search_tag.svg";
import { useState, useEffect, useCallback, useRef } from "react";
import { getMyGallery } from "../apis/photo.api.js";
import { useNavigate } from "react-router-dom"; 

const Photo_Book = () => {
  const navigate = useNavigate(); 
  const [dateNum, setDateNum] = useState(4);
  const [yearNum, setYearNum] = useState(2026);
  const [galleryData, setGalleryData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const searchTermRef = useRef(searchTerm);
  useEffect(() => {
    searchTermRef.current = searchTerm;
  }, [searchTerm]);

  const formatYearMonth = (y, m) => {
    return `${y}-${String(m).padStart(2, "0")}`;
  };

  const fetchGallery = useCallback(async () => {
    setLoading(true);
    try {
      const currentYM = formatYearMonth(yearNum, dateNum);
      const res = await getMyGallery(currentYM, searchTermRef.current);
      if (res.data && res.data.length > 0) {
        setGalleryData(res.data);
      } else {
        setGalleryData([]);
      }
    } catch (error) {
      console.error("갤러리 로드 실패:", error);
      setGalleryData([]);
    } finally {
      setLoading(false);
    }
  }, [yearNum, dateNum]);

  const filteredData = appliedSearch.trim()
    ? galleryData.filter((item) =>
        (item.tags || []).some((tag) =>
          tag.toLowerCase().includes(appliedSearch.toLowerCase())
        )
      )
    : galleryData;

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  const handleSearch = () => {
    setAppliedSearch(searchTerm);
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
          <img src={Arrow} alt="prev" onClick={date_minus} style={{ cursor: "pointer" }} />
          <Time_line>
            {yearNum}년 <span>{dateNum}</span>월
          </Time_line>
          <img src={Reverse_Arrow} alt="next" onClick={date_plus} style={{ cursor: "pointer" }} />
        </Time_box>
        <Search_box>
          <Search_bar
            placeholder="해시태그를 검색해주세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
          />
          <img src={Search_tag} alt="search" onClick={handleSearch} style={{ cursor: "pointer" }} />
        </Search_box>
        <Photo_box>
          {loading ? (
            <p>사진을 불러오는 중...</p>
          ) : filteredData.length > 0 ? (
            filteredData.map((item) => (
              <Photo key={item.id} onClick={() => navigate(`/diary/${item.id}`)}>
                <img src={item.thumbnailUrl} alt="diary" />
                <Photo_date>
                  {item.createdAt ? `${item.createdAt.split("-")[2]}일` : "날짜 없음"}
                </Photo_date>
                <Photo_layer />
              </Photo>
            ))
          ) : (
            <NoData>
              <Nophoto>사진이 없어요...</Nophoto>
              <Letsgo>일기에 추억을 남기러 갈까요?</Letsgo>
            </NoData>
          )}
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
  cursor: pointer;
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
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.5) 100%);
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
`;
const Letsgo = styled.p`
  font-weight: 600;
  font-size: 20px;
  color: #4f4f4f;
`;

export default Photo_Book;