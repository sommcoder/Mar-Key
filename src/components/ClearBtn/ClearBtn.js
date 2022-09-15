export default function ClearBtn(props) {
  function clearRows(ev) {
    console.log(ev.target);
    console.log(props.setRow);

    const initState = {
      row0: [],
      row1: [],
      row2: [],
    };

    props.setRow((rowValuesObj) => ({
      ...rowValuesObj,
      ...initState,
    }));

    // we also want to clear the textRow components as well!
    // we may need to use useRef for this!
  }
  return (
    <button onClick={clearRows} className="text-box-form-clear-btn">
      clear text
    </button>
  );
}

/*
 
want to make it so that we can SAVE state independently of the textRow.

- either I create a seperate SAVE button to control this
- or 


We need to have a CURRENT MARQUEE view 
and a view of what we want to change that particular marquee to



How do we incorporate the BlockData? this would have to be a fetch call and perhaps a cache based on the blocks (and their stats) that have been ALREADY fetched during a single session using the browsers storage API
 
*/
