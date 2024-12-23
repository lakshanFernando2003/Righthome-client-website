import './App.css';

function App() {
  return (
    <div className="App">
      <Job salary ={90000} position=" senior Software Developer" company = "Google" />
      <Job salary ={80000} position="junior Software Developer" company = "Facebook" />
      <Job salary ={70000} position="project Manager" company = "Amazon" />
    </div>
  );
}

 const Job = (props)=>{
  return (
    <div>
      <h1>{props.salary}</h1>
      <h2>{props.position}</h2>
      <h3>{props.company}</h3>
    </div>
  );
 }

export default App;
