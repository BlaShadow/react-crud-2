import * as React from "react";
import { ContactItem } from "./Types";

export class ContactList extends React.Component<{
  items: ContactItem[];
  onItemClick: (_: ContactItem) => void;
}> {
  public render() {
    console.log("Render list", this.props.items);

    const items: ContactItem[] = this.props.items || [];

    return (
      <div className="itemContainer">
        {items.map((item: ContactItem, index: number) => {
          return (
            <div
              className="itemRow"
              key={index}
              onClick={() => {
                this.props.onItemClick(item);
              }}
            >
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
            </div>
          );
        })}
      </div>
    );
  }
}
