import './App.css'

type HandleDownloadData = 'darwin';


export function App() {
  function handleDownload(platform: HandleDownloadData): void {
    if(platform === 'darwin') {
      window.open('https://workdrive.zohoexternal.com/external/2dd7c8a6b16933ec26d039270a454215bda5b9157e26f4bfe0fd250a7de92b50');
    }
  }

  return (
    <div className="App">
      <button onClick={() => handleDownload('darwin')}>
        Download MacOS
      </button>
    </div>
  )
}