import './App.css';

type HandleDownloadData = 'darwin';

export function App() {
  function handleDownload(platform: HandleDownloadData): void {
    window.location.assign(`https://storage.cloud.google.com/mocha-app/macos/Mocha-0.0.5.dmg`);
  }

  return (
    <div className="App">
      app: 
      <button onClick={() => handleDownload('darwin')}>
        Download MacOS
      </button>
    </div>
  )
}