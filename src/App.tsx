import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import EditorInterface from './components/EditorInterface';

function App() {
  const [showEditor, setShowEditor] = useState(false);

  return (
    <div className="App">
      {showEditor ? (
        <EditorInterface onBack={() => setShowEditor(false)} />
      ) : (
        <LandingPage onGetStarted={() => setShowEditor(true)} />
      )}
    </div>
  );
}

export default App;