import * as React from "react";
import localforage from "localforage";
import "./styles.css";

interface ContactItem {
  name: string;
  lastName: string;
  age: number;
  phoneNumber: string;
  jobPosition: string;
  documentIdentifier: string;
  email: string;
  homeAddress: string;
}

type PageSection = "LIST" | "ADD" | "VIEW";

interface AppState {
  contacts: ContactItem[];
  pageSection: PageSection;
  selectedItem?: ContactItem;
}

export default class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      contacts: [],
      pageSection: "VIEW",
      selectedItem: randomItem()
    };
  }

  componentDidMount() {
    StorageHandler.contactItems()
      .then((items) => {
        this.setState({ contacts: items });
      })
      .catch((error) => {
        console.log("Error loading items");
      });
  }

  public render() {
    const shouldViewItem =
      this.state.pageSection === "VIEW" &&
      this.state.selectedItem !== undefined;
    const shouldAddItem = this.state.pageSection === "ADD";
    const shouldListItem = this.state.pageSection === "LIST";

    return (
      <div className="App">
        <AppHeader
          list={() => {
            this.setState({ pageSection: "LIST" });
          }}
          add={() => {
            console.log("Create item");

            StorageHandler.saveItem(randomItem()).then((items) => {
              this.setState({ contacts: items });
            });
          }}
          clear={() => {
            console.log("Clear data");

            StorageHandler.clearData().then((items) => {
              this.setState({ contacts: items });
            });
          }}
        />

        <div className="contentContainer">
          {shouldViewItem && (
            <ItemDetails
              contact={this.state.selectedItem as ContactItem}
              onDelete={this.deleteContact}
            />
          )}

          {shouldListItem && (
            <ContactList
              items={this.state.contacts}
              onItemClick={this.onContactClick}
            />
          )}
        </div>
      </div>
    );
  }

  public onContactClick = (item: ContactItem) => {
    this.setState({ selectedItem: item, pageSection: "VIEW" });
  };

  public deleteContact = (item: ContactItem) => {
    StorageHandler.deleteContact(item).then((items) => {
      this.setState({ pageSection: "LIST", contacts: items });
    });
  };
}

class ItemDetails extends React.Component<{
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

const randomItem = (): ContactItem => {
  const randomValue = Math.round(Math.random() * 1000);
  const value = `000${randomValue}`;
  const documentIdentifier = `${value.substr(value.length - 3)}12345678`;

  return {
    name: `Luis ${randomValue}`,
    lastName: `Perez ${randomValue}`,
    age: randomValue,
    phoneNumber: "8092201111",
    jobPosition: `Reportero ${randomValue}`,
    documentIdentifier: documentIdentifier,
    email: `mail${randomValue}@mail.com`,
    homeAddress: `Calle primero #${randomValue} Santo domingo`
  };
};

class AppHeader extends React.Component<{
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

class ContactList extends React.Component<{
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

class StorageHandler {
  static listContactKey: string = "CONCATS";

  static saveItem(newItem: ContactItem): Promise<ContactItem[]> {
    return this.contactItems()
      .then((oldItems: ContactItem[]) => {
        const values = [newItem, ...oldItems];
        const jsonValue = JSON.stringify(values);

        return localforage.setItem(this.listContactKey, jsonValue);
      })
      .then(() => {
        return this.contactItems();
      });
  }

  static deleteContact(selected: ContactItem): Promise<ContactItem[]> {
    return this.contactItems().then((items: ContactItem[]) => {
      console.log("Total 1 " + items.length);
      const result = items.filter(
        (item) => item.documentIdentifier !== selected.documentIdentifier
      );
      console.log("Total 2 " + result.length);

      return this.clearData(result);
    });
  }

  static clearData(items: ContactItem[] = []): Promise<ContactItem[]> {
    return localforage
      .setItem(this.listContactKey, JSON.stringify(items))
      .then(() => {
        return this.contactItems();
      });
  }

  static contactItems(): Promise<ContactItem[]> {
    return localforage.getItem(this.listContactKey).then((oldValue) => {
      if (oldValue === undefined || oldValue === null) {
        return [];
      }

      return JSON.parse(String(oldValue));
    });
  }
}
