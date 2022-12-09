import styled from "styled-components";
import ModalRow from "../ModalRow/ModalRow";

export default function ModalTable({ appState, modalWindowWidth }) {
  console.log("appState:", appState);

  /*
 
we will take the App state as a PROP and convert it into an ARRAY and use that array to MAP the ModalRow Components
 
*/

  return (
    <StyledModalTable modalWindowWidth={modalWindowWidth}>
      <ModalRow />
      <ModalRow />
      <ModalRow />
      <ModalRow />
    </StyledModalTable>
  );
}
const StyledModalTable = styled.div`
  display: grid;
  margin: 0 auto;
  padding-top: 2rem;
  position: relative;
  grid-template-columns: 2;
  max-width: ${(props) => props.modalWindowWidth - 50 + "px"};
`;
