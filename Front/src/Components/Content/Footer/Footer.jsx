import React, {useState, useEffect} from 'react';

function Footer(props) {

  const [content, setContent] = useState('');

const handleTask = () => {
    setContent("tasks");
}

const handleRelations = () => {
  setContent("relations");
}


  return (


<footer class="bg-light text-center d-flex flex-wrap align-items-center border-top">
<div class="modal fade relationship-modal" id="staticBackdropFooter" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropFooter" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">
          {content == "tasks" ? "Treść zadania" : null}
          {content == "relations" ? "Schemat relacji w bazie danych" : null}
        </h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      {content == "tasks" ? <p className='text-start'>

    <ul>Zaprojektuj system klas wirtualnego ZOO, który spełnia następujące wymagania:
    <li className='mt-3'>Każde zwierze w ZOO ma swoje imię.</li>
    <li>Zwierzęta powinny móc być umieszczone w ZOO (dla uproszczenia zakładamy, że zwierzęta nie zjedzą się nawzajem i nie muszą przebywać w różnych boksach).</li>
    <li>Zwierzęta dzielą się na mięsożerne, roślinożerne, wszystkożerne. Dlatego powinny one przyjmować różne typy posiłów. Zwierzęta mięsożerne powinny przyjmować posiłki mięsne,
    zwierzęta roślinożerne posiłki roślinne, a zwierzęta wszystkożerne powinny przyjmować oba typy posiłków.</li>
    <li>System klas powinien obejmować następujące gatunki: tygrys, słoń, lis.</li>
    </ul>
      </p> : null}
      {content == "relations" ? <img class="img-fluid" alt="relationship" src={process.env.PUBLIC_URL+"/relations.png"} /> : null}
      </div>
    </div>
  </div>
</div>




    <div class="footer-site col-12 d-flex align-items-center">

    <div className='col-12 mt-3'>
      <span class="text-muted">Copyright © 2022</span>
      <div>
      <span>All Rights Reserver by <a className="copyright" href="#">Jakub Ciszek</a></span>
      </div>

      <div class="col-12 mt-1 a">
      <button type="button" className="btn btn-primary btn-sm m-2" data-bs-toggle="modal" data-bs-target="#staticBackdropFooter" onClick={handleTask}>Treść zadania</button>
      <button type="button" className="btn btn-primary btn-sm m-2" data-bs-toggle="modal" data-bs-target="#staticBackdropFooter" onClick={handleRelations}>Schemat relacji</button>
      </div>


    </div>
    </div>
  </footer>
  );
}

export default Footer;