import './App.css';
import Components from './components/bai1';
import ComponentsProps from './components/bai2';
function App() {
  return (
    <div className="App">
      <Components/>
      <ComponentsProps name='Trường' p='Rất tuyệt vời'/>
      <ComponentsProps name='Luân' p='Rất tốt'/>
    </div>
  );
}

export default App;
