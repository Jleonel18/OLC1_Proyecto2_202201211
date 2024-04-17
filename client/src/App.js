import { useRef } from "react"
import './App.css';
import Editor from '@monaco-editor/react';
import { useState } from "react";

function App() {
  const editorRef = useRef(null);
  const consolaRef = useRef(null);
  const [errores, setErrores] = useState([]);

  function handleEditorDidMount(editor, id) {
    if (id === "editor") {
      editorRef.current = editor;
    } else if (id === "consola") {
      consolaRef.current = editor;
    }
  }


  function compilar() {
    var entrada = editorRef.current.getValue();
    fetch('http://localhost:4000/analizar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: entrada }),
    })
      .then(response => response.json())
      .then(data => {
        consolaRef.current.setValue(data.message);
      })
      .catch((error) => {
        alert("Error al interpretar el archivo.")
        console.error('Error:', error);
      });
  }

  function reporteErrores() {
    fetch('http://localhost:4000/reporteErrores', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        setErrores(data.message);
        console.log(data.message);
        //consolaRef.current.setValue(data.message);
      })
      .catch((error) => {
        alert("Error al interpretar el archivo.")
        console.error('Error:', error);
      });
  }

  const CargarArchivo = (event) => {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function (event) {
      var contents = event.target.result;
      editorRef.current.setValue(contents);
    };
    reader.readAsText(file);
  }


  return (
    <div className="App">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">CompiScript+</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" data-bs-toggle="modal" data-bs-target="#modalErrores" onClick={reporteErrores}>Reporte Errores</a>
              </li>
              <li class="nav-item">
                <a class="nav-link"  >Reporte Símbolos</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" >Reporte AST</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <br></br>
      <div class="container">
        <div class="row">
          <div class="col">
            <input type="file" id="file" class="form-control form-control-lg" onChange={CargarArchivo} />
          </div>
          <div class="col">
            <input type="button" value="compilar" id="btnCargar" class="btn btn-secondary form-control form-control-lg" onClick={compilar} />
          </div>
        </div>
      </div>
      <br></br>
      <div class='text-center style={{ height: "80%", width: "80%" }} '>
        <div class="container" >
          <div class="row">
            <div class="col">
              <h1>Entrada</h1>
              <Editor height="90vh" defaultLanguage="javascript" defaultValue="" theme="vs-dark" onMount={(editor) => handleEditorDidMount(editor, "editor")} />
            </div>
            <div class="col">
              <h1>Consola</h1>
              <Editor height="90vh" defaultLanguage="javascript" defaultValue="" theme="vs-dark" options={{ readOnly: true }} onMount={(editor) => handleEditorDidMount(editor, "consola")} />
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade" id="modalErrores" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Reporte Errores</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Fila</th>
                    <th scope="col">Columna</th>
                  </tr>
                </thead>
                <tbody>
                  {errores.map((error,i) => (
                    <tr>
                      <th scope="row">{(i+1)}</th>
                      <td>{error.tipoError}</td>
                      <td>{error.desc}</td>
                      <td>{error.fila}</td>
                      <td>{(error.col+1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;