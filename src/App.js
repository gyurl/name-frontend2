import React, { useState } from 'react';
import { FaMagic, FaCopy, FaRandom } from 'react-icons/fa';
import './App.css';

function App() {
  const [nickname, setNickname] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // 로컬에서 사용할 닉네임 목록
  const LOCAL_NAMES = [
    "우드세이지", "씨솔트", "라임바질", "블랙베리", "피오니", "블러쉬수에이드", "와일드블루벨", "넥타린허니",
    "잉글리쉬페어", "레드로즈", "화이트자스민", "다크앰버", "그린위트", "앰버패츌리", "파인앤유클립투스", "허니서클",
    "포피앤바알리", "사이프러스앤그레이프바인", "마그놀리아", "로즈앤화이트머스크", "유자", "그레이앰버", "프렌치라임블로섬",
    "탐다오", "필로시코스", "오로즈", "로엥", "도손", "로브르", "플레르드뽀", "에우데민떼",
    "블랑쉬", "모하비고스트", "집시워터", "라튤립", "로즈오브노맨즈랜드", "발다프리크", "슬로우댄스", "언네임드",
    "상탈33", "떼누아르29", "로즈31", "어나더13", "베티버46", "앰브레트9", "릴랙톤", "네롤리36",
    "로스트체리", "비터피치", "화이트스웨이드", "바닐라패탈", "오드우드", "네롤리포르토피노", "코스타아주라", "메탈릭",
    "타바코바닐라", "자스민루쥬", "블랙오키드", "샹탈블러쉬", "플뢰르드포르토피노", "로즈프릭", "솔레이블랑", "플럼재퍼니",
    "카페로즈", "엠버누아", "비치워크", "언더더레몬트리", "재즈클럽", "코피브레이크", "위켄드", "러지라이브러리",
    "세일링데이", "스프링타임인어팍", "댄싱온더문", "가브리엘", "알뤼르", "샹스", "코코마드모아젤", "넘버파이브",
    "베이지", "에고이스트", "크리스탈", "쁘렝땅", "오블루", "쟈도르", "미스디올", "퓨어푸아송",
    "옴므인트렌스", "소바쥬", "포에버앤에버", "자도르인조이", "로즈그리", "옴니아아메시스트", "블루마린", "쥬얼",
    "러브스토리", "에끌라드", "블러썸", "로즈페탈", "비바라쥬이시", "플라워밤", "플라워마켓", "리프레쉬",
    "에끌라드아르페쥬", "돌체", "인퓨전디아이리스", "인퓨전드만다린", "시트러스티", "일랑일랑", "아쿠아", "사파이어",
    "로투스", "네롤리", "오키드", "튤립", "블루벨", "카모마일", "자스민", "무스크", "샌달우드", "만다린", "베르가못",
    "피그리프", "프리지아", "레몬버베나", "히비스커스", "그린티", "패출리", "로즈마리", "라벤더", "카다멈", "시나몬",
    "화이트머스크", "파우더리", "엘릭서", "앰버노와르", "셀린느", "미스트", "뮤즈", "샤인", "쥬이시쿠튀르", "루미너스티아레",
    "코랄", "허그앤블룸", "피치앤크림", "쥬얼페탈", "데이브레이크", "미드나잇블랙체리", "썬릿피오니", "로지페탈", "로즈더스트"
  ];

  const getRandomNickname = async () => {
    setIsLoading(true);
    try {
      // API 요청 시도
      const response = await fetch('/api/nickname/random');
      const text = await response.text();
      
      // 응답이 HTML인지 확인 (에러 응답의 경우)
      if (text.includes('<!DOCTYPE') || text.includes('<html>')) {
        // HTML 태그가 포함된 경우 로컬 닉네임으로 대체
        const randomIndex = Math.floor(Math.random() * LOCAL_NAMES.length);
        setNickname(LOCAL_NAMES[randomIndex]);
      } else {
        setNickname(text);
      }
    } catch (error) {
      console.error('닉네임을 가져오는 중 오류가 발생했습니다', error);
      // API 요청 실패 시 로컬에서 닉네임 생성
      const randomIndex = Math.floor(Math.random() * LOCAL_NAMES.length);
      setNickname(LOCAL_NAMES[randomIndex]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!nickname) return;
    
    navigator.clipboard.writeText(nickname)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch(err => {
        console.error('클립보드에 복사하는 중 오류가 발생했습니다', err);
      });
  };

  return (
    <div className="app-container">
      <div className="nickname-card">
        <div className="card-header">
          <div className="icon-wrapper">
            <FaMagic />
          </div>
          <h1 className="title">랜덤 닉네임 뽑기</h1>
        </div>
        
        <div className="card-content">
          <button 
            className="generate-btn" 
            onClick={getRandomNickname}
            disabled={isLoading}
          >
            {isLoading ? '생성 중...' : '눌러서 뽑기!'}
          </button>
          
          {nickname && (
            <div className="result-area">
              <div className="result-label">나의 닉네임</div>
              <div className="nickname-display">
                <span className="nickname">{nickname}</span>
                <button 
                  className="copy-btn" 
                  onClick={copyToClipboard}
                  title="클립보드에 복사"
                >
                  <FaCopy />
                  {isCopied ? '복사됨!' : '복사'}
                </button>
              </div>
            </div>
          )}
          
          {nickname && (
            <div className="nickname-info">
              <div className="tags">
                <span className="tag">랜덤</span>
                <span className="tag">유니크</span>
              </div>
              <p className="description">
                생성된 랜덤 닉네임입니다. 뽑기 버튼을 눌러 새로운 닉네임을 생성할 수 있습니다.
              </p>
            </div>
          )}
        </div>
      </div>
      
      <div className="footer">
        © 2025 랜덤 닉네임 뽑기 
      </div>
    </div>
  );
}

export default App;