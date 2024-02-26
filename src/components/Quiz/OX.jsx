import React, { useEffect } from "react";
import styled from "styled-components";

const OX = ({ check }) => {
  useEffect(() => {
    document.body.style.cssText = `
          position: fixed; 
          top: -${window.scrollY}px;
          overflow-y: scroll;
          width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);
  return (
    <>
      <PopupBg></PopupBg>
      <PopupContainer>
        {check ? (
          <>
            <Character src="public/shinhan3.svg" alt="정답" />
            <Answer src="public/O.svg" alt="정답" />
          </>
        ) : (
          <>
            <Answer src="public/X.svg" alt="오답" />
            <Character src="public/shinhan2.svg" alt="오답" />
          </>
        )}
      </PopupContainer>
    </>
  );
};

export default OX;

const PopupBg = styled.div`
  width: 200vw;
  height: 200vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 100px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

const PopupContent = styled.div`
  /* text-align: center; */
  /* gap: 30px; */
`;

const Character = styled.img``;

const Answer = styled.img``;
