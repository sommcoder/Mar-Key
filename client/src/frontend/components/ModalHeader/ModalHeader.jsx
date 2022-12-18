import styled from "styled-components";

export default function ModalHeader() {
  return (
    <StyledModalHeader>Here are the marquee tiles you need:</StyledModalHeader>
  );
}
const StyledModalHeader = styled.h3`
  display: block;
  text-overflow: wrap;
  text-align: center;
  margin: 2rem auto 0rem auto;
`;
