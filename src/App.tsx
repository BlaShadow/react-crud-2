import * as React from "react";
import "./styles.css";

import { ContactItem, PageSection } from "./Types";
import { ContactList } from "./ContactList";
import { ContactDetails } from "./ContactDetails";
import { AppHeader } from "./AppHeader";
import { randomItem, StorageHandler } from "./StorageHandler";
import { AddContact } from "./AddContactForm";

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
      pageSection: "ADD",
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
            this.setState({ pageSection: "ADD" });
          }}
          clear={() => {
            StorageHandler.clearData().then((items) => {
              this.setState({ contacts: items });
            });
          }}
        />

        <div className="contentContainer">
          {shouldAddItem && (
            <AddContact
              contact={this.state.selectedItem}
              onSave={(item: ContactItem) => {
                StorageHandler.saveItem(item).then((items) => {
                  this.setState({ contacts: items, pageSection: "LIST" });
                });
              }}
              onCancel={() => {
                this.setState({ pageSection: "LIST" });
              }}
            />
          )}
          {shouldViewItem && (
            <ContactDetails
              onUpdate={() => {
                this.setState({ pageSection: "ADD" });
              }}
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
