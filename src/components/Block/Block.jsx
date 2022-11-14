import styled from "styled-components";

export default function Block({ block, style }) {
  const blockWidth = style + "rem";
  return (
    <>
      <StyledBlock
        readOnly
        maxLength="1"
        type="text"
        blockWidth={blockWidth}
        value={block}
      />
    </>
  );
}

const StyledBlock = styled.input`
  font-size: 2.8rem;
  user-select: none;
  width: ${(props) => (props.blockWidth ? props.blockWidth : "2rem")};
  -webkit-user-select: none;
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;
  border: 0.1rem solid grey;
  user-select: none;
  background-color: white;
  caret-color: transparent;
  cursor: default; // we want no inference that a user can interact with the marquee directly
  transition: ease-in-out;
  animation: fadeInAnimation ease-in-out 1s;
  animation-iteration-count: 1;

  &:focus {
    outline: none;
  }

  @keyframes fadeInAnimation {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
`;
