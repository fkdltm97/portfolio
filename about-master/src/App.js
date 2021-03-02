import React, {useRef, useState} from "react";
import styled from "styled-components";
import Nav from "./components/Nav";
import Main from "./components/Main";
import About from "./components/About";
import Project from "./components/Project";
// import Else from "./components/Else";

const AppWrapper = styled.div`
  position: relative;
  scroll-behavior: smooth;
`;

function App() {
  const app = useRef(null);
  const [offset, setOffset] = useState({});

  const handleOnScroll = () => {
    console.log("hi");
  };

  return (
    <AppWrapper className="App" ref={app} onScroll={handleOnScroll}>
      <Nav offset={offset} />
      <Main app={app} offset={offset} setOffset={setOffset} />
      <About setOffset={setOffset} />
      <Project setOffset={setOffset} />
      {/* <Else /> */}
    </AppWrapper>
  );
}

export default App;
