import React, { useState } from "react";
import styled from "styled-components";
import ArticleItem from "./ArticleItem";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  const testArticles = [
    {
      id: 0,
      title: "한은 고용시장 수요 둔화·공급 확대 전망…물가 압력↓",
      content:
        "한국은행은 올해 고용시장 수요가 둔화하고 공급이 확대되면서, 물가 압력이 낮아질 것으로 예상했다.",
      photoUrl:
        "https://img.hankyung.com/photo/202304/AKR20230425073100002_01_i_P4.jpg",
    },
    {
      id: 1,
      title: "기술주 조정에 증시 강세론 힘 빠지나… 숨고르기 후 상승 전망",
      content:
        "2024년 첫 거래일에서 시가총액 1위 종목인 애플의 주가가 급락하는 등 대형 기술주들이 일제히 약세를 보이자 시장에서는 지난해를 달궜던 상승 랠리가 멈추는 것이 아니냐는 우려가 나오고 있다.",
      photoUrl:
        "https://img.hankyung.com/photo/202401/AKR20240103036600009_01_i_P4.jpg",
    },
    {
      id: 2,
      title: "美 국채금리 급등, 韓 증시와 외환 시장 영향은",
      content:
        "미국 국채금리 급등의 파장이 증시를 넘어 외환 시장에까지 영향을 미치고 있다. 우리나라의 증시와 외환 시장에는 어떤 영향을 전하게 될까.",
      photoUrl: "https://img.hankyung.com/photo/202310/AD.34901120.1.jpg",
    },
    {
      id: 3,
      title: "내년 7월부터 내부자거래 사전공시 의무화",
      content:
        "내년부터 임원과 주요 주주 등 상장사 내부자의 주식 거래는 사전공시해야 한다.",
      photoUrl: "https://img.hankyung.com/photo/202312/B20230518095927747.jpg",
    },
    {
      id: 4,
      title: "증권가 회색코뿔소·뱅크런 위험잠재…기술기업 실적악화 우려",
      content:
        "국내 증권사들은 16일 미국 실리콘밸리은행(SVB) 파산 사태를 계기로 유동성 위험이 광범위하게 확산하면 신용 위험으로 전이될 가능성이 크다고 경고했다.",
      photoUrl:
        "https://img.hankyung.com/photo/202303/AKR20230316069600002_01_i_P4.jpg",
    },
    {
      id: 5,
      title: "펀드 매니저 10년 수익률, 인덱스펀드 절반에 그치네",
      content:
        "펀드매니저가 운용하는 주식형 액티브펀드의 과거 10년 누적수익률이 지수를 기계적으로 추종하는 인덱스펀드의 절반에 불과한 것으로 나타났다. 수익률 격차는 매해 더 벌어지고 있다.",
      photoUrl: "https://img.hankyung.com/photo/202401/AA.35484012.1.jpg",
    },
    {
      id: 6,
      title: "中 1월 소비자물가 0.8%↓, 넉달 연속 ↓…디플레이션 공포 확산",
      content:
        "생산자 물가도 16개월 연속 마이너스 행진하면서 디플레이션(경기 침체 속 물가 하락) 우려가 더 커지고 있다는 분석이 나온다.",
      photoUrl:
        "https://img.hankyung.com/photo/202402/AKR20240208062851009_01_i_P4.jpg",
    },
    {
      id: 7,
      title: "이창용 가계부채 예상 밖 증가시 금리 등 통해 대응",
      content:
        "이창용 한국은행 총재는 13일 최근 주택담보대출을 포함한 가계대출이 다시 급격히 늘어나는 것과 관련해 중장기적으로 국내총생산(GDP) 대비 가계부채 비율을 줄이는 거시적 대응이 필요하다면서 예상 밖으로 급격히 늘어날 경우 금리나 거시건전성 규제 등을 통해 대응할 수 있다고 밝혔다.",
      photoUrl:
        "https://img.hankyung.com/photo/202307/PYH2023071309370001300_P4.jpg",
    },
    {
      id: 8,
      title: "4분기 상장사 실적 중간 집계해보니…절반은 '어닝쇼크",
      content:
        "국내 상장사들의 4분기 어닝시즌이 중간 지점을 돌고 있는 가운데 실적을 발표한 코스피200·코스닥150 종목 기업 중 절반 이상은 '어닝쇼크'를 낸 것으로 나타났다. ",
      photoUrl: "https://img.hankyung.com/photo/202402/02.21787311.1.jpg",
    },
    {
      id: 9,
      title: "KB증권 다이렉트인덱싱, 투자할 주식 골라 '나만의 ETF'처럼 투자",
      content:
        "KB증권은 투자자 성향을 분석해 맞춤형 주식 포트폴리오를 구성하는 ‘KB증권 다이렉트인덱싱’(사진) 서비스를 추천했다. 이 서비스는 투자자 스스로 투자 목적과 투자 성향 등을 고려해 원하는 주식 종목을 추린 뒤 상장지수펀드(ETF)처럼 만들어 투자할 수 있다.",
      photoUrl: "https://img.hankyung.com/photo/202402/AA.35742421.1.jpg",
    },
  ];

  return (
    <div style={{ margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>기사를 통해 공부해요</h1>
      <hr
        style={{
          border: "solid 4px blue",
          width: "20%",
          margin: "auto", // 가운데 정렬을 위해 margin: auto; 추가
        }}
      />
      <ArticleListContainer>
        {testArticles.map((newArticle) => (
          <ArticleItem newArticle={newArticle} key={newArticle.id} />
        ))}
      </ArticleListContainer>
    </div>
  );
};
const ArticleListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export default ArticleList;
