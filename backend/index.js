const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "pass",
  database: "zoodb",
});

app.get('/createdb', (req, res) => {
    let query = "CREATE DATABASE zoodb";
    db.query(query, (err, result) => {
        if(err) throw err;
        res.send('Baza danych stworzona!')
    })
});

app.get('/createtables', (req, res) => {
  let sql1 = 'CREATE TABLE species(species_id INT AUTO_INCREMENT, name_of_species VARCHAR(255) UNIQUE, preferences VARCHAR(255), PRIMARY KEY(species_id))';
  let sql2 = 'CREATE TABLE food(food_id INT AUTO_INCREMENT, name_of_food VARCHAR(255) UNIQUE, type_of_food VARCHAR(255), PRIMARY KEY(food_id))';
  let sql3 = 'CREATE TABLE animals(animal_id INT AUTO_INCREMENT, name_of_animal VARCHAR(255), species_id INT, FOREIGN KEY(species_id) REFERENCES species(species_id), register DATETIME, last_feeding DATETIME, PRIMARY KEY(animal_id))';
  let sql4 = 'CREATE TABLE feeding(feeding_id INT AUTO_INCREMENT, animal_id INT, FOREIGN KEY(animal_id) REFERENCES animals(animal_id), feeding_time DATETIME, PRIMARY KEY(feeding_id))';
  let sql5 = 'CREATE TABLE feedingDetails(feeding_id INT, FOREIGN KEY(feeding_id) REFERENCES feeding(feeding_id), food_id INT, FOREIGN KEY(food_id) REFERENCES food(food_id), portions INT);';
  let sql6 = 'INSERT INTO species(name_of_species, preferences) VALUES ("słoń", "roślinożerny")';
  let sql7 = 'INSERT INTO species(name_of_species, preferences) VALUES ("lis", "wszystkożerny")';
  let sql8 = 'INSERT INTO species(name_of_species, preferences) VALUES ("tygrys", "mięsożerny")';
  let sql9 = 'INSERT INTO animals(name_of_animal, species_id, register) VALUES ("Szymon", 1, NOW())';
  let sql10 = 'INSERT INTO animals(name_of_animal, species_id, register) VALUES ("Lena", 2, NOW())';
  let sql11 = 'INSERT INTO animals(name_of_animal, species_id, register) VALUES ("Tymek", 3, NOW())';
  let sql12 = 'INSERT INTO food(name_of_food, type_of_food) VALUES ("banan", "roślina")';
  let sql13 = 'INSERT INTO food(name_of_food, type_of_food) VALUES ("sałata", "roślina")';
  let sql14 = 'INSERT INTO food(name_of_food, type_of_food) VALUES ("marchew", "roślina")';
  let sql15 = 'INSERT INTO food(name_of_food, type_of_food) VALUES ("drób", "mięso")';
  let sql16 = 'INSERT INTO food(name_of_food, type_of_food) VALUES ("wołowina", "mięso")';
  let sql17 = 'INSERT INTO food(name_of_food, type_of_food) VALUES ("wieprzowina", "mięso")';
  let sql18 = 'INSERT INTO feeding(animal_id, feeding_time) VALUES (2, NOW())';
  let sql19 = 'UPDATE animals SET last_feeding = (SELECT feeding_time FROM feeding WHERE feeding.animal_id = 2 ORDER BY feeding_time DESC LIMIT 1) WHERE animal_id = 2'; 

  db.query(sql1, (err, result) => {
    if(err) throw err;
    db.query(sql2, (err, result) => {
      if(err) throw err;
      db.query(sql3, (err, result) => {
        if(err) throw err;
        db.query(sql4, (err, result) => {
          if(err) throw err;
          db.query(sql5, (err, result) => {
            if(err) throw err;
            db.query(sql6, (err, result) => {
              if(err) throw err;
              db.query(sql7, (err, result) => {
                if(err) throw err;
              db.query(sql8, (err, result) => {
                if(err) throw err;
                db.query(sql9, (err, result) => {
                  if(err) throw err;
                  db.query(sql10, (err, result) => {
                    if(err) throw err;
                    db.query(sql11, (err, result) => {
                      if(err) throw err;
                      db.query(sql12, (err, result) => {
                        if(err) throw err;
                        db.query(sql13, (err, result) => {
                          if(err) throw err;
                          db.query(sql14, (err, result) => {
                            if(err) throw err;
                            db.query(sql15, (err, result) => {
                              if(err) throw err;
                              db.query(sql16, (err, result) => {
                                if(err) throw err;
                                db.query(sql17, (err, result) => {
                                  if(err) throw err;
                                  db.query(sql18, (err, result) => {
                                    if(err) throw err;
                                    db.query(sql19, (err, result) => {
                                      if(err) throw err;
                                      res.send('Baza danych stworzona!');
                                      });
                                    });
                                  });
                                });
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });

});

app.get("/animalsTable", (req, res) => {
  db.query("SELECT animals.animal_id AS animal_id, name_of_species, name_of_animal, register, last_feeding FROM species, animals WHERE species.species_id = animals.species_id AND preferences = ?", [req.query.preferencies], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/speciesTable", (req, res) => {
  db.query("SELECT * FROM species WHERE species.preferences = ? ORDER BY name_of_species DESC", [req.query.preferencies], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/foodTable", (req, res) => {
  db.query("SELECT * FROM food WHERE food.type_of_food = ? ORDER BY name_of_food DESC", [req.query.type_of_food], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/addSpecie", (req, res) => {
  const name_of_species = req.body.name_of_species;
  const preferences = req.body.preferences;
  //preferences musi byc liczba 1-3

  db.query("SELECT name_of_species, preferences FROM species WHERE name_of_species = ?", [name_of_species], (err, result) => {
    if (err) {
      console.log(err);
    } else {
        let resJSON = JSON.stringify(result);
          if (resJSON.length > 2) {
            console.log("istnieje");
            return res.send(result);
          } else {
            db.query("INSERT INTO species(name_of_species, preferences) VALUES (?, ?)", [name_of_species, preferences], (err, result) => {
              if (err) {
                console.log(err);
              } else {
                db.query("SELECT species_id, name_of_species, preferences FROM species WHERE name_of_species = ?", [name_of_species], (err, result) => {
                  if (err) {
                    console.log(err);
                  } else {
                    return res.send(result);
                  }
                });
              }
            });
          };
      }
  });
});

app.post("/addAnimal", (req, res) => {
  const name_of_animal = req.body.name_of_animal;
  const species_id = req.body.species_id;
  console.log(name_of_animal, species_id)
  db.query("SELECT name_of_animal, name_of_species FROM animals, species WHERE name_of_animal = ? AND animals.species_id = ? AND species.species_id = animals.species_id", [name_of_animal, species_id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
        let resJSON = JSON.stringify(result);
          if (resJSON.length > 2) {
            console.log("istnieje");
            return res.send(result);
          } else {
            db.query("INSERT INTO animals(name_of_animal, species_id, register) VALUES (?, ?, NOW());", [name_of_animal, species_id], (err, result) => {
              if (err) {
                console.log(err);
              } else {
                db.query("SELECT animals.animal_id AS animal_id, name_of_species, name_of_animal, register, last_feeding FROM species, animals WHERE species.species_id = animals.species_id AND name_of_animal = ? AND animals.species_id = ?", [name_of_animal, species_id], (err, result) => {
                  if (err) {
                    console.log(err);
                  } else {
                    return res.send(result);
                  }
                });
              }
            });
          };
      }
  });
});

app.post("/addFood", (req, res) => {
  const name_of_food = req.body.name_of_food;
  const type_of_food = req.body.type_of_food;

  db.query("SELECT name_of_food, type_of_food FROM food WHERE name_of_food = ?", [name_of_food], (err, result) => {
    if (err) {
      console.log(err);
    } else {
        let resJSON = JSON.stringify(result);
          if (resJSON.length > 2) {
            console.log("istnieje");
            return res.send(result);
          } else {
            db.query("INSERT INTO food(name_of_food, type_of_food) VALUES (?, ?)", [name_of_food, type_of_food], (err, result) => {
              if (err) {
                console.log(err);
              } else {
                db.query("SELECT food_id, name_of_food, type_of_food FROM food WHERE name_of_food = ?", [name_of_food], (err, result) => {
                  if (err) {
                    console.log(err);
                  } else {
                    return res.send(result);
                  }
                });
              }
            });
          };
      }
  });
});

app.get("/fetchEditAnimal", (req, res) => {
  db.query("SELECT animal_id, name_of_animal, animals.species_id AS species_id, name_of_species, preferences FROM animals, species WHERE animal_id = ? AND animals.species_id = species.species_id;", [req.query.animal_id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/editAnimalName", (req, res) => {
  const name_of_animal = req.body.name_of_animal;
  const animal_id = req.body.animal_id;
  const species_id = req.body.species_id;
  db.query("SELECT name_of_animal, animals.species_id, name_of_species FROM animals, species WHERE name_of_animal = ? AND animals.species_id = ? AND animals.species_id = species.species_id", [name_of_animal, species_id], (err, result) => {

    if (err) {
      console.log(err);
    } else {
        let resJSON = JSON.stringify(result);
        console.log(resJSON);
          if (resJSON.length > 2) {
            console.log("istnieje");
            return res.send(result);
          } else {
            db.query("UPDATE animals SET name_of_animal = ? WHERE animals.animal_id = ?", [name_of_animal, animal_id], (err, result) => {
              if (err) {
                console.log(err);
              } else {
                db.query("SELECT animals.animal_id AS animal_id, name_of_species, name_of_animal FROM species, animals WHERE species.species_id = animals.species_id AND name_of_animal = ? AND animals.species_id = ?", [name_of_animal, species_id], (err, result) => {
                  if (err) {
                    console.log(err);
                  } else {
                    return res.send(result);
                  }
                });
              }
            });
          };
      }
  });
});

app.put("/editAnimalSpecie", (req, res) => {
  const animal_id = req.body.animal_id;
  const species_id = req.body.species_id;
  console.log(animal_id)
  console.log(species_id)
            db.query("UPDATE animals SET species_id = ? WHERE animal_id = ?", [species_id, animal_id], (err, result) => {
              if (err) {
                console.log(err);
              } else {
                db.query("SELECT animals.animal_id AS animal_id, animals.species_id AS species_id, name_of_species, name_of_animal, preferences FROM species, animals WHERE species.species_id = animals.species_id AND animals.animal_id = ?", [animal_id], (err, result) => {
                  if (err) {
                    console.log(err);
                  } else {
                    return res.send(result);
                  }
                });
              }
            });
});

app.post("/addFeeding", (req, res) => {
  const animal_id = req.body.animal_id;
  const basket = req.body.basket;
  console.log(basket);
  const date = new Date();

  db.query("INSERT INTO feeding(animal_id, feeding_time) VALUES (?, ?)", [animal_id, date], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      db.query("UPDATE animals SET last_feeding = ? WHERE animals.animal_id = ?", [date, animal_id], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          db.query("SELECT feeding_id FROM feeding WHERE animal_id = ? ORDER BY feeding_time DESC LIMIT 1", [animal_id], (err, result) => {
            if (err) {
              console.log(err);
            } else {
              let resJSON = JSON.stringify(result[0].feeding_id);
               for (let object of basket) {
                console.log(resJSON);
                db.query("INSERT INTO feedingDetails(feeding_id, food_id, portions) VALUES (?, ?, ?);", [resJSON, object.food_id, object.portions], (err, result) => {
                  if (err) {
                    console.log(err);
                  }
                })
              };  
                return res.send(result);
            }
          });
        }
      });
    }
  });
});

app.get("/fetchFeedingHistory", async (req, res) => {
  db.query("SELECT feeding_id, feeding_time FROM feeding WHERE animal_id = ? ORDER BY feeding_time DESC", [req.query.animal_id], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        return res.send(result);
    }
  });
});

app.get("/fetchFeedingProducts", async (req, res) => {
  db.query("SELECT feedingDetails.feeding_id, food.food_id, name_of_food, portions FROM feedingDetails, food WHERE feeding_id = ? AND feedingDetails.food_id = food.food_id", [req.query.feeding_id], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result)
        return res.send(result);
    }
  });
});

app.get("/fetchFeedingDiagram", async (req, res) => {
  db.query("SELECT food.food_id, name_of_food, SUM(portions) AS portions FROM feedingDetails, feeding, food WHERE feeding.animal_id = ? AND feeding.feeding_id = feedingDetails.feeding_id AND feedingDetails.food_id = food.food_id GROUP BY food.food_id ORDER BY portions DESC", [req.query.animal_id], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        return res.send(result);
    }
  });
});

app.delete("/deleteAnimalHistory", async (req, res) => {
  db.query("SELECT feeding_id FROM feeding WHERE feeding.animal_id = ?", [req.query.animal_id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      let details = Object.values(JSON.parse(JSON.stringify(result)));
      console.log(details.length)
      for (let object of details) {
        db.query("DELETE FROM feedingDetails WHERE feeding_id = ?", [object.feeding_id], (err, result) => {
          if (err) {
            console.log(err);
          } else {
            db.query("DELETE FROM feeding WHERE feeding_id = ?", [object.feeding_id], (err, result) => {
              if (err) {
                console.log(err);
              }
            });
          }
        });
      }
      return res.send(req.query.animal_id);
    }
  });
});

app.delete("/deleteAnimal", async (req, res) => {
  db.query("DELETE FROM animals WHERE animal_id = ?", [req.query.animal_id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      return res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Serwer dziala na porcie 3001");
});