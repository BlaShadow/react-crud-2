import * as React from "react";

export class AppHeader extends React.Component<{
  clear: () => void;
  add: () => void;
  list: () => void;
}> {
  public render() {
    return (
      <div>
        <p className="title noSelection">Manejo de contactos</p>
        <p className="subTitle noSelection">Administra tus contactos</p>

        <div className="controls">
          <div className="optionButton noSelection" onClick={this.props.list}>
            Listar
          </div>
          <div className="optionButton noSelection" onClick={this.props.add}>
            Agregar
          </div>

          <div className="optionButton noSelection" onClick={this.props.clear}>
            Limpiar
          </div>
        </div>
      </div>
    );
  }
}
