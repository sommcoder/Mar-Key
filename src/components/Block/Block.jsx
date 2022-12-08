import styled, { keyframes } from "styled-components";

export default function Block({ block, style, delay }) {
  const blockWidth = style + "rem";

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
      transform: RotateX(10deg);
      background-color: #f9ea93;
    }
    50% {
      transform: RotateX(90deg);
    }
    100% {
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
  background-color: white
  caret-color: transparent;
  animation: 0.5s linear ${(props) => (props.delay * 90).toString() + "ms"} 1
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
