import React from 'react';
import EditAnimal from '../EditAnimal/EditAnimal';
import FeedAnimal from '../FeedAnimal/FeedAnimal';
import DeleteAnimal from '../DeleteAnimal/DeleteAnimal';


class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };   
    }
    
    handler() {
        this.fetchAnimals();
        this.fetchAnimals();
    }
    
    
    render() {
        let modalContent;
        let modalTitle;
        

        switch (this.props.modalMode) {
            case "editAnimal":
                modalContent = <EditAnimal animal_id={this.props.animal_id} handler={this.handler}/>;
                modalTitle = "Edycja zwierzęcia"
            break;
            case "feedAnimal":
                modalContent = <FeedAnimal animal_id={this.props.animal_id}/>;
                modalTitle = "Karmienie zwierzęcia"
            break;
            case "deleteAnimal":
                modalContent = <DeleteAnimal animal_id={this.props.animal_id} handler={this.handler}/>;
                modalTitle = "Usunięcie zwierzęcia"
            break;
        };
        return (
            <>
                <div>
                <div className="modal fade modal-dialog-scrollable" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="false">
                    <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">{modalTitle}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={this.props.handler}></button>
                        </div>
                        <div className="modal-body">
                        {modalContent}
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </>
        );
    }
}

export default Modal;