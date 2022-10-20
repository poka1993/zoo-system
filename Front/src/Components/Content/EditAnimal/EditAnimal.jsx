import React from 'react';
import axios from '../../../axios';

class EditAnimal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          allEatingSpecies: [''],
          meatEatingSpecies: [''],
          vegeEatingSpecies: [''],
          animal_id: this.props.animal_id,
          species_id: "",
          name_of_animal: "",
          editNameMode: "",
          editSpecieMode: false,
          preferences: "",
          name_of_species: "",
          selectSpecie: "",
          
          alertShow: false,
          alert: {
            class: "",
            message: ""
          }
        }
        console.log(this.state.animal_id)
        console.log(this.props.animal_id)

    };

    editNameHandler = () => {
      this.setState({
        editNameMode: !this.state.editNameMode
      });
      if (this.state.editNameMode) {
        this.editAnimalName();
      }
    }

    editSpecieHandler = () => {
      if (this.state.editSpecieMode) {
        this.editAnimalSpecie();
      }
      this.setState({
        editSpecieMode: !this.state.editSpecieMode
      });
    }

    editAnimalNameHandler = event => {
      const value = event.target.value.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase()+ s.substring(1)).join(' ');
      this.setState({ name_of_animal: value })
    }

    editPreferenceHandler = event => {
      const value = event.target.value;
      this.setState({ preferences: value })
    }

    handleSelectSpecie = event => {
      const { value } = event.target;
      this.setState({ selectSpecie: value });
    }

    async editAnimalSpecie() {
      const editAnimalSpecie = {
        animal_id: this.state.animal_id,
        species_id: this.state.selectSpecie
      }
      console.log(editAnimalSpecie)
          const resEditAnimalSpecie = await axios.put('/editAnimalSpecie', editAnimalSpecie);
          const result = resEditAnimalSpecie.data.reverse()[0]; 
          console.log(result);
          if (result.animal_id) {
            this.setState({ alertShow: true, alert: {class: "alert alert-success alert-dismissible", message: `Zmieniono gatunek zwierzęcia o imieniu ${result.name_of_animal} na ${result.name_of_species} z kategorii ${this.state.preferences}ch.`}})
            this.setState({ species_id: result.species_id, preferences: result.preferences, name_of_species: result.name_of_species });
          }
      }
      
    async editAnimalName() {
      const newAnimalName = {
        animal_id: this.state.animal_id,
        name_of_animal: this.state.name_of_animal,
        species_id: this.state.species_id
      }
        if (newAnimalName.name_of_animal.length > 1) {
          const resEditAnimalName = await axios.put('/editAnimalName', newAnimalName);
          const result = resEditAnimalName.data.reverse()[0]; 
          console.log(result);
          if (!result.species_id) {
            this.setState({ alertShow: true, alert: {class: "alert alert-success alert-dismissible", message: `Zmieniono imię zwierzęcia na ${newAnimalName.name_of_animal}.`}})
          } else {
            this.setState({ alertShow: true, alert: {class: "alert alert-danger alert-dismissible", message: `Zwierzę o imieniu ${newAnimalName.name_of_animal} z gatunku ${result.name_of_species} istnieje już w bazie. Nadaj inne imię.`}}) 
          }
        } else {
          this.setState({ alertShow: true, alert: {class: "alert alert-danger alert-dismissible", message: "Nadawane imię musi składać się z co najmniej 2 liter."}})
        }
      }

    componentDidMount() {
      this.fetchSpecies();
      this.fetchEditAnimal();
  }


  // componentDidUpdate(prevProps, prevState) {
  //   if (this.props.animal_id !== this.state.animal_id) {
  //       () => this.fetchEditAnimal();
  //    }     
  // } 

    async fetchEditAnimal() {
      const resAnimalDetails = await axios.get('/fetchEditAnimal', {params: {animal_id: this.props.animal_id}});
      const AnimalDetails = resAnimalDetails.data.reverse();
      console.log(AnimalDetails);
      this.setState({
        species_id: AnimalDetails[0].species_id,
        selectSpecie: AnimalDetails[0].species_id,
        name_of_animal: AnimalDetails[0].name_of_animal,
        preferences: AnimalDetails[0].preferences,
        name_of_species: AnimalDetails[0].name_of_species
      });
    }

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
        preferences: id,
      });
  };

  hideAlert = () => {
    this.setState({ alertShow: false })
  };



  render() {
    let species;
    switch (this.state.preferences) {
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
        <div>
            {alert}
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nazwa zwierzęcia</span>
            <input type="text" className="form-control" placeholder="Nazwa zwierzęcia" value={this.state.name_of_animal} onChange={this.editAnimalNameHandler} aria-describedby="basic-addon1" disabled={this.state.editNameMode ? false : true} />
            <button type="button" className="btn btn-primary" onClick={this.editNameHandler}>{this.state.editNameMode ? "Zapisz" : "Edytuj"}</button>
          </div>




          <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Gatunek zwierzęcia</span>
          <select className="form-select" aria-label="Default select example" value={this.state.preferences} onChange={this.editPreferenceHandler} disabled={this.state.editSpecieMode ? false : true}>
            <option value="wszystkożerny">Wszystkożerny</option>
            <option value="mięsożerny">Mięsożerny</option>
            <option value="roślinożerny">Roślinożerny</option>
          </select>
          </div>


          {this.state.editSpecieMode
            ?
            <>
            <div className="d-flex justify-content-start">
            <label className="form-label">Wybierz gatunek z listy</label>
            </div>
            <div className="input-group mb-3">
            <select className="form-select" multiple aria-label="multiple select example">
             {species.map(specie => (<option onClick={this.handleSelectSpecie} key={String(specie.species_id)} selected={(this.state.selectSpecie == specie.species_id) ? true : false} value={specie.species_id}>{specie.name_of_species}</option>))}
            </select>   
            </div> 
            <div className="d-flex justify-content-end">
            <button type="button" className="btn btn-primary" onClick={this.editSpecieHandler}>Zapisz</button>
            </div>
            </>
            :
            <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nazwa gatunku</span>
            <input type="text" className="form-control" placeholder="Nazwa gatunku" value={this.state.name_of_species} aria-describedby="basic-addon1" disabled />
            <button type="button" className="btn btn-primary" onClick={this.editSpecieHandler}>Edytuj</button>
            </div>
          }
      </div>
      )

      };
}
    
export default EditAnimal;