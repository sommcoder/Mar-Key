import styled from "styled-components";

export default function ResetBtn(props) {
  function resetRows(ev) {
    ev.preventDefault();
    // textRow Loop: assign each value to empty string
    for (let i = 0; i < 3; i++) ev.target.form[i].value = "";
    // rowStateObj:
    // reset the rowState to init
    props.setRow((rowValuesObj) => ({
      ...rowValuesObj,
      ...props.rowInitState,
    }));

    /// marqStateObj:
    let updatedMarqueeStateObj = props.marqState;
    updatedMarqueeStateObj[props.marqName].isSet = false;
    // reset the entire MarStateObj to init
    props.toggleMarquee((marqueeState) => ({
      ...marqueeState,
      ...updatedMarqueeStateObj,
    }));

    // we also want to reset the textRow components as well!
    // we may need to use useRef for this!
  }
  return <StyledResetBtn onClick={resetRows}>reset</StyledResetBtn>;
}

const StyledResetBtn = styled.button`
  background-color: "powderblue";
  font-weight: 600;
  border-radius: "2.5px";
  font-size: 1.5rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  margin-right: 0.25rem;
  border: none;
  height: 3.5rem;
  width: 10rem;
  padding: 0.5rem;
  text-align: center;
  animation: fadeInAnimation ease-in-out 1s;
  animation-iteration-count: 1;

  &:active {
    background-color: "powderblue";
    color: white;
  }
  &:hover {
    background-color: white;
    background: none;
    color: "powderblue";
    border: 0.2rem solid "powderblue";
    transition: ease-in-out;
    cursor: pointer;
  }
`;

/*
 
want to make it so that we can SAVE state independently of the textRow.

- either I create a seperate SAVE button to control this
- or 


We need to have a CURRENT MARQUEE view 
and a view of what we want to change that particular marquee to



How do we incorporate the BlockData? this would have to be a fetch call and perhaps a cache based on the blocks (and their stats) that have been ALREADY fetched during a single session using the browsers storage API
 
*/
