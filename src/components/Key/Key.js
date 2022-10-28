import styled from 'styled-components';

export default function Key(props) {
  const ltr = props.letter;

  if (ltr.length <= 1) {
    return <StyledKey value={ltr}>{ltr}</StyledKey>;
  } else return <StyledKeySpecial value={ltr}>{ltr}</StyledKeySpecial>;
}

const StyledKey = styled.button`
  text-transform: uppercase;
  border: none;
  font-size: 1.6rem;
  font-weight: bold;
  margin-right: 3px;
  margin-left: 3px;
  width: 5rem;
  height: 7rem;
  background-color: rgb(194, 197, 197);
  color: black;
  text-align: center;
  border-radius: 15%;

  &:hover {
    background-color: rgb(172, 172, 172);
  }
`;

const StyledKeySpecial = styled(StyledKey)`
  width: 8rem;
  &:hover {
    background-color: rgb(172, 172, 172);
  }
`;
