import { User } from "./User.js";

export class Datasource {
  items = [];
  constructor(data) {
    this.loadData(data);
  }

  loadData(data) {
    data.forEach((entity) => {
      this.items.push(
        new User(
          entity.ID,
          entity["First Name"],
          entity["Middle Name"],
          entity["Last Name"],
          entity.Email,
          entity.Phone,
          entity.Role,
          entity.Address
        )
      );
    });
  }

  create(entity) {
    this.items.push(entity);
  }

  read(index) {
    return this.items[index];
  }

  readAll() {
    return this.items;
  }

  update(index, entity) {
    this.items[index] = entity;
  }

  delete(index) {
    this.items.splice(index, 1);
  }
}
