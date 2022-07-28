type HandleDownloadData = 'darwin';

export function App() {
  function handleDownload(platform: HandleDownloadData): void {
    window.open(`http://165.227.197.107:5555/download/${platform}`);
  }

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
      <button onClick={() => handleDownload('darwin')}>
        Download MacOS
      </button>
    </div>
  )
}