import styled from "styled-components";

// reference this object for variables:
const root = {
  btn_color: "powderblue",
  btn_radius: "2.5px",
  btn_font_size: "1.7rem",
  btn_font_weight: 600,
  block_remove: "red",
  block_add: "lightgreen",
};

const Header = styled.h1`
  font-size: 4rem;
  background-color: white;
  position: sticky;
  top: 0px;
  margin: 1rem auto 2rem auto;
  text-align: center;
  padding-bottom: 3rem;
  border-bottom: 0.1rem solid lightgrey;
  width: 100%;
  height: 30px;
  z-index: 2;
`;

const DisplayBtn = styled.button``;

const Marquee = styled.div`
  padding-top: 2rem;
  margin: 0 auto 2rem auto;
  width: 100%;
  max-width: 1000px;
  align-items: center;
  justify-content: center;
  animation: fadeInAnimation ease-in-out 1s;
  animation-iteration-count: 1;
  cursor: pointer;
`;

const Block = styled.input``;

const TextRowForm = styled.form``;

const SetCurrBtn = styled.button``;

const ResetBtn = styled.button``;

const ErrorMsg = styled.div``;

const Keyboard = styled.div``;

const Key = styled.button``;

export {
  Header,
  DisplayBtn,
  Marquee,
  TextRowForm,
  Block,
  SetCurrBtn,
  ResetBtn,
  ErrorMsg,
  Key,
  Keyboard,
};
