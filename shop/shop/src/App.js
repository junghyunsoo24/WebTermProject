import './App.css';
import React from 'react';
import PizzaComponent from "./components/PizzaComponent";
import NavigationPizzas from "./components/NavigationPizzas";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="tab">
        <PizzaComponent /> {/* PizzaComponent를 렌더링합니다 */}
        <NavigationPizzas></NavigationPizzas>
        </div>
        </div>


    )
}
}

export default App;

