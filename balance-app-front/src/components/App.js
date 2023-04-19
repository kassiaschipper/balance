import GlobalStyle from "../assets/style/GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./authComponents/SignIn";
import Home from "./homeComponents/Home";
import PrivatePage from "../PrivatePage.js";
import NotFoundPage from "./NotFoundPage";
import RecoverPassword from "./authComponents/RecoverPassword";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/sign-in" element={<SignIn></SignIn>} />
          <Route path="/home" element={<PrivatePage><Home></Home></PrivatePage>}/>
          <Route path="*" element={<NotFoundPage></NotFoundPage>}/>
          <Route path="/sign-in/recovery" element={<RecoverPassword></RecoverPassword>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}
