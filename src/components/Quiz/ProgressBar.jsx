import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ProgressBar = ({ percentage }) => {
  const [style, setStyle] = useState({});

  useEffect(() => {
    const newStyle = {
      width: `${percentage}%`,
      height: "9px",
      backgroundColor: "#002DAB",
    };

    setStyle(newStyle);
  }, [percentage]);

  return <Wrapper>{percentage > 0 && <Filler style={style} />}</Wrapper>;
};

const Wrapper = styled.div`
  width: 300px;
  height: 9px;
  background-color: #ebebeb;
  border-radius: 5px;
  overflow: hidden;
`;

const Filler = styled.div`
  height: 100%;
`;

export default ProgressBar;
