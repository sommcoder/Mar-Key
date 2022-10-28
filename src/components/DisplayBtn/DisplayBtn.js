import styled from 'styled-components';

export default function DisplayBtn(props) {
  function toggleDisplay(ev) {
    // console.log("ev id:", ev.target.dataset.id);
    let marqueeToUpdate = ev.target.dataset.id;
    const updatedMarqueeState = {};

    // toggle Marquee visibility:
    if (props.marqueeState[marqueeToUpdate].isVisible === true)
      updatedMarqueeState[marqueeToUpdate] = { isVisible: false };
    else updatedMarqueeState[marqueeToUpdate] = { isVisible: true };

    props.setMarquee(currState => ({
      ...currState,
      ...updatedMarqueeState,
    }));
  }

  return (
    <StyledDisplayBtn onClick={toggleDisplay} data-id={props.name}>
      {`${props.name} Marquee`}
    </StyledDisplayBtn>
  );
}

////////////////////////////////////////////////
const StyledDisplayBtn = styled.button`
  display: block;
  background-color: powderblue;
  font-weight: 600;
  font-size: 1.5rem;
  border-radius: 2px;
  margin: 0 auto;
  border: none;
  height: 3.5rem;
  width: 30rem;
  padding: 0.5rem;
  text-align: center;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
    0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07),
    0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07);
  animation: fadeInAnimation ease-in-out 1s;
  animation-iteration-count: 1;

  @keyframes fadeInAnimation {
    start {
      opacity: 0;
    }
    end {
      opacity: 1;
    }
  }

  &:hover {
    background-color: white;
    background: none;
    color: black;
    border: 0.2rem solid powderblue;
    transition: ease-in-out;
    cursor: pointer;
  }
`;
