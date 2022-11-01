import styled from 'styled-components';

export default function CompareBtn(props) {
  function compareMarquee(ev) {
    ev.preventDefault();

    console.log('ev setCurrMarquee:', ev);
    let targetFormEl = ev.target.form; // form Element

    // FORM ROW INPUT LOOP:
    for (let i = 0; i < props.keysArr.length; i++) {
      let targetValueStr = targetFormEl[i].value.trim(); // user input string
      let rowTargetId = targetFormEl[i].dataset.rowid;

      // we will need to separate the Marquee update function from the SETMARQUEE function because compare will ALSO need to update the Marquee state. But obviously with additional functionality.

      console.log('targetValueStr:', targetValueStr);

      if (targetValueStr) {
        let targetValueArr = [...targetValueStr];

        console.log('rowTargetid:', rowTargetId);
        console.log('targetValueArr pre loop:', targetValueArr);
      }
    }
    console.log('inputTrackerObj:', inputTrackerObj);
    // now update stock to determine the REMAINING stock.
  }
  return (
    <StyledCompareBtn
      form="user-input-form"
      type="submit"
      onClick={compareMarquee}
    >
      Compare
      <StyledTooltipBox>
        Compares to the set marquee<StyledArrow></StyledArrow>
      </StyledTooltipBox>
    </StyledCompareBtn>
  );
}
const StyledTooltipBox = styled.span`
  display: none;
  border-radius: 4px;
  position: absolute;
  color: white;
  background-color: rgba(44, 43, 43, 1);
  bottom: 40px;
  left: 50%;
  width: 120px;
  padding: 8px 8px;
  margin-left: -60px; // use half the width 120/2
`;

const StyledArrow = styled.span`
  content: '';
  position: absolute;
  left: 50%;

  /* vertically center */
  top: 120%;
  transform: translateY(-50%);
  border: 10px solid rgba(44, 43, 43, 1);
  border-color: rgba(44, 43, 43, 1) transparent transparent transparent;
  display: none;
`;

const StyledCompareBtn = styled.button`
  position: relative; // relative for tooltip popup
  color: black;
  background-color: powderblue;
  font-weight: 600;
  border-radius: 2.5px;
  font-size: 1.5rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  margin-right: 0.25rem;
  border: none;
  height: 3.5rem;
  width: 10rem;
  padding: 0.5rem;
  text-align: center;
  &:hover {
    cursor: pointer;
  }

  &:hover ${StyledTooltipBox} {
    display: block;
    transition-delay: 1s;
  }

  &:hover ${StyledArrow} {
    display: block;
    transition-delay: 1s;
  }

  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
    0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07),
    0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07);
`;
