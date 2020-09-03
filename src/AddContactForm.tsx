import * as React from "react";

export class AddContact extends React.Component {
  public render() {
    return (
      <div>
        <div className={"AddForm"}>
          <div className={"FormComponent"}>
            <p>Nombre</p>
            <input placeholder={"Nombre"} />
          </div>
          <div className={"FormComponent"}>
            <p>Apellido</p>
            <input placeholder={"Apellido"} />
          </div>
          <div className={"FormComponent"}>
            <p>Edad</p>
            <input placeholder={"edad"} type={"number"} />
          </div>
          <div className={"FormComponent"}>
            <p>Documento</p>
            <input placeholder={"Documento"} />
          </div>
          <div className={"FormComponent"}>
            <p>Correo</p>
            <input placeholder={"Correo"} type={"email"} />
          </div>
          <div className={"FormComponent"}>
            <p>Telefono</p>
            <input placeholder={"Telefono"} type={"phone"} />
          </div>
        </div>
        <div className={"AddFormControls"}>
          <div className={"detailsButton noSelectio dangerButton"}>
            Cancelar
          </div>
          <div className={"detailsButton noSelection primaryButton"}>
            Guardar
          </div>
        </div>
      </div>
    );
  }
}
