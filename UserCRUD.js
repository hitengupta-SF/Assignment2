import { User } from "./User.js";
import data from "./data.json" assert { type: "json" };
export class UserCRUD {
  constructor() {
    this.users = [];
    this.col = [];
    this.tableContainer = document.querySelector(".table");
    this.initializeCol();
  }
  //we will make first row and assign each col a value
  initializeCol() {
    for (let value in data[0]) {
      this.col.push(value);
    }
  }
  addData() {
    data.forEach((ob) => {
      this.users.push(
        new User(
          ob.ID,
          ob["First Name"],
          ob["Middle Name"],
          ob["Last Name"],
          ob.Email,
          ob.Phone,
          ob.Role,
          ob.Address
        )
      );
    });
  }
  create() {
    this.addData();
    this.createTable();
  }
  createTable() {
    let tableEle = document.createElement("table");
    let tr = tableEle.insertRow(-1);
    for (let i = 0; i < this.col.length; i++) {
      let th = tr.insertCell(i);
      th.innerHTML = this.col[i];
    }
    for (let i = 0; i < this.users.length; i++) {
      tr = document.createElement("tr");
      tr.classList.add("tr");
      let editBtn = document.createElement("button");
      editBtn.innerHTML = "Edit";
      editBtn.addEventListener("click", (e) => this.update(e));
      editBtn.classList.add("edit");
      let deleteBtn = document.createElement("button");
      deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = "Delete";
      deleteBtn.addEventListener("click", (e) => this.delete(e));
      deleteBtn.classList.add("dlt");
      tr.innerHTML = `<td>${this.users[i].id}</td>
            <td>${this.users[i].firstName}</td>
            <td>${this.users[i].middleName}</td>
            <td>${this.users[i].lastName}</td>
            <td>${this.users[i].email}</td>
            <td>${this.users[i].phone_no}</td>
            <td class="role" >${this.users[i].role}</td>
            <td>${this.users[i].address}</td>
                            `;
      tr.append(editBtn);
      tr.append(deleteBtn);
      tableEle.append(tr);
    }
    this.tableContainer.innerHTML = "";
    this.tableContainer.append(tableEle);
  }
  read() {}
  update(e) {
      let roleEle=document.querySelector(".role");
      roleEle.contentEditable="false";
    let targetBtn = e.target;
    let tr = targetBtn.parentElement;
    let nextSibling = targetBtn.nextElementSibling;
    let index = tr.rowIndex;
    if (targetBtn.innerHTML === "Edit") {
      tr.contentEditable = "true";
      targetBtn.innerHTML = "Save";
      nextSibling.innerHTML = "Cancel";
      targetBtn.contentEditable = "false";
      nextSibling.contentEditable = "false";
    } else {
      tr.contentEditable = "false";
      targetBtn.innerHTML = "Edit";
      nextSibling.innerHTML = "Delete";
//       this.users[index - 1].id = tr.childNodes[0].textContent;
//       this.users[index - 1].firstName = tr.childNodes[2].textContent;
//       this.users[index - 1].middleName = tr.childNodes[4].textContent;
//       this.users[index - 1].lastName = tr.childNodes[6].textContent;
//       this.users[index - 1].email = tr.childNodes[8].textContent;
//       this.users[index - 1].phone_no = tr.childNodes[12].textContent;
//       this.users[index - 1].address = tr.childNodes[14].textContent;
    }
  }
  delete(e) {
    let targetBtn = e.target;
    let tr = targetBtn.parentElement;
    if (targetBtn.innerHTML === "Delete") {
      tr.remove();
    } else {
      tr.contentEditable = "false";
      targetBtn.innerHTML = "Delete";
      let prevSibling = targetBtn.previousElementSibling;
      prevSibling.innerHTML = "Edit";
      this.createTable();
    }
  }
  refresh() {
    this.users = [];
    this.create();
  }
}
