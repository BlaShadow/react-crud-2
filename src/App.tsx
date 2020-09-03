import * as React from "react";
import "./styles.css";

import { ContactItem, PageSection } from "./Types";
import { ContactList } from "./ContactList";
import { ContactDetails } from "./ContactDetails";
import { AppHeader } from "./AppHeader";
import { randomItem, StorageHandler } from "./StorageHandler";

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
            <ContactDetails
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
