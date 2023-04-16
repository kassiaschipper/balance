import GlobalStyle from "../assets/style/GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./authComponents/SignIn";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/sign-in" element={<SignIn></SignIn>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
