import styled from 'styled-components';
import data from '../../data/blockData.json';
import ErrorMsg from '../ErrorMsg/ErrorMsg';
import SetCurrBtn from '../SetCurrBtn/SetCurrBtn';
import ResetBtn from '../ResetBtn/ResetBtn';
import CompareBtn from '../CompareBtn/CompareBtn';
import { useRef } from 'react';

export default function TextRowForm({
  appState,
  dispAppState,
  dispatchRowState,
  keysArr,
  marqName,
  marqSize,
}) {
  /*
  #component description:
  - Live input validation
  - Checks Data.json for valid entries
  - applies error animation
  */

  const inputRefsArr = useRef([]);
  const addToRefsArr = el => {
    if (el && !inputRefsArr.current.includes(el)) inputRefsArr.current.push(el);
  };

  const inputValidationObj = {
    row0: { values: [], sizes: 0 },
    row1: { values: [], sizes: 0 },
    row2: { values: [], sizes: 0 },
  };

  function validateEntry(ev) {
    let key = ev.key;
    let row = ev.target.dataset.rowid;
    if (key === ' ') ev.preventDefault();
    if (key === 'Enter') return;
    if (key === 'Backspace' || key === 'Delete') {
      if (inputValidationObj[row].sizes === 0) {
        return;
      }
      // update validation Object:
      inputValidationObj[row].sizes -=
        +data[inputValidationObj[row].values.at(-1)].size;
      inputValidationObj[row].values.pop();
      ev.target.value = inputValidationObj[row].values.join('');
      return;
    }
    if (!data[key]) return;
    // 0.1 = block border size!
    let currBlockSize = +data[key].size + 0.1;

    // Max capacity check:
    if (inputValidationObj[row].sizes + currBlockSize > marqSize) {
      inputRefsArr.current[keysArr.indexOf(row)].animate(
        [
          {
            transform: 'translateX(-0.33%)',
            borderColor: 'rgb(255, 0, 0)',
          },
          {
            transform: 'translateX(0.33%)',
            borderColor: 'rgb(255, 0, 0)',
          },
        ],
        { duration: 150, iterations: 3 }
      );
      return;
    }
    // append validation Object:
    inputValidationObj[row].sizes += currBlockSize;
    inputValidationObj[row].values.push(key);
    ev.target.value = inputValidationObj[row].values.join('');
    return;
  }
  return (
    <>
      <form
        id="user-input-form"
        css={`
          margin-bottom: 0.5rem;
        `}
      >
        {keysArr.map(row => (
          <StyledTextRow
            key={`${marqName}-${row}`}
            readOnly
            ref={addToRefsArr}
            data-rowid={row}
            type="text"
            name={row}
            onKeyDown={validateEntry}
          />
        ))}
      </form>
      <SetCurrBtn keysArr={keysArr} dispatchRowState={dispatchRowState} />
      <CompareBtn
        appState={appState}
        dispAppState={dispAppState}
        dispatchRowState={dispatchRowState}
        marqName={marqName}
      />
      <ResetBtn
        appState={appState}
        dispAppState={dispAppState}
        marqName={marqName}
      />
      {appState[marqName].isError === true ? <ErrorMsg /> : ''}
    </>
  );
}

const StyledTextRow = styled.input`
  height: 3rem;
  border-radius: 7px;
  align-items: center;
  display: block;
  text-align: center;
  width: 350px;
  margin: 0 auto;
  text-transform: uppercase;
  font-size: 1.6rem;
  font-weight: bold;
  z-index: 1;
  cursor: pointer;
  border: 2px solid rgb(118, 118, 118);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
    0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07),
    0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07);

  &:hover {
    background-color: rgba(176, 224, 230, 0.25);
  }
  &:focus {
    outline: none;
    background-color: rgba(176, 224, 230, 0.75);
  }
`;
