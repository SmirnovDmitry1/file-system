import { useState } from 'react';
import './App.css';

function App() {
  const [ textFile, setTextFile ] = useState('')
  const [ globalFileHandle, setGlobalFileHandle] = useState([])

  const openFile = async () => {
    let [fileHandle] = await window.showOpenFilePicker()
    let fileData = await fileHandle.getFile()
    let text = await fileData.text();
    setGlobalFileHandle(fileHandle)
    setTextFile(text)
  }

  const saveFile = async () => {
    let stream = await globalFileHandle.createWritable()
    await stream.write(document.getElementById('textarea').innerText)
    await stream.close()
    setTextFile('')
  }

  const saveAs = async () => {
    let fileHandle = await window.showSaveFilePicker()
    let stream = await fileHandle.createWritable()
    await stream.write(document.getElementById('textarea').innerText)
    await stream.close()
    setTextFile('')
  }


  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => openFile()} >Open file</button>
        <pre id='textarea' contentEditable>{textFile}</pre>
        <button onClick={() => saveFile()} >Save file</button>
        <button onClick={( ) => saveAs()} >Save As</button>
      </header>
    </div>
  );
}

export default App;
