import React from 'react';
import axios from '../../axios';
import AddAnimal from './AddAnimal/AddAnimal';
import AddFood from './AddFood/AddFood';
import Tables from './Tables/Tables';


class Content extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
        allEatingAnimals: [''],
        meatEatingAnimals: [''],
        vegeEatingAnimals: [''],
        showModal: ['']
      };
      this.handler = this.handler.bind(this)
  }

componentDidMount() {
  this.fetchAnimals();
}

componentDidUpdate(prevProps) {
  if(this.props !== prevProps) {
    this.setState({
        allEatingAnimals: this.props.allEatingAnimals,
        meatEatingAnimals: this.props.meatEatingAnimals,
        vegeEatingAnimals: this.props.vegeEatingAnimals
    });
  }
} 

handler() {
  this.fetchAnimals();
  this.fetchAnimals();
}

// componentDidUpdate(prevProps) {
//   // Typowy sposób użycia (nie zapomnij porównać właściwości):
//   if (this.props.userID !== prevProps.userID) {
//     this.fetchData(this.props.userID);
//   }
// }

async fetchAnimals() {
    const resAllEating = await axios.get('/animalsTable', {params: {preferencies: "wszystkożerny"}});
    const resMeatEating = await axios.get('/animalsTable', {params: {preferencies: "mięsożerny"}});
    const resVegeEating = await axios.get('/animalsTable', {params: {preferencies: "roślinożerny"}});
    const allEatingAnimals = resAllEating.data.reverse();
    const meatEatingAnimals = resMeatEating.data.reverse();
    const vegeEatingAnimals = resVegeEating.data.reverse();
    this.setState({ allEatingAnimals, meatEatingAnimals, vegeEatingAnimals });
}

  render() {
    return (

      <div className="container py-3">

<div className="animal-button display-flex">
<p className="col-12 col-lg-8 col-md-6">System zarządzania ZOO</p>
<div className="col-12 col-lg-4 col-md-6 align-items-end">
<button className="btn head-button btn-primary btn-sm me-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasFood" aria-controls="offcanvasFood">Dodaj nowy pokarm</button>
<button className="btn head-button btn-primary btn-sm me-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">Dodaj nowe zwierzę</button>
</div>
</div>
<AddFood />
<AddAnimal handler = {this.handler}/>
<Tables 
  allEatingAnimals={this.state.allEatingAnimals}
  meatEatingAnimals={this.state.meatEatingAnimals}
  vegeEatingAnimals={this.state.vegeEatingAnimals}
  handler = {this.handler}
/>
      </div>
        );
      }
  }
  
  export default Content;