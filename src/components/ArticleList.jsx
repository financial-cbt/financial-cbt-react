import React, { useState } from "react";
import styled from "styled-components";
import ArticleItem from "./ArticleItem";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  const testArticles = [
    {
      id: 0,
      title: "펀드 매니저 10년 수익률, 인덱스펀드 절반에 그치네",
      content:
        "펀드 매니저 10년 수익률, 인덱스펀드 절반에 그치네, 지수 추종 땐 60%…액티브 34%",
      photoUrl: "https://img.hankyung.com/photo/202401/AA.35484012.3.jpg",
    },
    {
      id: 1,
      title: "中 1월 소비자물가 0.8%↓, 넉달 연속 ↓…디플레이션 공포 확산",
      content: "생산자물가도 2.5% 하락해 16개월째 마이너스...",
      photoUrl:
        "https://img.hankyung.com/photo/202402/AKR20240208062851009_01_i_P4.jpg",
    },
    {
      id: 2,
      title: "이창용 가계부채 예상 밖 증가시 금리 등 통해",
      content: "중장기적으로 GDP 대비 가계부채 비율 80%로 줄여야...",
      photoUrl:
        "https://img.hankyung.com/photo/202307/PYH2023071309370001300_P4.jpg",
    },
    {
      id: 3,
      title: "KB증권 다이렉트인덱싱, 투자할 주식 골라 '나만의 ETF'처럼 투자",
      content:
        "KB증권은 투자자 성향을 분석해 맞춤형 주식 포트폴리오를 구성하는 ‘KB증권...",
      photoUrl: "https://img.hankyung.com/photo/202402/AA.35742421.1.jpg",
    },
    {
      id: 4,
      title: "기술주 조정에 증시 강세론 힘 빠지나… 숨고르기 후 상승 전망",
      content:
        "2024년 첫 거래일에서 시가총액 1위 종목인 애플의 주가가 급락하는 등 대형 기술주들이 일제히 약세를 보이자 시장에서는 지난해를 달궜던 상승 랠리가 멈추는 것이 아니냐는 우려가 나오고 있다.",
      photoUrl:
        "https://img.hankyung.com/photo/202401/AKR20240103036600009_01_i_P4.jpg",
    },
    {
      id: 5,
      title: "美 국채금리 급등, 韓 증시와 외환 시장 영향은",
      content:
        "미국 국채금리 급등의 파장이 증시를 넘어 외환 시장에까지 영향을 미치고 있다. 우리나라의 증시와 외환 시장에는 어떤 영향을 전하게 될까.",
      photoUrl: "https://img.hankyung.com/photo/202310/AD.34901120.1.jpg",
    },
    {
      id: 6,
      title: "내년 7월부터 내부자거래 사전공시 의무화",
      content:
        "금융위원회에 따르면 상장회사 내부자의 대규모 주식거래를 사전에 공시하도록 하는 '자본시장 및 금융투자업에 관한 법률'(이하 자본시장법) 개정안이 28일 국회 본회의를 통과했다.",
      photoUrl: "https://img.hankyung.com/photo/202312/B20230518095927747.jpg",
    },
    {
      id: 7,
      title: "증권가 회색코뿔소·뱅크런 위험잠재…기술기업 실적악화 우려",
      content:
        "국내 증권사들은 16일 미국 실리콘밸리은행(SVB) 파산 사태를 계기로 유동성 위험이 광범위하게 확산하면 신용 위험으로 전이될 가능성이 크다고 경고했다.",
      photoUrl:
        "https://img.hankyung.com/photo/202303/AKR20230316069600002_01_i_P4.jpg",
    },
    {
      id: 8,
      title: "한은 고용시장 수요 둔화·공급 확대 전망…물가 압력↓",
      content:
        "한국은행은 올해 고용시장 수요가 둔화하고 공급이 확대되면서, 물가 압력이 낮아질 것으로 예상했다.",
      photoUrl:
        "https://img.hankyung.com/photo/202304/AKR20230425073100002_01_i_P4.jpg",
    },
    {
      id: 9,
      title: "4분기 상장사 실적 중간 집계해보니…절반은 어닝쇼크",
      content:
        "국내 상장사들의 4분기 어닝시즌이 중간 지점을 돌고 있는 가운데 실적을 발표한 코스피200·코스닥150 종목 기업 중 절반 이상은 '어닝쇼크'를 낸 것으로 나타났다. ",
      photoUrl: "https://img.hankyung.com/photo/202402/02.21787311.1.jpg",
    },
  ];

  return (
    <div>
      <h1 style={{ marginLeft: "40px" }}>기사 사이트</h1>
      <ArticleListContainer>
        {testArticles.map((newArticle) => (
          <ArticleItem newArticle={newArticle} key={newArticle.articleId} />
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
