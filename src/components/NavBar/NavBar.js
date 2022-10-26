import styled from "styled-components";
import { useRef } from "react";

export default function NavBar(props) {
  const navBar = useRef(null);

  const positionY = window.pageYOffset;

  console.log("positionY:", positionY);
  return (
    <StyledNavBar ref={navBar}>
      <header>{props.title}</header>
    </StyledNavBar>
  );
}

const StyledNavBar = styled.nav`
  position: -webkit-sticky;
  position: sticky;
  top: 0; /* required */
  z-index: 10;
  width: 100%;
  font-size: 4rem;
  font-weight: 650;
  background-color: white;
  margin: 1rem auto 2rem auto;
  text-align: center;
  padding-bottom: 3rem;
  border-bottom: 0.1rem solid lightgrey;
  height: 30px;
`;

// const Sticky = styled(StyledNavBar)`
//   position: sticky;
//   top: 0;
//   width: 100%;
// `;
