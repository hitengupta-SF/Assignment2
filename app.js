import { Table } from "./table.js";
import data from "./data.json" assert { type: "json" };
import { Datasource } from "./datasource.js";
class App {
  constructor() {
    this.appDiv = document.querySelector(".app");
    this.loadBtn = document.createElement("button");
    this.loadBtn.innerHTML = "LOAD DATA";
    this.loadBtn.classList.add("btn");
    this.appDiv.append(this.loadBtn);
    const userDatasource = new Datasource(data);
    this.table = new Table(userDatasource);
    this.loadBtn.addEventListener("click", () => this.load());
  }
  load() {
    if (this.loadBtn.innerHTML == "Load Data") {
      this.table.render();
      this.loadBtn.innerHTML = "Refresh";
    } else {
      this.table.refresh();
    }
  }
}
new App();
