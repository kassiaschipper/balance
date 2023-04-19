import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/images/logo.png";
import { postSignIn } from "../../service/balance";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabledInput, setDisabledInput] = useState(false);
  const navigate = useNavigate();

  function sendForm(e) {
    e.preventDefault();
    setDisabledInput(true);

    const body = {
      email,
      password,
    };

    postSignIn(body)
      .then((res) => {
        resetForm();
        setDisabledInput(false);
        localStorage.setItem("token", JSON.stringify(res.data.access_token));
        navigate("/home");
      })
      .catch((res) => {
        if (res.message === "Network Error") {
          resetForm();
          alert(
            `Erro na solicitação, por favor tente mais tarde. (${res.message})`
          );
          setDisabledInput(false);
          return;
        }

        if (res.response.status === 401) {
          resetForm();
          alert(
            `E-mail ou senha incorretos, tente novamente. (${res.response.status} - ${res.response.data})`
          );
          setDisabledInput(false);
          return;
        }
        resetForm();
        alert(
          `Algo deu errado, tente novamente. (${res.response.status} - ${res.response.data})`
        );
        setDisabledInput(false);
      });
  }

  function resetForm() {
    setEmail("");
    setPassword("");
  }

  return (
    <>
      <Container>
        <LoginWrapper>
          <AuthBox>
            <img src={logo} alt="Sinal de $ representando o logo do app"></img>
            <h3>BALANCE APP</h3>
            <form onSubmit={sendForm}>
              <FormContent>
                <input
                  type="email"
                  name="email"
                  placeholder="e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={disabledInput}
                />

                <input
                  type="password"
                  name="password"
                  placeholder="senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={disabledInput}
                />
                <Button disabled={disabledInput}>Entrar</Button>
                <Link to="/sign-in/recovery">
                  <p> Esqueceu sua senha? Clique aqui para recuperar</p>
                </Link>
              </FormContent>
            </form>
          </AuthBox>
        </LoginWrapper>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginWrapper = styled.div`
  background-color: rgba(37, 239, 117, 0.85);
  width: 25vw;
  height: 80vh;
  border-radius: 15px;

  text-align: center;

  @media (max-width: 650px) {
    width: 80vw;
    height: 70vh;
  }
`;
const AuthBox = styled.div`
  img {
    width: 35%;
    height: 35%;
    margin-top: 10%;
  }

  h3 {
    margin-top: 5%;
    margin-bottom: 5%;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 15px;
    color: rgb(0, 0, 0, 0.8);
  }
`;

const FormContent = styled.div`
  width: 90%;
  height: 40vh;
  margin: auto;
  display: flex;
  align-items: center;
  flex-direction: column;

  @media (max-width: 650px) {
    height: 65vh;
  }

  p {
    color: black;;
    font-size: 0.8rem;
  }

  input {
    width: 20vw;
    height: 8vh;
    margin-bottom: 10px;
    border: none;
    border-radius: 15px;
    font-weight: 500;
    font-family: "Amatic";
    font-size: 1.3rem;
    text-align: center;
  }

  input:focus {
    outline-color: rgba(20, 166, 82);
  }

  input::placeholder {
    color: gray;
    font-weight: 700;
    font-family: "Amatic", sans-serif;
    font-size: 1.2rem;
  }

  @media (max-width: 650px) {
    width: 100%;
    align-items: center;

    input {
      height: 50px;
      width: 70vw;
      font-size: 1.1rem;
    }

    input::placeholder {
      font-size: 1.1rem;
    }
  }
`;

const Button = styled.button`
  background-color: rgb(0, 0, 0, 0.8);
  width: 70%;
  height: 15%;
  border: none;
  border-radius: 8px;
  text-align: center;
  font-family: "Amatic", sans-serif;
  color: white;
  letter-spacing: 1px;
  cursor: pointer;

  margin: 0 auto;
  margin-bottom: 0.8rem;
  @media (max-width: 650px) {
    height: 6%;
  }
`;

export { Button };
