import React, {useRef, useEffect} from "react";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";

const MainWrapper = styled.section`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #1b242f;
  overflow: hidden;
  span {
    position: absolute;
    border-radius: 100%;
    animation: bubble 5s linear infinite;
  }

  @keyframes bubble {
    0% {
      transform: scale(0) translateY(0) rotate(0deg);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    100% {
      transform: scale(1) translateY(-400%) rotate(360deg);
    }
  }
  .main__introduce {
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
      font-size: 2rem;
      color: #ffffff;
      strong {
        color: #e31b6d;
      }
    }
    button {
      margin-top: 15px;
      padding: 10px 20px;
      border: 2px solid #ffffff;
      outline: none;
      background: transparent;
      font-size: 1.3rem;
      font-weight: 400;
      color: #fff;
      transition: 0.3s;
    }
    button:hover {
      border: 2px solid #e31b6d;
      background: #e31b6d;
    }
    button:hover .arrow {
      transform: rotate(90deg);
    }
  }
  .arrow {
    margin-left: 10px;
    transition: all 0.3s;
  }
  @media screen and (min-width: 768px) and (max-width: 1099px) {
    .main__introduce p {
      font-size: 1.5rem;
    }
    .main__introduce button {
      font-size: 1.2rem;
    }
  }

  @media screen and (min-width: 360px) and (max-width: 767px) {
    .main__introduce {
      padding: 0 15px;
    }
    .main__introduce p {
      font-size: 1.3rem;
    }
    .main__introduce button {
      padding: 5px 10px;
      font-size: 1.2rem;
    }
  }
`;

function Main({app, offset, setOffset}) {
  const main = useRef(null);
  const button = useRef(null);
  const createSquare = () => {
    const square = document.createElement("span");

    let size = Math.random() * 30;
    const colors = ["#2196f3", "#e91e63", "#ffeb3b", "#74ff1d"];

    square.style.width = 20 + size + "px";
    square.style.height = 20 + size + "px";
    square.style.top = Math.random() * window.innerHeight + "px";
    square.style.left = Math.random() * window.innerWidth + "px";

    const bg = colors[Math.floor(Math.random() * colors.length)];
    square.style.background = bg;

    main.current.appendChild(square);
    setTimeout(() => {
      square.remove();
    }, 5000);

    square.addEventListener("mouseover", () => {
      square.remove();
    });
    return () => {
      square.removeEventListener("mouseover");
    };
  };

  useEffect(() => {
    setOffset((prevOffset) => ({...prevOffset, main: main.current.offsetTop}));
  }, [setOffset]);

  useEffect(() => {
    setInterval(createSquare, 150);
  }, []);

  const handleOnClick = () => {
    window.scrollTo({top: offset.about - 25});
  };

  return (
    <MainWrapper className="main" ref={main}>
      <div className="main__introduce">
        <p>
          안녕하세요, 풀스택 개발자가 목표인 
        </p>
        <p>저는 주니어 프론트엔드 개발자 <strong>이형규</strong>입니다. </p>
        <button ref={button} onClick={handleOnClick}>
          소개하기
          <FontAwesomeIcon className="arrow" icon={faArrowRight} />
        </button>
      </div>
    </MainWrapper>
  );
}

export default Main;
