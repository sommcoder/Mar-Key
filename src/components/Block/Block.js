import styled, { css } from "styled-components";

export default function Block(props) {
  const blockWidth = {
    width: props.style,
  };

  /*
The Block Component(s) are generated by the rowState. If there is a change in rowState, there is a re-rendering and then the Block components will be generated on the corresponding row that the user enters input into
  */

  return (
    <>
      <StyledBlock
        // readOnly
        maxLength="1"
        type="text"
        style={blockWidth}
        value={props.block}
      />
    </>
  );
}

const StyledBlock = styled.input`
  font-size: 2.8rem;
  text-transform: uppercase;
  text-align: center;
  border: 0.1rem solid grey;
  user-select: none;
  background-color: white;
  caret-color: transparent;
  cursor: pointer;
  transition: ease-in-out;
  animation: fadeInAnimation ease-in-out 1s;
  animation-iteration-count: 1;

  &:hover {
    background-color: rgb(220, 220, 220);
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
