import React from 'react';
import axios from '../../../axios';

class DeleteAnimal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          deleted: false,
          animal_id: this.props.animal_id,

          animal_id: this.props.animal_id,
          species_id: "",
          name_of_animal: "",


          preferences: "",
          name_of_species: "",
          selectSpecie: "",

          alertShow: false,
          alert: {
            class: "",
            message: ""
          }
        }
        this.deleteAnimal= this.deleteAnimal.bind(this);
    };

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

    //   async deleteAnimalHistory() {
    //     const resDeleteAnimal = await axios.delete('/deleteAnimal', {params: {animal_id: this.props.animal_id}});
    //   }

    async deleteAnimal() {
        const resDeleteAnimalHistory = await axios.delete('/deleteAnimalHistory', {params: {animal_id: this.props.animal_id}});
        console.log(resDeleteAnimalHistory.data)
        const resDeleteAnimal = await axios.delete('/deleteAnimal', {params: {animal_id: this.props.animal_id}});
        this.setState({deleted: true});
        // this.deleteAnimal();
      }

    componentDidMount() {
      this.fetchEditAnimal();
  }


  hideAlert = () => {
    this.setState({ alertShow: false })
  };



  render() {
    const alert = this.state.alertShow ?
    <div className="ZooAlert">
    <div id="liveAlertPlaceholder" className={this.state.alert.class} role="alert">{this.state.alert.message}<button type="button" onClick={this.hideAlert} className="btn-close" aria-label="Close"></button></div>
    </div>
    : null

      return (
        <div>
            {this.state.deleted ?
            <div>
                Zwierzę o imieniu <b>{this.state.name_of_animal}</b> z gatunku <b>{this.state.name_of_species}</b> wraz z całą historią karmienia zostało usunięte z bazy.
            </div> :
            <div>
                Czy na pewno chcesz usunąć zwierzę o imieniu <b>{this.state.name_of_animal}</b> z gatunku <b>{this.state.name_of_species}</b> wraz z całą jego historią karmienia?
                <div className="modal-footer mt-2">
                    <button type="button" className="btn btn-primary" onClick={this.deleteAnimal}>Potwierdź</button>
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Anuluj</button>
                </div>
            </div>    
            }   
      </div>
      )

      };
}
    
export default DeleteAnimal;