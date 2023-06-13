import "./App.css";
import React from "react";
import PizzaComponent from "./components/PizzaComponent";


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="tab">
          <PizzaComponent /> {/* PizzaComponent를 렌더링합니다 */}
        </div>
      </div>
    );
  }
}

export default App;