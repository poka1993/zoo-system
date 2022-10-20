import React from 'react';
import axios from '../../../axios';

class AddAnimal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allEatingSpecies: [''],
            meatEatingSpecies: [''],
            vegeEatingSpecies: [''],
            flexRadio: "wszystkożerny",
            newSpecie: "",
            selectSpecie: "",
            newAnimalName: "",
            alertShow: false,
            alert: {
              class: "",
              message: ""
            }
        };
        this.addSpecie = this.addSpecie.bind(this);
        this.addAnimal = this.addAnimal.bind(this);
    }

    componentDidMount() {
        this.fetchSpecies();
    }

  //   componentDidUpdate() {
  //     this.fetchSpecies();
  // }

    async fetchSpecies() {
        const resAllEatingSpecies = await axios.get('/speciesTable', {params: {preferencies: "wszystkożerny"}});
        const resMeatEatingSpecies = await axios.get('/speciesTable', {params: {preferencies: "mięsożerny"}});
        const resVegeEatingSpecies = await axios.get('/speciesTable', {params: {preferencies: "roślinożerny"}});
        const allEatingSpecies = resAllEatingSpecies.data.reverse();
        const meatEatingSpecies = resMeatEatingSpecies.data.reverse();
        const vegeEatingSpecies = resVegeEatingSpecies.data.reverse();
        this.setState({ allEatingSpecies, meatEatingSpecies, vegeEatingSpecies });
    }

    handleChangeRadio = e => {
        const { id } = e.target;
    
        this.setState({
          flexRadio: id,
          selectSpecie: ""
        });
    };

    addSpecieHandler = event => {
      const value = event.target.value.toLowerCase();  
      this.setState({ newSpecie: value })
    }

    hideAlert = () => {
      this.setState({ alertShow: false })
    };

    async addSpecie() {
      const newSpecie = {
        name_of_species: this.state.newSpecie,
        preferences: this.state.flexRadio
      }
      let animalTable;
      switch (newSpecie.preferences) {
        case "wszystkożerny":
            animalTable = this.state.allEatingSpecies;
        break;
        case "mięsożerny":
          animalTable = this.state.meatEatingSpecies;
        break;
        case "roślinożerny":
          animalTable = this.state.vegeEatingSpecies;
        break;
    };
      if (newSpecie.name_of_species.length > 2) {
        const resAddSpecie = await axios.post('/addSpecie', newSpecie);
        const result = (resAddSpecie.data.reverse())[0]; 
        if (result.species_id) {
          const newAnimalTable = animalTable.push(result);
          this.setState({ newSpecie: "", alertShow: true, alert: {class: "alert alert-success alert-dismissible", message: `Gatunek ${newSpecie.name_of_species} został dodany do kategorii ${newSpecie.preferences}ch.`}})
        } else {
          this.setState({ alertShow: true, alert: {class: "alert alert-danger alert-dismissible", message: `Gatunek ${newSpecie.name_of_species} znajduje się już w kategorii ${result.preferences}ch.`}}) 
        }
      } else {
        this.setState({ alertShow: true, alert: {class: "alert alert-danger alert-dismissible", message: "Nazwa gatunku musi składać się z co najmniej 3 liter."}})
      }
    };

    handleSelectSpecie = e => {
      const { value } = e.target;
      console.log(value);
  
      this.setState({ selectSpecie: value });
  };

  addAnimalHandler = event => {
    const value = event.target.value.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase()+ s.substring(1)).join(' ');
    this.setState({ newAnimalName: value })
  }

  async addAnimal() {
    const newAnimal = {
      name_of_animal: this.state.newAnimalName,
      species_id: this.state.selectSpecie
    }
    if (newAnimal.species_id) {
      if (newAnimal.name_of_animal.length > 1) {
        const resAddAnimal = await axios.post('/addAnimal', newAnimal);
        const result = (resAddAnimal.data.reverse())[0]; 
        console.log(result);
        if (result.animal_id) {
          this.setState({ newAnimalName: "", alertShow: true, alert: {class: "alert alert-success alert-dismissible", message: `Zwierzę o imieniu ${newAnimal.name_of_animal} z gatunku ${result.name_of_species} zostało dodane do bazy.`}})
        } else {
          this.setState({ alertShow: true, alert: {class: "alert alert-danger alert-dismissible", message: `Zwierzę o imieniu ${newAnimal.name_of_animal} z gatunku ${result.name_of_species} istnieje już w bazie. Nadaj inne imię.`}}) 
        }
      } else {
        this.setState({ alertShow: true, alert: {class: "alert alert-danger alert-dismissible", message: "Nadawane imię musi składać się z co najmniej 2 liter."}})
      }
    } else {
      this.setState({ alertShow: true, alert: {class: "alert alert-danger alert-dismissible", message: "Musisz wskazać gatunek zwierzęcia."}})
    }
  };

    render() {
        let species;
        switch (this.state.flexRadio) {
            case "wszystkożerny":
                species = this.state.allEatingSpecies 
            break;
            case "mięsożerny":
                species = this.state.meatEatingSpecies
            break;
            case "roślinożerny":
                species = this.state.vegeEatingSpecies
            break;
        };

        const alert = this.state.alertShow ?
        <div className="ZooAlert">
        <div id="liveAlertPlaceholder" className={this.state.alert.class} role="alert">{this.state.alert.message}<button type="button" onClick={this.hideAlert} className="btn-close" aria-label="Close"></button></div>
        </div>
      : null

        return (
            <div className="offcanvas offcanvas-top" tabIndex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
  <div className="offcanvas-header">
    <h5 className="offcanvas-title" id="offcanvasTopLabel">Dodaj nowe zwierzę</h5>
    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body position-relative">
  {alert}

  <div className="card text-start">
  <div className="card-header">
    Baza zwierzęcych gatunków
  </div>
  <div className="card-body ms-3 me-3">
  <div className="row justify-content-center">
  <div className="col align-items-start border p-0 col-lg-2 col-md-4 ">
<div className="card-body">

<div className="mb-5">
    
  <label className="form-label">Typ gatunku</label>

  <div className="form-check">
  <input className="form-check-input" type="radio" defaultChecked name="flexRadioDefault" id="wszystkożerny" onChange={this.handleChangeRadio}/>
  <label className="form-check-label ms-1" htmlFor="wszystkożerny">
    Wszystkożerny
  </label>
</div>
<div className="form-check">
  <input className="form-check-input" type="radio" name="flexRadioDefault" id="mięsożerny" onChange={this.handleChangeRadio}/>
  <label className="form-check-label ms-1" htmlFor="mięsożerny">
    Mięsożerny
  </label>
</div>
<div className="form-check">
  <input className="form-check-input" type="radio" name="flexRadioDefault" id="roślinożerny" onChange={this.handleChangeRadio}/>
  <label className="form-check-label ms-1" htmlFor="roślinożerny">
    Roślinożerny
  </label>
</div>
</div></div></div>

<div className="col-12 col-lg-4 col-md-8 flex-grow-1 ps-0 pe-0 ps-lg-3 ps-md-3 pt-3 pt-md-0">
<div className="card-body border">











<div>
<label className="form-label">Wybierz gatunek z listy</label>
<select className="form-select" multiple aria-label="multiple select example">
    {species.map(specie => (<option onClick={this.handleSelectSpecie} key={String(specie.species_id)} value={specie.species_id}>{specie.name_of_species}</option>))}
</select>
<label className="form-label mt-2">Wprowadź nowy gatunek</label>
  <input type="text" className="form-control" placeholder="Nazwa gatunku" value={this.state.newSpecie} onChange={this.addSpecieHandler}/>
  <button className="btn btn-primary btn-sm mt-3" type="button" onClick={this.addSpecie}>Dodaj do listy</button>
</div>

</div>

</div>

<div className="col-12 col-lg-4 pt-3 pt-lg-0 ps-0 ps-lg-3">
<div className="card-body border">
<label className="form-label">Wprowadź imię zwierzęcia</label>
  <input type="text" className="form-control" placeholder="Nazwa zwierzęcia" value={this.state.newAnimalName} onChange={this.addAnimalHandler}/>
  <div onClick={this.props.handler}><button className="btn btn-primary btn-sm mt-3" type="button" onClick={this.addAnimal}>Dodaj zwierzę</button></div>
</div>
</div>

</div>
</div>
</div>




    
  </div>
</div>
        );
    }
}
    
export default AddAnimal;