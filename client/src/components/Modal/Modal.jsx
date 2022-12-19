import styled, { keyframes } from "styled-components";
import ModalTable from "../ModalTable/ModalTable";
import ModalCloseBtn from "../ModalCloseBtn/ModalCloseBtn";
import ModalHeader from "../ModalHeader/ModalHeader";

export default function ModalWindow({ modalState, toggleModal, appState }) {
  console.log("modalWindow Component modalState:", modalState);
  const modalWindowWidth = 500;
  // // THIS IS WHAT WE !NEED!
  // const sortedTallyObj = Object.keys(stockSummaryState)
  //   .sort()
  //   .reduce((acc, key) => {
  //     acc[key] = stockSummaryState[key];
  //     return acc;
  //   }, {});
  // console.log("sortedTallyObj:", sortedTallyObj);

  /*
 
We need to manage the FULL tally of ALL of the marquees in teh App component in State


user needs to see: 

1) what they need to ADD from inventory
2) what they can LEAVE on the current Marquee board

 
*/

  return (
    <StyledOverlay modalState={modalState}>
      <StyledModalWindow modalWindowWidth={modalWindowWidth}>
        <ModalHeader />
        <ModalTable modalWindowWidth={modalWindowWidth} appState={appState} />
        <ModalCloseBtn toggleModal={toggleModal} />
      </StyledModalWindow>
    </StyledOverlay>
  );
}

const slideDown = keyframes`
  0% {
  transform: translateY(-100%);
  }
  100% {
  transform: translateY(0%)
  }
`;

const StyledOverlay = styled.div`
  display: ${(props) => (props.modalState ? "block" : "none")};
  background-color: rgba(176, 224, 230, 0.4);
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 12;
  overflow-y: hidden;
  animation-name: ${slideDown};
  transition: transform 0.3s ease-in-out;

  &:hover {
    cursor: pointer;
  }
`;

const StyledModalWindow = styled.div`
  display: block;
  opacity: 1;
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${(props) => props.modalWindowWidth + "px"};
  height: 400px;
  background-color: rgba(255, 255, 255, 1);
  transform: translate(-50%, -50%);
  border-radius: 10px;
  z-index: 15;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08), 0 2px 2px rgba(0, 0, 0, 0.12),
    0 4px 4px rgba(0, 0, 0, 0.16), 0 8px 8px rgba(0, 0, 0, 0.2);

  overflow-y: hidden;
`;
