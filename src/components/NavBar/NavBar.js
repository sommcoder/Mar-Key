import styled from "styled-components";

export default function NavBar(props) {
  return (
    <StyledNavBar>
      <header>{props.title}</header>
    </StyledNavBar>
  );
}

const StyledNavBar = styled.nav`
  position: -webkit-sticky;
  position: sticky;
  top: 0; /* required */
  right: 0;
  z-index: 10;
  width: 100%;
  font-size: 4rem;
  font-weight: 650;
  background-color: white;
  margin: 0rem auto 2rem auto;
  text-align: center;
  padding-bottom: 3rem;
  border-bottom: 0.1rem solid lightgrey;
  height: 30px;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.25);
`;
