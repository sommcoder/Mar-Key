import styled from "styled-components";

export default function Header(props) {
  return <StyledHeader id="header">{props.title}</StyledHeader>;
}

const StyledHeader = styled.h1`
  font-size: 4rem;
  background-color: white;
  position: sticky;
  top: 0px;
  margin: 1rem auto 2rem auto;
  text-align: center;
  padding-bottom: 3rem;
  border-bottom: 0.1rem solid lightgrey;
  width: 100%;
  height: 30px;
  z-index: 2;
`;
