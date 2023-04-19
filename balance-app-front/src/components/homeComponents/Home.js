import styled from "styled-components";
import { useEffect, useState } from "react";
import { postFile } from "../../service/balance";
import Total from "./Total";

export default function Home() {
  const [file, setFile] = useState();
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);

  function sendForm(e) {
    e.preventDefault();

    const fileReader = new FileReader();
    const array = [];

 
    const csvFileToArray = (string) => {
      const lines = string.split("\n");
      if (lines.length > 0) {
        for (const element of lines) {
          const contents = element.split(",");
          if (contents.length === 3) {
            const date = new Date(contents[0]);
            if (!isNaN(date.getTime())) {
              const document = contents[1];
              const balance = parseInt(contents[2]);
              //TODO: Verificar se é possível usar o mesmo objeto para o array e para o postFile
              array.push({ date: contents[0], document, balance });
                                    
              postFile({
                date: date,
                cpf: document,
                balance,
              })
                .then((res) => {
                  setRefresh(true)
                })
                .catch((res) => {
                  if (res.message === `Request failed with status code 401`)
                    alert("Você precisa de autorização");
                });
                
            }
          }
        }
      }
      setData(array);
    };

    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
      };

      fileReader.readAsText(file);
    }
  }

  const headerKeys = Object.keys(Object.assign({}, ...data));

  return (
    <>
      <FormWrapper>
        <h1>Selecione o arquivo .csv </h1>
        <form onSubmit={sendForm}>
          <input
            type={"file"}
            accept={".csv"}
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button>Upload</button>
        </form>
      
      </FormWrapper>
      <br />
      <TableWrapper>
        <table>
          <thead>
            <tr>
              {headerKeys.map((key, value) => (
                <th> {key}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                {Object.values(item).map((value) => (
                  <td>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrapper>
      <WrapperTotal><Total /></WrapperTotal> 
    </>
  );
}

const FormWrapper = styled.div`
  background-color: rgba(37, 239, 117, 0.85);
  width: 40vw;
  height: 20vh;
  border-radius: 20px;

  text-align: center;

  margin: 1rem auto 0 auto;

  h1 {
    font-family: "Courier New", Courier, monospace;
    color: black;
    padding-top: 0.8rem;
    padding-bottom: 0.5rem;
  }

  input::-webkit-file-upload-button {
    border: none;
    border: 1px solid rgb(0, 0, 0, 0.8);
    border-radius: 5px;
    font-size: 1rem;
    background-color: white;
  }

  button {
    border: none;
    border: 1px solid rgb(0, 0, 0, 0.8);
    border-radius: 5px;
    font-size: 1rem;
    background-color: white;
    margin-left: 1rem;
  }

  @media (max-width: 650px) {
    width: 90vw;
    height: 18vh;
    display: flex;
    flex-direction: column;
    align-content: space-between;

    button {
      margin-left: 2rem;
    }
  }
`;

const TableWrapper = styled.div`
  //background-color: white;
  width: 90vw;
  height: auto;
  margin: 0 auto;
  border-radius: 5px;

  .title {
    background-color: red;
  }

  table {
    color: darkblue;
    font-size: 20px;

    border: 2px solid black;

    margin: 0 auto;
  }
  tr {
    background-color: lightgray;
    border: 2px solid white;
  }
  td {
    background-color: lightgray;
    border: 2px solid white;
    text-align: center;
  }

  th {
    border: 2px solid white;
    width: 10rem;
  }
`;
const WrapperTotal = styled.div`
  width: 40vw;
  margin: 1rem auto 0 auto;

`