import GlobalStyle from "../assets/style/GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./authComponents/SignIn";
import Home from "./homeComponents/Home";
import PrivatePage from "../PrivatePage.js";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/sign-in" element={<SignIn></SignIn>} />
          <Route path="/home" element={<PrivatePage><Home></Home></PrivatePage>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}
