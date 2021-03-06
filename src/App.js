import AppHeader from 'AppHeader';
import AppRoute from 'AppRoute';
import { AppMenu } from 'AppMenu';
import  { createGlobalStyle } from "styled-components";
import './App.css';
import Main from 'views/Main/Main';
import { useSelector } from 'react-redux';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #dee2e6;
  }
`;

function App() {

  const uid = useSelector((state) => {
    return state.authReducer.uid;
  });

  return (
    <>
    { uid ?
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
