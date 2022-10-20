import React from 'react';
import axios from '../../../axios';

class AddFood extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vegeFood: [''],
            meatFood: [''],
            flexRadio: "roślina",
            newFood: "",
            alertShow: false,
            alert: {
              class: "",
              message: ""
            }
        };
        this.addFood = this.addFood.bind(this);
    }

    componentDidMount() {
      this.fetchFood();
    }

  //   componentDidUpdate() {
  //     this.fetchFood();
  // }

    async fetchFood() {
        const resMeatFood = await axios.get('/foodTable', {params: {type_of_food: "mięso"}});
        const resVegeFood = await axios.get('/foodTable', {params: {type_of_food: "roślina"}});
        const meatFood = resMeatFood.data.reverse();
        const vegeFood = resVegeFood.data.reverse();
        this.setState({ meatFood, vegeFood });
    }

    handleChangeRadio = e => {
        const { id } = e.target;
    
        this.setState({
          flexRadio: id,
        });
    };

    addFoodHandler = event => {
      const value = event.target.value.toLowerCase();  
      this.setState({ newFood: value })
    }

    hideAlert = () => {
      this.setState({ alertShow: false })
    };

    async addFood() {
      const newFood = {
        name_of_food: this.state.newFood,
        type_of_food: this.state.flexRadio
      }
      let foodTable;
      switch (newFood.type_of_food) {
        case "roślina":
            foodTable = this.state.vegeFood;
        break;
        case "mięso":
            foodTable = this.state.meatFood;
        break;
    };
      if (newFood.name_of_food.length > 2) {
        const resAddFood = await axios.post('/addFood', newFood);
        const result = (resAddFood.data.reverse())[0]; 
        if (result.food_id) {
          const newFoodTable = foodTable.push(result);
          this.setState({ newFood: "", alertShow: true, alert: {class: "alert alert-success alert-dismissible", message: `Produkt ${newFood.name_of_food} został dodany do listy produktów ${(newFood.type_of_food = roślina) ? "roślinnych" : "mięsnych"}.`}})
        } else {
          this.setState({ alertShow: true, alert: {class: "alert alert-danger alert-dismissible", message: `Produkt ${newFood.name_of_food} znajduje się już na liście produktów ${(newFood.type_of_food = roślina) ? "roślinnych" : "mięsnych"}ch.`}}) 
        }
      } else {
        this.setState({ alertShow: true, alert: {class: "alert alert-danger alert-dismissible", message: "Nazwa produktu spożywczego musi składać się z co najmniej 3 liter."}})
      }
    };

    render() {
      let food;
      switch (this.state.flexRadio) {
        case "roślina":
            food = this.state.vegeFood;
        break;
        case "mięso":
            food = this.state.meatFood;
        break;
      };

        const alert = this.state.alertShow ?
        <div className="ZooAlert">
        <div id="liveAlertPlaceholder" className={this.state.alert.class} role="alert">{this.state.alert.message}<button type="button" onClick={this.hideAlert} className="btn-close" aria-label="Close"></button></div>
        </div>
      : null

        return (
            <div className="offcanvas offcanvas-top" tabIndex="-1" id="offcanvasFood" aria-labelledby="offcanvasTopLabel">
  <div className="offcanvas-header">
    <h5 className="offcanvas-title" id="offcanvasTopLabel">Dodaj pokarm do bazy</h5>
    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body position-relative">
  {alert}

  <div className="card text-start">
  <div className="card-header">
    Baza produktów spożywczych
  </div>
  <div className="card-body ms-3 me-3">
  <div className="row justify-content-center">
  <div className="col align-items-start border p-0 col-lg-2 col-md-4 ">
<div className="card-body">

<div className="mb-5">
    
  <label className="form-label">Typ produktu</label>

  <div className="form-check">
  <input className="form-check-input" type="radio" defaultChecked name="flexRadioDefault2" id="roślina" onChange={this.handleChangeRadio}/>
  <label className="form-check-label ms-1" htmlFor="roślina">
    Pokarm roślinny
  </label>
</div>
<div className="form-check">
  <input className="form-check-input" type="radio" name="flexRadioDefault2" id="mięso" onChange={this.handleChangeRadio}/>
  <label className="form-check-label ms-1" htmlFor="mięso">
    Pokarm mięsny
  </label>
</div>
</div></div></div>

<div className="col-12 col-lg-4 col-md-8 flex-grow-1 ps-0 pe-0 ps-lg-3 ps-md-3 pt-3 pt-md-0">
<div className="card-body border">











<div>
<label className="form-label">Lista produktów spożywczych</label>
<select className="form-select" multiple aria-label="multiple select example">
    {food.map(food => (<option disabled key={String(food.food_id)} value={food.food_id}>{food.name_of_food}</option>))}
</select>
<label className="form-label mt-2">Wprowadź nowy produkt</label>
  <input type="text" className="form-control" placeholder="Nazwa produktu" value={this.state.newFood} onChange={this.addFoodHandler}/>
  <button className="btn btn-primary btn-sm mt-3" type="button" onClick={this.addFood}>Dodaj do listy</button>
</div>

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
    
export default AddFood;