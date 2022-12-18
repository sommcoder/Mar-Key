import styled from "styled-components";
import { Button } from "../../../styles/Button.styled";

export default function ModalCloseBtn({ toggleModal }) {
  return (
    <StyledModalCloseBtn
      onClick={() => toggleModal(false)}
      title="closes popup"
    >
      Close
    </StyledModalCloseBtn>
  );
}
const StyledModalCloseBtn = styled(Button)`
  margin: 2rem auto 0rem auto;
  display: block;
  position: relative;
  bottom: 0%;
  /* left: 50%; */
  transform: translateX(-50%);
`;
