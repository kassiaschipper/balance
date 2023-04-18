import styled from "styled-components";
import { useState } from "react";
import { Button } from "../authComponents/SignIn";
import { postFile } from "../../service/balance";

export default function Home() {
  const [file, setFile] = useState();
  const [data, setData] = useState([]);
  const [disabledInput, setDisabledInput] = useState(false);

  function sendForm(e) {
    e.preventDefault();
    setDisabledInput(true);

    const fileReader = new FileReader();

    const csvFileToArray = (string) => {
      
       const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
      const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

      const array = csvRows.map((i) => {
        const values = i.split(",");
        const obj = csvHeader.reduce((object, header, index) => {
          object[header] = values[index];
          return object;
        }, {});
        return obj;
      });
     
      setData(array);
      
      const body = {
        data
      };
      console.log(body)

      postFile(body)
        .then((res) => {
          //resetForm();
          alert("dados enviados");
          console.log(body);
        })
        .catch(res =>{
          //resetForm();
          if(res.message === `Request failed with status code 401`)
          alert("Você precisa de autorização");
        }) 
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

  // function resetForm() {
  //   setData("");  
  // }
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
