import localforage from "localforage";
import { ContactItem } from "./Types";

export const randomItem = (): ContactItem => {
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

export class StorageHandler {
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
