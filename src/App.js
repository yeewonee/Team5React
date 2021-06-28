import AppHeader from 'AppHeader';
import AppRoute from 'AppRoute';
import { AppMenu } from 'AppMenu';
import  { createGlobalStyle } from "styled-components";
import './App.css';
import Main from 'views/Main/Main';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #dee2e6;
  }
`;

const test = 1;

function App() {
  return (
    <>
    { test === 0 ?
      <>
        <AppHeader/>
        <AppMenu/>
        <GlobalStyle></GlobalStyle>
        <AppRoute />
      </>
    :
      <>
        <AppRoute />
      </>
    }
    </>
  );
}



export default App;
