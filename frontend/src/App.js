import "./App.css";

import Main from "./components/main";
import Header from "./components/header";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="row">
        <Main />
      </div>
    </div>
  );
}

export default App;
