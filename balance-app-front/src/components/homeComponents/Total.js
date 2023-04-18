import styled from "styled-components";
import { getTotal } from "../../service/balance";
import { useState } from "react";

export default function Total() {
  const [total, setTotal] = useState({});

  getTotal().then((res) =>{
    setTotal(res.data);
    console.log(total)
  });

  return (
    <Botao><button>somaaaaa</button></Botao>
  )
}

const Botao = styled.div`

`
