import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MyList from "~/components/MyPage/MyList";
import Pagination from "~/components/MyPage/Pagination";
import { fetchMyList } from "../../lib/apis/mypage";
import useAuth from "~/lib/hooks/useAuth";
import { Spinner } from "react-bootstrap";
import Visualizer from "../../components/MyPage/Visualizer";

const MyPage = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 10;
  const offset = (page - 1) * limit;

  const [selectOption, setSelectOption] = useState({
    value: "all",
    label: "전체",
  });

  const fetchMyPageData = async () => {
    try {
      setLoading(true);
      if (user) {
        const response = await fetchMyList(user._id);

        setData(response);
      }
    } catch (error) {
      // console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPageData();
  }, [user]);

  const questionObjects = data?.questionArray.map((question, index) => ({
    id: index,
    accuracy: data.accuracyArray[index],
    question: question,
    correctAnswer: data.correctArray[index],
    userAnswer: data.userArray[index],
  }));

  const trueQuestions = questionObjects?.filter(
    (question) => question.accuracy === true
  );
  const falseQuestions = questionObjects?.filter(
    (question) => question.accuracy === false
  );

  const numbersObject = {
    totalNum: data?.accuracyArray.length,
    correctNum: data?.correctNum,
    wrongNum: data?.wrongNum,
  };

  const postsData = () => {
    let filteredPosts = [];
    if (questionObjects && questionObjects.length > 0) {
      switch (selectOption.value) {
        case "all":
          filteredPosts = questionObjects;
          break;
        case "right":
          filteredPosts = trueQuestions;
          break;
        case "wrong":
          filteredPosts = falseQuestions;
          break;
        default:
          filteredPosts = [];
      }
    }

    let result = filteredPosts.slice(offset, offset + limit);

    return { filteredPosts: result, filteredPostsLength: filteredPosts.length };
  };

  const { filteredPosts, filteredPostsLength } = postsData();

  const handleSelectOptionChange = (e) => {
    if (e) {
      setSelectOption(e);
      setPage(1);
    } else {
      setSelectOption("");
    }
  };
  const options = [
    { value: "all", label: "전체" },
    { value: "right", label: "정답" },
    { value: "wrong", label: "오답" },
  ];

  if (loading) {
    return (
      <SpinnerContainer>
        <Spinner animation="border" role="status">
          <span className="sr-only"></span>
        </Spinner>
      </SpinnerContainer>
    );
  }

  return (
    <Container>
      {data?.questionArray.length != 0 ? (
        <Visualizer dateArray={data?.dateArray} />
      ) : (
        <></>
      )}
      <MyList
        handleSelectOptionChange={handleSelectOptionChange}
        options={options}
        list={filteredPosts}
        numbersObject={numbersObject}
      />
      <Pagination
        limit={limit}
        page={page}
        totalPosts={filteredPostsLength}
        setPage={setPage}
      />
    </Container>
  );
};

export default MyPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
