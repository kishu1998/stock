import React from 'react';
import logo, { ReactComponent } from './logo.svg';
import './App.css';
class Hi extends React.Component
{
    constructor() {
    super();

    this.state = {person: []};
}
  componentDidMount() {
    fetch('https://api.myjson.com/bins/t06ot')
    .then(response =>  response.json())
    .then(resData => {
       //console.log(JSON.stringify(resData))
       //do your logic here       
       //let person = resData.results
       this.setState({ person: resData.results }); //this is an asynchronous function
    })
}

render(){
  let l=[];
 l=this.state.person.map((personRecord) => {
  return <div key={personRecord.id.value}> {personRecord.name.first} </div>
});
  return(
  <div>
    { 
      l
    }
  </div>
  )
}
}
class Showproducts extends React.Component
{
  
  render()
  {
    
    let lastcategory=null;
    const list=[];
    this.props.products.forEach((element,index) => {
      if(!element.name.includes(this.props.tobeshown)) return;
      if(this.props.check && !element.stocked) return;
      
      if(element.category!==lastcategory)
    list.push(<li key={element.category} className="category" >{element.category}</li>)
      let name=element.stocked?element.name:<span style={{color:'red'}} >{element.name}</span>
      list.push(<li key={element.name} className="list" >{name} &nbsp;&nbsp; {element.price}</li>)
    lastcategory=element.category;
    });
  
    return <div><ul>
      {list}
      </ul></div>

  }
}
class SearchBar extends React.Component
{
  constructor()
  {
    super()
    this.change = this.change.bind(this);
  } 
  change(e)
  {
    this.props.OnTermChange(e.target.value);
  }
  handle()
  {
    this.props.tickmark();
  }
  render()
  {
    return <div><div><input onChange={event=>this.change(event)} /></div>
    <p>
      <input type='checkbox' onClick={()=>this.handle()} />
      only show products in stock
    </p>
    </div>
  }
}
class App extends React.Component {
constructor()
{
  super()
  this.state={
    check:false,
    searchval:''
  }
  this.OnTermChange = this.OnTermChange.bind(this);
  this.tickmark = this.tickmark.bind(this);
}
OnTermChange(val)
  {
    
    this.setState({searchval:val})
  }
tickmark()
{
  
  this.setState({check:!this.state.check})

}
render(){
  return (
    <div id='container'>
      <SearchBar OnTermChange={(i)=>this.OnTermChange(i)} tickmark={this.tickmark} ></SearchBar>
      <Showproducts tobeshown={this.state.searchval} check={this.state.check} products={this.props.products}/> 
      
    </div>
  );
}
}

export default App;
