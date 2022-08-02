import "./Header.css";

export default function Header(props) {
  return (
    <header id="header">
      <h1>{props.title}</h1>
    </header>
  );
}
