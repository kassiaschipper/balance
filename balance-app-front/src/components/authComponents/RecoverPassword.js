import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { changePassword } from "../../service/balance";

export default function RecoverPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function sendForm(e) {
    e.preventDefault();
    setLoading(true);

    const body = {
      email,
      password,
    };

    changePassword(body)
      .then((res) => {
        resetForm();
        navigate("/sign-in");
      })
      .catch((error) => {
        alert("Erro na solicitação, verifique os dados e tente novamente");
        setLoading(false);
      });
  }

  function resetForm() {
    setEmail("");
    setPassword("");
  }

  return (
    <Container>
      <Wrapper>
        <h2>Digite seu email para trocar de senha</h2>
        <form onSubmit={sendForm}>
          <FormContent>
            <input
              type="email"
              name="email"
              placeholder="e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button disabled={loading}>Enviar</button>
          </FormContent>
        </form>
        {/* <Link to="/sign-in">
          <button disabled={loading}>Enviar</button>
        </Link> */}
      </Wrapper>
    </Container>
  );
}
const Container = styled.div`
  background-color: #dedede;
  width: 30vw;
  height: 30vh;
  display: flex;
  justify-content: center;
  margin: 1rem auto;
  border-radius: 5px;

  button {
    display: flex;
    justify-content: center;
    margin: 0 auto;
  }
`;
const Wrapper = styled.div`
  h2 {
    color: black;
    text-align: center;
    margin-top: 1rem;
    font-size: 22px;
    margin-bottom: 1rem;
  }
`;
const FormContent = styled.div`
  text-align: center;

  input {
    width: 25vw;
    height: 5vh;
    margin-bottom: 10px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    font-weight: 500;
    font-family: "Amatic";
    font-size: 1.3rem;
    text-align: center;
  }
`;
