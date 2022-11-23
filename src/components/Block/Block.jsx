import styled, { keyframes } from "styled-components";

export default function Block({ block, style, delay }) {
  const blockWidth = style + "rem";
  console.log("delay:", delay);

  console.log("delay function:", (delay) => (delay * 100).toString() + "ms");

  return (
    <>
      <StyledBlock
        delay={delay}
        readOnly
        maxLength="1"
        type="text"
        blockWidth={blockWidth}
        value={block}
      />
    </>
  );
}

const populateMarquee = keyframes`
    0% {
      opacity: 0;
      transform: RotateX(0deg);
    }
    50% {
      opacity: 0.5;
      transform: RotateX(90deg);
    }
    100% {
      opacity: 1;
      transform: RotateX(0deg);
    }
`;

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
  animation: 1s ease-in ${(delay) => (delay * 100).toString() + "ms"} 1
    ${populateMarquee};

  // prevents border layering:
  &:not(:last-of-type) {
    border-right: 0;
  }
  cursor: default;

  &:focus {
    outline: none;
  }
`;
