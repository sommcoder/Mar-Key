import Key from "../Key/Key";
import styled from "styled-components";

export default function Keyboard(props) {
  // KEYBOARD SETUP:
  const letterSet = [
    {
      rowNum: "row0",
      letters: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    },
    {
      rowNum: "row1",
      letters: ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    },
    {
      rowNum: "row2",
      letters: ["ENTER", "z", "x", "c", "v", "b", "n", "m", "<=="],
    },
    {
      rowNum: "row3",
      letters: [
        "am",
        "pm",
        "presents",
        "www",
        "live",
        "feat",
        "free",
        "sold out",
      ],
    },
  ];

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
