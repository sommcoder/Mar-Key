# About:

Mar-Key is a small SPA to be used by the theatre employees at Paradise Theatre in Toronto, ON designed, built and deployed by Brian Davies.

# Technical Description:

We are using React and the styled-components libary as well as exclusively function components and Hooks to control State logic.
Hooks in use:

- useState
- useRef
- useReducer

# Use Case:

It is designed to alleviate the time spent and the guess-work involved with replacing an existing marquee display with a new one.

Mar-Key dynamically looks up the user's input as they are typing to check if their input will in fact fit on the Marquee's the user has selected and also if the input is even valid.

Once all of the input has been submitted Mar-Key opens a modal window to display to the user which letters they need to retrieve from inventory, how many of them and also which letters they can simply leave on the marquee(s) to limit the amount of time and energy spent moving up and down the ladder to change the marquee.
