import React from 'react';
import Records from './Records/Records'
import axios from '../../../axios';
import EditAnimal from '../EditAnimal/EditAnimal';
import Modal from '../Modal/Modal';

class Tables extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          allEatingAnimals: this.props.allEatingAnimals,
          meatEatingAnimals: this.props.meatEatingAnimals,
          vegeEatingAnimals: this.props.vegeEatingAnimals,
          showModal: false,
          modalMode: null,
          selected: "",
          selectedAnimal: null
        };
        this.handler = this.handler.bind(this)
    }
    
  async fetchAnimals() {
      const resAllEating = await axios.get('/animalsTable', {params: {preferencies: "wszystkożerny"}});
      const resMeatEating = await axios.get('/animalsTable', {params: {preferencies: "mięsożerny"}});
      const resVegeEating = await axios.get('/animalsTable', {params: {preferencies: "roślinożerny"}});
      const allEatingAnimals = resAllEating.data.reverse();
      const meatEatingAnimals = resMeatEating.data.reverse();
      const vegeEatingAnimals = resVegeEating.data.reverse();
      this.setState({ allEatingAnimals, meatEatingAnimals, vegeEatingAnimals });
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
      this.setState({
        showModal: !this.state.showModal
      })
      if (this.state.modalMode) {
        this.setState({
          modalMode: null
        })
        this.fetchAnimals();
      }
    }

    onAnimalSelected = (selectedAnimal) => {
      this.setState({
        selectedAnimal,
        showModal: true,
        modalMode: "editAnimal"
      });
    }

    onFeedingSelected = (selectedAnimal) => {
      this.setState({
        selectedAnimal,
        showModal: true,
        modalMode: "feedAnimal"
      });
    }

    onDeleteSelected = (selectedAnimal) => {
      this.setState({
        selectedAnimal,
        showModal: true,
        modalMode: "deleteAnimal"
      });
    }

    render() {
      let allEatingAnimalLp = 0;
      let meatEatingAnimalLp = 0;
      let vegeEatingAnimalLp = 0;

        return (
<div className="container py-2">
  <Modal modalMode={this.state.modalMode} animal_id={this.state.selectedAnimal} handler = {this.handler}/>

       <div className="accordion" id="accordionPanelsStayOpenExample">
  <div className="accordion-item">
    <h2 className="accordion-header" id="panelsStayOpen-headingOne">
    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
        Zwierzęta wszystkożerne
      </button>
    </h2>
    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
<div className="accordion-body">
<div className="table-responsive">
<table className="table table-striped table-hover">
  <thead>
<tr>
  <th scope="col">Lp.</th>
  <th scope="col">Gatunek</th>
  <th scope="col">Imię</th>
  <th scope="col" className="datecol">Rejestracja</th>
  <th scope="col" className="datecol">Ostatni pokarm</th>
  <th scope="col"></th>
  <th scope="col"></th>
  <th scope="col"></th>
</tr>
</thead>
<tbody>
      {this.state.allEatingAnimals.sort((a,b) => a.name_of_species > b.name_of_species ? 1 : -1).map(animal => (
        <Records
                    key={String(animal.animal_id)}
                    id={animal.animal_id}
                    lp = {(++allEatingAnimalLp)}
                    last_feeding={animal.last_feeding}
                    name_of_animal={animal.name_of_animal}
                    name_of_species={animal.name_of_species}
                    register={animal.register}
                    handler = {this.handler}
                    feedingSelected={this.onFeedingSelected}
                    animalSelected={this.onAnimalSelected}
                    deleteSelected={this.onDeleteSelected}
                />
        ))}
</tbody>
</table>
</div>
</div>
</div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="true" aria-controls="panelsStayOpen-collapseTwo">
        Zwierzęta mięsożerne
      </button>
    </h2>
    <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingTwo">
      <div className="accordion-body">
        
      <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead>
      <tr>
        <th scope="col">Lp.</th>
        <th scope="col">Gatunek</th>
        <th scope="col">Imię</th>
        <th scope="col" className="datecol">Rejestracja</th>
        <th scope="col" className="datecol">Ostatni pokarm</th>
        <th scope="col"></th>
        <th scope="col"></th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
    {this.state.meatEatingAnimals.sort((a,b) => a.name_of_species > b.name_of_species ? 1 : -1).map(animal => (
        <Records
                    key={String(animal.animal_id)}
                    id={animal.animal_id}
                    lp = {++meatEatingAnimalLp}
                    last_feeding={animal.last_feeding}
                    name_of_animal={animal.name_of_animal}
                    name_of_species={animal.name_of_species}
                    register={animal.register}
                    handler = {this.handler}
                    feedingSelected={this.onFeedingSelected}
                    animalSelected={this.onAnimalSelected}
                    deleteSelected={this.onDeleteSelected}
                />
        ))}
    </tbody>
      </table>
      </div>
        
        
        
  
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header" id="panelsStayOpen-headingThree">
      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="true" aria-controls="panelsStayOpen-collapseThree">
        Zwierzęta roślinożerne
      </button>
    </h2>
    <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingThree">
      <div className="accordion-body">
       
      <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead>
      <tr>
        <th scope="col">Lp.</th>
        <th scope="col">Gatunek</th>
        <th scope="col">Imię</th>
        <th scope="col" className="datecol">Rejestracja</th>
        <th scope="col" className="datecol">Ostatni pokarm</th>
        <th scope="col"></th>
        <th scope="col"></th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
    {this.state.vegeEatingAnimals.sort((a,b) => a.name_of_species > b.name_of_species ? 1 : -1).map(animal => (
        <Records
                    key={String(animal.animal_id)}
                    id={animal.animal_id}
                    lp = {++vegeEatingAnimalLp}
                    last_feeding={animal.last_feeding}
                    name_of_animal={animal.name_of_animal}
                    name_of_species={animal.name_of_species}
                    register={animal.register}
                    handler = {this.handler}
                    feedingSelected={this.onFeedingSelected}
                    animalSelected={this.onAnimalSelected}
                    deleteSelected={this.onDeleteSelected}
                />
        ))}
    </tbody>
      </table>
      </div>

      </div>
    </div>
  </div>
</div>
</div>
        );
    }
}

export default Tables;