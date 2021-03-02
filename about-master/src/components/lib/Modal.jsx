import React, {useRef, useState} from "react";
import styled from "styled-components";

const ModalWrapper = styled.div`
  animation: opacity 0.3s ease-out;
  @keyframes opacity {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  .modalWrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    &::after {
      content: "";
      width: 100%;
      height: 100%;
      background: #000;
      position: absolute;
      left: 0;
      top: 0;
      filter: blur(0px);
      opacity: 0.2;
    }
  }
  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(#000 20%, #fff 20%);
    width: 600px;
    height: 700px;
    border-radius: 0.5rem;
    overflow: hidden;
    z-index: 101;
    .modal__closeBtn {
      position: absolute;
      bottom: 10px;
      right: 10px;
      padding: 0 15px 15px 15px;
      font-size: 1.5rem;
      z-index: 100;
      cursor: default;
      &:hover {
        color: #e31b6d;
      }
    }
    > i {
      font-size: 3rem;
      padding: 15px;
      color: #9e9e9e;
      opacity: 0.7;
      z-index: 50;
      &:hover {
        color: #e31b6d;
      }
      &.fa-angle-left {
        position: absolute;
        top: 200px;
        left: 0;
        transform: translate(0, -50%);
      }
      &.fa-angle-right {
        position: absolute;
        top: 200px;
        right: 0;
        transform: translate(0, -50%);
      }
    }
    .modal__slide {
      display: flex;
      position: absolute;
      top: 0;
      width: 400%;
      height: 400px;
      background: #000;
      transition: all 0.5s;
      div {
        display: inline-block;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        width: 25%;
        color: red;
      }
    }
  }
  .modal__contents {
    margin-top: 400px;
    padding: 15px;
    .modal__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      button {
        border: 2px solid #e31b6d;
        padding: 5px 10px;
        outline: none;
        background: transparent;
        font-size: 1.3rem;
        font-weight: 400;
        color: #e31b6d;
        transition: 0.3s;
        &:hover {
          background: #e31b6d;
          color: #fff;
        }
      }
    }
    .modal__techs {
      padding: 15px 0;
      border-bottom: 1px solid #d9dfeb;
    }
    .modal__description {
      padding: 15px 0;
    }
  }
`;

function Modal({project, setShowModal}) {
  const slide = useRef(null);
  const [slideDirection, setSlideDirection] = useState("");

  const handleCloseButtonClick = () => {
    setShowModal(false);
  };

  const handlePrevButtonClick = () => {
    slide.current.prepend(slide.current.lastElementChild);
    slide.current.style.transition = "none";
    slide.current.style.transform = "translate(-25%)";
    setTimeout(() => {
      slide.current.style.transition = "all 0.5s";
      slide.current.style.transform = "translate(0)";
    });

    setSlideDirection("prev");
  };

  const handleNextButtonClick = () => {
    slide.current.style.transform = "translate(-25%)";
    setSlideDirection("next");
  };

  const handleTransitionEnd = (e) => {
    e.persist();
    if (slideDirection === "next") {
      e.target.appendChild(e.target.firstElementChild);
      e.target.style.transition = "none";
      e.target.style.transform = "translate(0)";
      setTimeout(() => {
        e.target.style.transition = "all 0.5s";
      });
    }
    setSlideDirection("");
  };

  const handleLinkClick = () => {
    window.open(project.link);
  };

  return (
    <ModalWrapper>
      <div className="modalWrapper"></div>
      <section className="modal">
        <div className="modal__closeBtn" onClick={handleCloseButtonClick}>
          ✖
        </div>
        <i className="fas fa-angle-left" onClick={handlePrevButtonClick}></i>
        <i className="fas fa-angle-right" onClick={handleNextButtonClick}></i>
        <header
          className="modal__slide"
          ref={slide}
          onTransitionEnd={handleTransitionEnd}
          style={{left: "0"}}
        >
          {project.imgs.map((img) => (
            <div
              style={{
                backgroundImage: `url(${img})`,
              }}
            ></div>
          ))}
          {/* DOM 조작할 요소들 */}
        </header>
        <div className="modal__contents">
          <header className="modal__header">
            <h2>프로젝트명</h2>
            {project.link && <button onClick={handleLinkClick}>link</button>}
          </header>
          <div className="modal__techs">
            기술스택: {project.techs.join(", ")}
          </div>
          <div className="modal__description">{project.description}</div>
        </div>
      </section>
    </ModalWrapper>
  );
}

export default React.memo(Modal);
