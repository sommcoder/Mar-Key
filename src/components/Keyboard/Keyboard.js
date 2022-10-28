import Key from "../Key/Key";
import styled from "styled-components";

export default function Keyboard(props) {
  // the letters to be rendered:
  const letterSet = props.letterSet;

  return (
    <StyledKeyboardContainer>
      {letterSet.map((obj) => (
        <StyledKeyboardRow key={obj.rowNum}>
          {obj.letters.map((ltr) => (
            <Key letter={ltr} key={`${obj.rowNum}-${ltr}`} />
          ))}
        </StyledKeyboardRow>
      ))}
    </StyledKeyboardContainer>
  );
}

const StyledKeyboardContainer = styled.div`
  margin: 0 auto;
  display: block;
  /* max-width: 500px; */
  padding-top: 5rem;
  width: 100%;
  -webkit-box-shadow: inset 0px 0px 5px #c1c1c1;
  -moz-box-shadow: inset 0px 0px 5px #c1c1c1;
  box-shadow: inset 0px 0px 5px #c1c1c1;
  overflow: hidden;
`;

const StyledKeyboardRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
`;

// how can be conditionally add the SPECIAL KEY components to the THIRD keyboard row ONLY and also specify the respective side of the third row each component should be on!

// row-3-v

// once done ^^^ add Synthetic Event: onClick="" this will
