import styled from "styled-components";

export const Button = styled.button`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  margin-right: 0.25rem;
  &:hover {
    cursor: pointer;
    background-color: white;
    border: 2px solid powderblue;
  }
`;

export const Arrow = styled.span`
  content: "";
  position: absolute;
  display: none;
  top: 95%;
  left: 45%;
  // not sure why 45% works?? cause of the border???
  border: 10px solid rgba(44, 43, 43, 1);
  // creates a triangle from a square:
  border-color: rgba(44, 43, 43, 1) transparent transparent transparent;
`;

export const Tooltip = styled.span`
  display: none;
  border-radius: 4px;
  text-align: center;
  position: absolute;
  font-size: 1.25rem;
  top: -20%; // <-- allows space for tooltip arrow
  left: 50%;
  transform: translateX(-50%) translateY(-110%);
  color: white;
  background-color: rgba(44, 43, 43, 1);
  width: 150px;
  padding: 8px 8px;
`;
