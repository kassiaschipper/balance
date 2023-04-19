import styled from "styled-components";
import { getTotal } from "../../service/balance";
import { useEffect, useState } from "react";

export default function Total() {
  const [total, setTotal] = useState([]);

  useEffect(() => {
    console.log(total);
  }, [total]);

  function balanceTotal() {
    getTotal()
      .then((res) => {
        setTotal(res.data);
      })
      .catch((error) =>{});
  }
  
  return (
    <Wrapper>
      <button onClick={()=> balanceTotal()}>Somar</button>     
      <Table>
        <thead>
          <tr>
            <th>CPF</th>
            <th>Soma ($)</th>
          </tr>
        </thead>
        <tbody>
          {total.length > 0 && total.map((item, key) => (
            <tr key={key}>
              <td>{item.cpf}</td>
               <td>{item.sum}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Wrapper>
  );
}

const Wrapper = styled.div``;
const Table = styled.table`
  border-collapse: collapse;
  width: 100%;

  th,
  td {
    border: 1px solid black;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: rgba(37, 239, 117, 0.5);
  }

  tr {
    background-color:lightgrey ;
  }
`;