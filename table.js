import headerData from "./headerMetaData.json" assert { type: "json" };
import data from "./data.json" assert { type: "json" };
export class Table {
  constructor(datasource) {
    this.datasource = datasource;
    this.col = [];
    this.tableContainer = document.createElement("table");
    this.mainApp = document.querySelector(".app");
    this.mainApp.append(this.tableContainer);
  }

  render() {
    let tableEle = document.createElement("table");
    let tr = tableEle.insertRow(-1);

    headerData.forEach((item, index) => {
      let th = tr.insertCell(index);
      th.innerHTML = item.id;
    });

    data.forEach((item, index) => {
      tr = document.createElement("tr");
      tr.classList.add("tr");
      tableEle.append(tr);
      tr.setAttribute("contenteditable", "false");

      headerData.forEach((key) => {
        const value = item[key.name];
        var td = tr.insertCell(-1);
        td.innerHTML = value;
        tr.appendChild(td);
      });
      let editBtn = document.createElement("button");
      editBtn.innerHTML = "Edit";
      editBtn.addEventListener("click", (e) => this.update(e));
      editBtn.classList.add("edit");
      let deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = "Delete";
      deleteBtn.addEventListener("click", (e) => this.delete(e));
      deleteBtn.classList.add("dlt");
      var cancelBtn = document.createElement("button");
      cancelBtn.innerHTML = "Cancel";
      cancelBtn.addEventListener("click", (e) => this.cancel(e));
      cancelBtn.classList.add("cancel");
      //  cancelBtn.style.display="none";
      tr.append(editBtn);
      tr.append(deleteBtn);
      tr.append(cancelBtn);
    });

    this.tableContainer.innerHTML = "";
    this.tableContainer.append(tableEle);
  }
  read() {}
  update(e) {
    let targetBtn = e.target;
    let tr = targetBtn.parentElement;
    let nextSibling = targetBtn.nextElementSibling;
    let cancelBtn = document.querySelector(".cancel");

    if (targetBtn.innerHTML === "Edit") {
      tr.contentEditable = "true";
      targetBtn.innerHTML = "Save";
      cancelBtn.style.display = "block";
      //nextSibling.innerHTML = "Cancel";
      targetBtn.contentEditable = "false";
      nextSibling.contentEditable = "false";
    } else {
      tr.contentEditable = "false";
      targetBtn.innerHTML = "Edit";
      cancelBtn.style.display = "none";
    }
  }
  delete(e) {
    let targetBtn = e.target;
    let tr = targetBtn.parentElement;

    tr.remove();
  }
  cancel(e) {
    this.render();
  }
  refresh() {
    this.datasource = [];
    this.render();
  }
}
