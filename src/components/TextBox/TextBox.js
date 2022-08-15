export default function TextBox() {
  function handleSubmit(ev) {
    ev.preventDefault();
    console.log(ev.target);
    // how is the ev.target data constructed?
  }

  return (
    <form onSubmit={handleSubmit} className="text-box-form">
      <input className="text-box" type="text" />
      <input className="text-box" type="text" />
      <input className="text-box" type="text" />
    </form>
  );
}

/*
take the user's input and PLOT the marquee rows in sequence.





increase/decrease the size of the blocks based on WHICH letters are entered



*/
