import * as React from "react";
import { ContactItem } from "./Types";

export class ContactDetails extends React.Component<{
  contact: ContactItem;
  onDelete: (_: ContactItem) => void;
}> {
  public render() {
    const item = this.props.contact;

    return (
      <div>
        <div className="itemDetails">
          <div className="section">
            <span className="valueLabel noSelection">Nombre</span>
            <p className="value">{item.name}</p>
            <span className="valueLabel noSelection">Apellido</span>
            <p className="value">{item.lastName}</p>
          </div>
          <div className="section">
            <span className="valueLabel noSelection">Edad</span>
            <p className="value">{item.age}</p>
            <span className="valueLabel noSelection">Telefono</span>
            <p className="value">{item.phoneNumber}</p>
          </div>
          <div className="section">
            <span className="valueLabel noSelection">Documento</span>
            <p className="value">{item.documentIdentifier}</p>
            <span className="valueLabel noSelection">Correo</span>
            <p className="value">{item.email}</p>
          </div>
        </div>
        <div className="detailsControls">
          <p
            className="detailsButton noSelection dangerButton"
            onClick={() => {
              this.props.onDelete(this.props.contact);
            }}
          >
            Eliminar
          </p>
          <p className="detailsButton noSelection primaryButton">Actualizar</p>
        </div>
      </div>
    );
  }
}
