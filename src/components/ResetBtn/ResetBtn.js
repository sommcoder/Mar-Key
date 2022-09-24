export default function ResetBtn(props) {
  function resetRows(ev) {
    ev.preventDefault();
    console.log(ev.target);
    console.log(props.setRow);

    // clear the textRow Components:
    for (let i = 0; i < 3; i++) {
      let targetFormEl = ev.target.form;
      targetFormEl[i].value = "";
    }

    // reset the rowState to init
    props.setRow((rowValuesObj) => ({
      ...rowValuesObj,
      ...props.rowInitState,
    }));

    // we also want to reset the textRow components as well!
    // we may need to use useRef for this!
  }
  return (
    <button onClick={resetRows} className="text-box-form-reset-btn">
      reset
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
