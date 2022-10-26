import styled from "styled-components";
import data from "../../data/blockData.json";
import SetCurrBtn from "../SetCurrBtn/SetCurrBtn";
import ResetBtn from "../ResetBtn/ResetBtn";
import ErrorMsg from "../ErrorMsg/ErrorMsg";

/*
 
textRowForm's logic handles user validation in the input elements (Text Rows)
 
*/

export default function TextRowForm(props) {
  console.log("TextRowForm props:", props);
  // global component variables:
  const marqName = props.marqName;
  const marqState = props.marqState;
  const marqWidth = props.marqWidth;
  let selected = false;
  let blockSizeTally = 0;
  let currInputArr = [];

  function validateEntry(ev) {
    selected = true;
    if (!selected) return;
    let key = ev.key;
    console.log("ev:", ev);
    console.log("key:", key);

    // handle enter submit:
    if (key === "Enter") {
      blockSizeTally = 0; // reset block tally to zero, form has submitted
      return true;
    }

    // tab traverses to the NEXT sibling (textRow input element)
    if (key === "Tab") {
      /*
       
      we need to figure out how to traverse to the next sibling.

      1) when on last sibling, tab moves back up to the first sibling
      2) if enter is pressed, form submits based on current input, SetCurrBtn component handles logic and settings state from there!
       
      */
      return true;
    }

    // prevents special buttons, however we may need to adjust this when we incorporate emoji's which of course take up multiple char indices
    if (key.length > 1 && key !== " ") return false;

    // the size of the block that corresponds with what the user just inputted:
    let currBlockInput = +data[key].size.split("rem").splice(0, 1);
    // on enter, get the data-rowId of the next sibling

    // prevent auto-scrolling of the space bar:
    if (key === " " || ev.target === document.body) ev.preventDefault();
    if (key === "Backspace" || key === "Delete") {
      // handle deletions:
      //reduce the size of the blockSizeTally by the currBlockInput
      blockSizeTally -= currBlockInput;

      // handle input
      currInputArr.pop(); // remove most recent letter
      ev.target.value = currInputArr.join(""); // convert string[] to string and assign
    }

    // handle too large of an input (don't allow user to add this input if it's block would be too big for this particular Marquee component)
    if (blockSizeTally + currBlockInput >= marqWidth) {
      console.log("input too big");
      // disabled = true; // prevent further user input until a deletion keyDown occurs
      // should add a red border and "rumble" animation if possible
      return false;
    } else {
      // if NOT larger than the marquee, add and assign to the blockSizeTally
      blockSizeTally += currBlockInput;
      // concat and assign the value of the input to the key being keyDown'ed
      currInputArr.push(key);
      console.log("currInputArr.join()", currInputArr.join(""));
      ev.target.value = currInputArr.join("");
    }

    return true;
  }

  return (
    // only id that is necessary. Needed to link the setCurrBtn to the form
    <StyledTextRowForm id="user-input-form">
      {props.keysArr.map((row) => (
        <StyledTextRow
          key={`${marqName}-${row}`}
          readOnly
          // onFocus={}
          selected={selected}
          data-rowid={props.rowId}
          type="text"
          onKeyDown={validateEntry}
        />
      ))}
      <SetCurrBtn
        key={`set-${marqName}`}
        form="user-input-form"
        marqName={marqName}
        marqState={marqState}
        marqWidth={marqWidth}
        rowState={props.rowState}
        setMarquee={props.setMarquee}
        setRow={props.setRow}
      />
      <ResetBtn
        key={`reset-${marqName}`}
        marqName={marqName}
        marqState={marqState}
        marqWidth={marqWidth}
        setMarquee={props.setMarquee}
        initRowState={props.initRowState}
        setRow={props.setRow}
      />
      {marqState[marqName].isError === true ? <ErrorMsg /> : ""}
    </StyledTextRowForm>
  );
}

////////////////////////////////////////////////

const StyledTextRowForm = styled.div`
  margin-bottom: 0.5rem;
`;

const StyledTextRow = styled.input`
  height: 3rem;
  border-radius: 7px;
  align-items: center;
  display: block;
  text-align: center;
  width: 350px;
  margin: 0px auto;
  text-transform: uppercase;
  font-size: 1.6rem;
  font-weight: bold;
  cursor: pointer;
  border-left: 2px solid rgb(118, 118, 118); // workaround for border-left being too dark
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
    0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07),
    0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07);

  &:hover {
    background-color: rgba(176, 224, 230, 0.25);
  }
  &:focus {
    outline: none;
    background-color: rgba(176, 224, 230, 0.75);
  }
`;
