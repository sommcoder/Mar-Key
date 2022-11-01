import styled from "styled-components";

export default function ModalWindow({ isOpen, setIsOpen, stockSummaryState }) {
  if (!isOpen) return null;

  // THIS IS WHAT WE !NEED!
  const sortedTallyObj = Object.keys(stockSummaryState)
    .sort()
    .reduce((acc, key) => {
      acc[key] = stockSummaryState[key];

      return acc;
    }, {});

  console.log("sortedTallyObj:", sortedTallyObj);

  /*
 
now we got to take the PREVIOUS marquee's values and compare them.


user needs to see: 

1) what they need to ADD from inventory
2) what they can LEAVE on the current Marquee board

 
*/

  return (
    <StyledOverlay>
      <StyledModalWindow>
        <p>Here are the marquee tiles you need:</p>

        <button onClick={setIsOpen}>Close</button>
      </StyledModalWindow>
    </StyledOverlay>
  );
}
const StyledOverlay = styled.div`
  background-color: rgba(176, 224, 230, 0.25);
  opacity: 0.8;
  z-index: 7;
`;

const StyledModalWindow = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateY(-50%);
  border-radius: 10px;
  z-index: 8;
`;
