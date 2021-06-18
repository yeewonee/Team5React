import AppHeader from 'AppHeader';
import { AppMenu } from 'AppMenu';
import AppRoute from 'AppRoute';
import  { createGlobalStyle } from "styled-components";
import './App.css';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #dee2e6;
  }
`;

function App() {
  return (
    <>
      <AppHeader/>
      <AppMenu/>
      <GlobalStyle></GlobalStyle>
      <AppRoute />
    </>
  );
}



export default App;
