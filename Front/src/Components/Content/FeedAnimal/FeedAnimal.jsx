import React from 'react';
import axios from '../../../axios';
import ApexChart from './ApexChart';
import StandardDate from '../StandardDate/StandardDate';
import FeedRecords from './FeedRecords';

class FeedAnimal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            feedingDetails: "",
            feedingProducts: [],
            seriesOfDiagram: [],
            labelsOfDiagram: [],
            diagramMount: true,


          animal_id: this.props.animal_id,
          meatFood: [""],
          vegeFood: [""],
          flexSelect: "",
          selectedProduct: "",
          selectedPortions: "",
          basket: [],
          alertShow: false,
          alert: {
            class: "",
            message: ""
          }            
        }
        this.addFeeding = this.addFeeding.bind(this);
        this.hideAlert = this.hideAlert.bind(this);
    };

    componentDidMount() {
      this.fetchEditAnimal();
      this.fetchFood();
      this.fetchFeedingHistory();
      this.fetchFeedingDiagram();
    }

      handleFlexSelect = event => {
        const value = event.target.value;
        this.setState({ flexSelect: value, selectedProduct: "" })
      }

      handleSelectProduct = event => {
        const id = event.target.id;
        const value = event.target.value;
        this.setState({ selectedProduct: id, selectedProductName: value })
      }

      handleSelectPortions = event => {
        let value = Number(event.target.value);
        if (value <= 0 || value > 8 || value.length > 2) {
          value = "";
        }
        if (value%1 == 0 && value <= 8) {
          this.setState({ selectedPortions: value })
        } else {
          this.setState({ selectedPortions: value })
        }
      }

      handlAddProductToBasket = () => {
        if (!this.state.selectedProduct) {
          this.setState({ alertShow: true, alert: {class: "alert alert-danger alert-dismissible", message: `Musisz wskazać produkt z listy.`}})
        } else {
          if (!this.state.selectedPortions) {
            this.setState({ alertShow: true, alert: {class: "alert alert-danger alert-dismissible", message: `Musisz wskazać ilość sztuk / porcji .`}})
          } else {
            if (this.state.basket.find(product => product.food_id == this.state.selectedProduct)) {
              this.setState({ alertShow: true, alert: {class: "alert alert-danger alert-dismissible", message: `${this.state.selectedProductName.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase()+ s.substring(1)).join(' ')} znajduje się już w liście wybranych produktów`}})
            } else {
              let product = {
                food_id: Number(this.state.selectedProduct),
                food_name: (this.state.selectedProductName),
                portions: Number(this.state.selectedPortions)
              };
              this.setState({ basket: [...this.state.basket, product] });
              this.setState({ alertShow: false, selectedProduct: "", selectedPortions: "", selectedProductName: "" });
              this.fetchFeedingDiagram;
            }
          }
        }
      }

      deleteProduct = event => {
          let index = event.target.id;
          let basket = this.state.basket
            if (index > -1) {
              basket.splice(index, 1);
            }
            this.setState({ basket })
          }

    async fetchEditAnimal() {
      const resAnimalDetails = await axios.get('/fetchEditAnimal', {params: {animal_id: this.props.animal_id}});
      const AnimalDetails = resAnimalDetails.data.reverse();
      this.setState({
        species_id: AnimalDetails[0].species_id,
        selectSpecie: AnimalDetails[0].species_id,
        name_of_animal: AnimalDetails[0].name_of_animal,
        preferences: AnimalDetails[0].preferences,
        name_of_species: AnimalDetails[0].name_of_species
      });
    }

    async fetchFood() {
      const resMeatFood = await axios.get('/foodTable', {params: {type_of_food: "mięso"}});
      const resVegeFood = await axios.get('/foodTable', {params: {type_of_food: "roślina"}});
      const meatFood = resMeatFood.data.reverse();
      const vegeFood = resVegeFood.data.reverse();
      this.setState({ meatFood, vegeFood });      
      switch (this.state.preferences) {
        case "wszystkożerny":
          this.setState({ flexSelect: "roślinożerny", disabledSelect: false });
        break;
        case "mięsożerny":
          this.setState({ flexSelect: "mięsożerny", disabledSelect: true });
        break;
        case "roślinożerny":
          this.setState({ flexSelect: "roślinożerny", disabledSelect: true });
        break;
        
        case "mięsożerny":
          this.setState({ food: this.state.meatFood });
        break;
        case "roślinożerny":
          this.setState({ food: this.state.vegeFood });
        break;
      };      
  }

  async fetchFeedingHistory() {
    const resFeedingHistory = await axios.get('/fetchFeedingHistory', {params: {animal_id: this.props.animal_id}});
    this.setState({ feedingDetails: resFeedingHistory.data });
    this.fetchFeedingProducts(resFeedingHistory.data);
  }

  async fetchFeedingDiagram() {
    const resFeedingDiagram = await axios.get('/fetchFeedingDiagram', {params: {animal_id: this.props.animal_id}});
    let seriesOfDiagram = [];
    let labelsOfDiagram = [];
    for (let option of resFeedingDiagram.data) {
      seriesOfDiagram = [...seriesOfDiagram, option.portions]
      labelsOfDiagram = [...labelsOfDiagram, option.name_of_food]
    }
    this.setState({ seriesOfDiagram, labelsOfDiagram});
  }

  async fetchFeedingProducts(data) {
    let feedings = data;
    let products = [];
    let objectsProducts = [];
    for (let feeding of feedings) {
      const resFeedingProducts = await axios.get('/fetchFeedingProducts', {params: {feeding_id: feeding.feeding_id}});
      products = [...products, resFeedingProducts.data]
    }
    this.setState({ feedingProducts: products })
    for (let object of products) {
      for (let obj of object) {
        objectsProducts = [...objectsProducts, obj]
      }
    }
    this.setState({ objectProducts: objectsProducts})
  }

  async addFeeding() {
    const feeding = {
      animal_id: this.state.animal_id,
      basket: this.state.basket
    }
        const resAddFeeding = await axios.post('/addFeeding', feeding);
        const result = resAddFeeding.data.reverse()[0]; 
        if (result.feeding_id) {
          this.setState({ alertShow: true, alert: {class: "alert alert-success alert-dismissible", message: `Produkty zostały pomyślnie dodane do historii karmienia.`} });
          this.setState({ basket: [], selectedPortions: "", selectedProduct: "", selectedProductName: ""});
          this.fetchFeedingHistory();
          this.fetchFeedingDiagram();
        }

    }

    hideAlert = () => {
      this.setState({ alertShow: false })
    };

  render() {
    let food = [];
    switch (this.state.flexSelect) {
      case "roślinożerny":
          food = this.state.vegeFood;
      break;
      case "mięsożerny":
          food = this.state.meatFood;
      break;
    };
    
    const alert = this.state.alertShow ?
    <div className="ZooAlert">
    <div id="liveAlertPlaceholder" className={this.state.alert.class} role="alert">{this.state.alert.message}<button onClick={this.hideAlert} type="button" className="btn-close" aria-label="Close"></button></div>
    </div>
    : null

    let feedingLp = 0;
    let products = this.state.feedingProducts;

      return (
        <div>
            {alert}

            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
  <li className="nav-item" role="presentation">
    <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="false" onClick={this.handleDiagramMount}>Historia karmienia</button>
  </li>
  <li className="nav-item" role="presentation">
    <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="true" onClick={this.handleDiagramMount}>Nowy posiłek</button>
  </li>
</ul>
<div className="tab-content" id="pills-tabContent">
  <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex="0">
  <div className="d-flex justify-content-center">
  {(this.state.labelsOfDiagram.length>0) ? <ApexChart series={this.state.seriesOfDiagram} labels={this.state.labelsOfDiagram}/> : null}
  </div>
  <table className="table table-striped table-hover">
  <thead>
<tr>
  <th scope="col">Lp.</th>
  <th scope="col">Data karmienia</th>
  <th scope="col">Produkty</th>
</tr>
</thead>
<tbody>
  {/* <tr>
    <th scope="row">1</th>
    <td scope="row">13.20.2022, 22:05:22</td>
    <td>Sałata (3 szt.), Marchew (2 szt.)</td>
  </tr> */}

{/* 
  {this.state.feedingDetails
  ? 
  <td scope="row">{this.state.feedingProducts.map((detail) => (<div key={String(detail.feeding_id)} id={detail.feeding_id}>{<StandardDate date={detail.feeding_time} />}</div>))}
  <tr>
    <th scope="row">1</th>
    <td scope="row">{this.state.feedingProducts.map((detail) => (<div key={String(detail.feeding_id)} id={detail.feeding_id}>{<StandardDate date={detail.feeding_time} />}</div>))}</td>
    <td>Sałata (3 szt.), Marchew (2 szt.)</td>
  </tr>
  :
  null} */}


{(this.state.feedingDetails.length>0) ?
this.state.feedingDetails.map((detail, index) => (
<FeedRecords
key={String(detail.feeding_id)}
feeding_id={detail.feeding_id}
lp = {(++feedingLp)}
feeding_time={detail.feeding_time}
index={index}
food={products}
/> )) : 
  <tr><th colSpan="3">Te zwierzę nie było jeszcze karmione.</th></tr>}
</tbody>
</table>




  </div>
  <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex="0">
  <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Rodzaj pokarmu</span>
          <select className="form-select" aria-label="Default select example" value={this.state.flexSelect} onChange={this.handleFlexSelect} disabled={this.state.disabledSelect}>
            <option value="mięsożerny">Mięsny</option>
            <option value="roślinożerny">Roślinny</option>
          </select>
          </div>

            <div className="d-flex justify-content-start">
            <label className="form-label">Wybierz produkt z listy</label>
            </div>
            <div className="input-group mb-3">
            <select className="form-select" multiple aria-label="multiple select example">
              {food.map(food => (<option selected={this.state.selectedProduct == food.food_id} onClick={this.handleSelectProduct} key={String(food.food_id)} id={food.food_id} value={food.name_of_food}>{food.name_of_food}</option>))}
            </select> 
            </div> 

            <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Ilość (sztuk / porcji)</span>
            <input type="number" className="form-control" placeholder="0" value={this.state.selectedPortions} onChange={this.handleSelectPortions} aria-describedby="basic-addon1" />
            <button type="button" className="btn btn-primary" onClick={this.handlAddProductToBasket}>Dodaj</button>
          </div>

          <div className="card">
  <div className="card-header d-flex justify-content-start">
    Zestawienie wybranych produktów {(this.state.basket.length > 0) ? "(kliknięcie usuwa produkt)" : null}
  </div>
  <div className="card-body d-flex justify-content-start flex-wrap">
    {this.state.basket.map((product, index) => (<div onClick={this.deleteProduct} className='m-2' key={String(product.food_id)} id={product.food_id}>{product.food_name} <span className="badge bg-secondary" id={index}>{product.portions}</span></div>))}
  </div>
</div>

          <div className="d-flex text-start mt-3">
            <button type="button" className="btn btn-primary" disabled={(this.state.basket.length > 0) ? false : true} onClick={this.addFeeding}>Zapisz posiłek</button>
            </div>
  </div>
</div>
      </div>
      )
    };
}
    
export default FeedAnimal;