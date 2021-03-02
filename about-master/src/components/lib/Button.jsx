import React from "react";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";

const ButtonWrapper = styled.button`
  margin-top: 15px;
  padding: 10px 20px;
  border: 2px solid #ffffff;
  outline: none;
  background: transparent;
  font-size: 1.3rem;
  font-weight: 400;
  color: #fff;
  transition: 0.3s;

  &:hover {
    border: 2px solid #e31b6d;
    background: #e31b6d;
  }
  &:hover .arrow {
    transform: rotate(90deg);
  }
  .arrow {
    margin-left: 10px;
    transition: all 0.3s;
  }
`;

function Button({children}) {
  return (
    <ButtonWrapper>
      {children}
      <FontAwesomeIcon className="arrow" icon={faArrowRight} />
    </ButtonWrapper>
  );
}

export default Button;
