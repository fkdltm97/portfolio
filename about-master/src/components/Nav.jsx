import React, {useState, useRef} from "react";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faMobileAlt} from "@fortawesome/free-solid-svg-icons";

const NavWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  padding: 15px 0;
  background: #1b242f;
  color: #fff;
  z-index: 100;
  &.home {
    .nav__navigators li:first-child {
      color: #136cd8;
    }
    .nav__navigators li:first-child::before {
      background: #136cd8;
      width: 43px;
    }
  }
  &.about {
    .nav__navigators li:nth-child(2) {
      color: #136cd8;
    }
    .nav__navigators li:nth-child(2)::before {
      background: #136cd8;
      width: 43px;
    }
  }
  &.project {
    .nav__navigators li:nth-child(3) {
      color: #136cd8;
    }
    .nav__navigators li:nth-child(3)::before {
      background: #136cd8;
      width: 43px;
    }
  }

  .nav__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  ul {
    display: flex;
  }
  .nav__navigators {
    cursor: default;
    li {
      position: relative;
      margin-right: 25px;
      font-size: 1.15rem;
      font-weight: 600;
      transition: 0.3s;
      &:hover {
        color: #136cd8;
      }
      &::before {
        content: "";
        position: absolute;
        left: 50%;
        bottom: -2px;
        width: 0px;
        height: 2px;
        background: #fff;
        transform: translateX(-50%);
        transition: 0.3s;
      }
    }
  }
  i.fa-bars,
  i.fa-times {
    display: none;
    font-size: 1.5rem;
    transition: 0.3s;
  }
  .nav__links {
    position: relative;

    li {
      padding: 0 30px;
      text-align: right;
      font-size: 1.3rem;
      &:hover {
        color: #136cd8;
        transition: 0.3s;
      }
      &#velog {
        padding-right: 0;
      }
    }
    .links__popUp {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      left: 0px;
      top: calc(100% + 15px);
      padding: 10px 5px;
      border-radius: 8px;
      background: #136cd8;
      transition: 0.3s;
      animation: opacity 0.3s forwards;
      @keyframes opacity {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
    }
  }
  @media screen and (min-width: 360px) and (max-width: 767px) {
    &.home {
      .nav__navigators li:first-child {
        color: #136cd8;
      }
      .nav__navigators li:first-child::before {
        background: #136cd8;
        width: 100px;
        height: 2px;
      }
    }
    &.about {
      .nav__navigators li:nth-child(2) {
        color: #136cd8;
      }
      .nav__navigators li:nth-child(2)::before {
        background: #136cd8;
        width: 100px;
        height: 2px;
      }
    }
    &.project {
      .nav__navigators li:nth-child(3) {
        color: #136cd8;
      }
      .nav__navigators li:nth-child(3)::before {
        background: #136cd8;
        width: 100px;
        height: 2px;
      }
    }
    .nav__navigators {
      display: none;
      position: fixed;
      top: 61px;
      left: 0;
      right: 0;
      bottom: 0;
      background: white;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      z-index: 100;
      animation: left 0.3s forwards;
      @keyframes left {
        0% {
          transform: translateX(-100%);
          opacity: 0;
        }
        100% {
          transform: translateX(0);
          opacity: 1;
        }
      }
      li {
        font-size: 2.5rem;
        color: black;
        margin: 0;
      }
    }
    i.fa-bars {
      display: block;
      font-size: 1.5rem;
    }
    .nav__links li {
      padding: 0 18px;
    }
    .nav__links .links__popUp {
      left: -15px;
    }
  }
`;

function Nav({offset}) {
  let hamburger = useRef(null);
  const closeBtn = useRef(null);
  const navigator = useRef(null);
  const {main, about, project} = offset;
  const [currentScroll, setCurrentScroll] = useState("home");
  const [iconContent, setIconContent] = useState("");
  const [isToggle, setIsToggle] = useState(false);

  document.addEventListener("scroll", () => {
    if (window.scrollY < about - 100) {
      setCurrentScroll("home");
    } else if (
      about - 100 <= window.scrollY &&
      window.scrollY <= project - 200
    ) {
      setCurrentScroll("about");
    } else {
      setCurrentScroll("project");
    }
  });

  const handleOnClick = (e) => {
    const menuName = e.target.dataset.menu;

    switch (menuName) {
      case "home":
        window.scrollTo({top: main});
        break;
      case "about":
        window.scrollTo({top: about - 25});
        break;
      case "project":
        window.scrollTo({top: project - 25});
        break;
      default:
        break;
    }
    if (navigator.current.style.position === "fixed") {
      setIsToggle(false);
      hamburger.current.style.display = "block";
      hamburger.current.style.color = "whitee";
      navigator.current.style.display = "none";
    }
  };

  const handleMenuBar = (e) => {
    if (isToggle) {
      e.target.style.color = "";
      setIsToggle(false);
    } else {
      setIsToggle(true);
      e.target.style.color = "#136cd8";
    }
    console.dir(e.target);
    if (navigator.current.style.display === "flex") {
      navigator.current.style.display = "none";
      navigator.current.style.position = "none";
    } else {
      navigator.current.style.display = "flex";
      navigator.current.style.position = "fixed";
    }
  };

  const handleMouseOver = (e) => {
    const iconName = e.target.dataset.icon;

    switch (iconName) {
      case "email":
        setIconContent("gkdlvp97@naver.com");
        break;
      case "phone":
        setIconContent("010-8557-7645");
        break;
      case "github":
        setIconContent("github.com/fkldtm97");
        break;       
      default:
        break;
    }
  };

  const handleMouseLeave = () => {
    setIconContent("");
  };

  return (
    <NavWrapper
      className={`
      nav 
      ${currentScroll === "home" && "home"} 
      ${currentScroll === "about" && "about"} 
      ${currentScroll === "project" && "project"}`}
      onMouseLeave={handleMouseLeave}
    >
      <div className="nav__container container">
        <ul className="nav__navigators" ref={navigator}>
          <li data-menu="home" onClick={handleOnClick}>
            HOME
          </li>
          <li data-menu="about" onClick={handleOnClick}>
            ABOUT
          </li>
          <li data-menu="project" onClick={handleOnClick}>
            PROJECT
          </li>
          {/* <li data-menu="else" onClick={handleOnClick}>
          WHAT ELSE?
        </li> */}
        </ul>
        <i
          className="fas fa-bars"
          id="test"
          onClick={handleMenuBar}
          ref={hamburger}
        ></i>
        <i className="fas fa-times" onClick={handleMenuBar} ref={closeBtn}></i>
        <ul className="nav__links">
          <li data-icon="email" onMouseOver={handleMouseOver}>
            <FontAwesomeIcon icon={faEnvelope} />
          </li>
          <li data-icon="phone" onMouseOver={handleMouseOver}
            
          >
            <FontAwesomeIcon icon={faMobileAlt} />
          </li>
          <li
            data-icon="github"
            onMouseOver={handleMouseOver}
            onClick={() => window.open("https://github.com/fkdltm97")}
          >
            <i className="fab fa-github"></i>
          </li>
          {/* <li
            id="velog"
            data-icon="velog"
            onMouseOver={handleMouseOver}
            onClick={() => window.open("https://velog.io/@y1andyu")}
          >
            <i className="fab fa-vimeo-v"></i>
          </li> */}
          {iconContent && (
            <div className="links__popUp" onMouseLeave={handleMouseLeave}>
              {iconContent}
            </div>
          )}
        </ul>
      </div>
    </NavWrapper>
  );
}

export default Nav;
