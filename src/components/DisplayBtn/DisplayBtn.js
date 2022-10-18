import styled from "styled-components";

export default function DisplayBtn(props) {
  function toggleDisplay(ev) {
    // console.log("ev id:", ev.target.dataset.id);
    let marqueeToUpdate = ev.target.dataset.id;
    const updatedMarqueeState = {};

    // toggle Marquee visibility:
    if (props.marqueeState[marqueeToUpdate].isVisible === true)
      updatedMarqueeState[marqueeToUpdate] = { isVisible: false };
    else updatedMarqueeState[marqueeToUpdate] = { isVisible: true };

    props.setMarquee((currState) => ({
      ...currState,
      ...updatedMarqueeState,
    }));
  }

  return (
    <StyledDisplayBtn onClick={toggleDisplay} data-id={props.name}>
      {props.name}
    </StyledDisplayBtn>
  );
}

// styled-component:
const StyledDisplayBtn = styled.button`
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
