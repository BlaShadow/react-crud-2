import * as React from "react";
import { ContactItem } from "./Types";

interface AddContactState {
  name: string;
  lastName: string;
  age: number;
  document: string;
  phone: string;
  email: string;
}

export class AddContact extends React.Component<
  {
    onCancel: () => void;
    onSave: (_: ContactItem) => void;
  },
  AddContactState
> {
  constructor(props: any) {
    super(props);

    this.state = {
      name: "",
      lastName: "",
      age: 0,
      document: "",
      phone: "",
      email: ""
    };
  }
  public render() {
    return (
      <div>
        <div className={"AddForm"}>
          <div className={"FormComponent"}>
            <p>Nombre</p>
            <input
              placeholder={"Nombre"}
              value={this.state.name}
              onChange={this.onChange((value: any) => {
                this.setState({ name: value });
              })}
            />
          </div>
          <div className={"FormComponent"}>
            <p>Apellido</p>
            <input
              placeholder={"Apellido"}
              value={this.state.lastName}
              onChange={this.onChange((value: any) => {
                this.setState({ lastName: value });
              })}
            />
          </div>
          <div className={"FormComponent"}>
            <p>Edad</p>
            <input
              placeholder={"edad"}
              type={"number"}
              value={this.state.age}
              onChange={this.onChange((value: any) => {
                this.setState({ age: Number(value) });
              })}
            />
          </div>
          <div className={"FormComponent"}>
            <p>Documento</p>
            <input
              placeholder={"Documento"}
              value={this.state.document}
              onChange={this.onChange((value: any) => {
                this.setState({ document: value });
              })}
            />
          </div>
          <div className={"FormComponent"}>
            <p>Correo</p>
            <input
              placeholder={"Correo"}
              type={"email"}
              value={this.state.email}
              onChange={this.onChange((value: any) => {
                this.setState({ email: value });
              })}
            />
          </div>
          <div className={"FormComponent"}>
            <p>Telefono</p>
            <input
              placeholder={"Telefono"}
              type={"phone"}
              value={this.state.phone}
              onChange={this.onChange((value: any) => {
                this.setState({ phone: value });
              })}
            />
          </div>
        </div>
        <div className={"AddFormControls"}>
          <div
            onClick={this.props.onCancel}
            className={"detailsButton noSelectio dangerButton"}
          >
            Cancelar
          </div>
          <div
            onClick={this.save}
            className={"detailsButton noSelection primaryButton"}
          >
            Guardar
          </div>
        </div>
      </div>
    );
  }

  private onChange = (complete: (_: any) => void) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;

    complete(value);
  };

  private save = () => {
    const item: ContactItem = {
      name: this.state.name,
      lastName: this.state.lastName,
      age: this.state.age,
      phoneNumber: this.state.phone,
      jobPosition: "",
      documentIdentifier: this.state.document,
      email: this.state.email,
      homeAddress: ""
    };

    this.props.onSave(item);
  };
}
