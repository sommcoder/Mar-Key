import React from "react";
import NavBar from "./components/NavBar/NavBar.jsx";
import Marquee from "./components/Marquee/Marquee.jsx";
import Keyboard from "./components/Keyboard/Keyboard.jsx";
import Modal from "./components/Modal/Modal.jsx";
/////////////////////////////////////////
import { useState, useReducer } from "react";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyles from "./GlobalStyles";
/////////////////////////////////////////

export default function App() {
  const appTitle = "Mar-Key";

  // MODAL POPUP STATE:
  const [modalState, toggleModal] = useState(true);

  // [{ ltr: quantity }]
  const InitAppState = {
    East: {}, // { ltr: #, ltr: #, etc }
    West: {},
    South: {},
  };
  // inside the modal component we will also provide an ALL day count inclusive of ALL of the marquee's that had inputs set and new inputs compared

  const reducer = (state, action) => {
    if (!action.payload) return state;
    console.log("appREDUCER: action.payload:", action.payload);

    let marqName = Object.keys(action.payload).join();

    console.log("marqName:", marqName);

    /*
 
something fucky is happening here, probably just a silly naming conflict but the marquees arent rendering properly likely due to the fact that we aren't populating the state objects correctly!!!
 
*/

    switch (action.type) {
      case "set": {
        return { ...state, ...action.payload };
      }
      // case "compare": {
      //   return { ...state, ...action.payload.count };
      // }
      default:
        return state;
    }

    /*
    
   need to pass newState up to AppState with a dispatch, The App reducer function will create an all-day tally of the letters and their quantity which toggle ModalState and gets drilled down to the ModalTable where the ModalRow components get rendered
    
   */
  };

  const [appState, dispAppState] = useReducer(reducer, InitAppState);

  const marqSizes = {
    East: 42,
    West: 42,
    South: 84,
  };

  // look into creating dark-mode functionality here
  const theme = {
    colors: {
      button: "powderblue",
    },
    dark: {},
    light: {},
  };

  const marKeysArr = Object.keys(appState);
  console.log("marKeysArr:", marKeysArr);
  console.log("APP - appState:", appState);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <StyledAppContainer>
        {toggleModal ? (
          <Modal
            modalState={modalState}
            toggleModal={toggleModal}
            appState={appState}
          />
        ) : (
          ""
        )}
        <NavBar title={appTitle} />
        {marKeysArr.map((el) => (
          <StyledMarqueeContainer key={el}>
            <Marquee
              key={`marq-${el}`}
              appState={appState}
              dispAppState={dispAppState}
              marqName={el}
              marqSize={marqSizes[el]}
            />
          </StyledMarqueeContainer>
        ))}
        <Keyboard />
      </StyledAppContainer>
    </ThemeProvider>
  );
}

const StyledAppContainer = styled.div`
  margin: 0 auto;
  align-content: center;
  align-items: center;
  max-width: 100%;
  /* overflow-x: hidden; */
`;

const StyledMarqueeContainer = styled.div`
  /* max-width: 700px; */
  width: 100%;
  margin: 0 auto 2rem auto;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0);
  // transparent
`;
