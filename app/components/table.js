import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action, set } from "@ember/object";

export default class TableComponent extends Component {
  constructor() {
    super(...arguments);
    this.headers = ["", "Name", "Device", "Path", "", "Status"];
  }
  headers = [];
  @tracked totalSelected = 0;
  @tracked allSelected = false;
  @tracked isDisabled = true;

  @action
  selectRow(model, file) {
    if (file.selected) {
      this.totalSelected = this.totalSelected - 1;
      set(file, "selected", false);
    } else {
      this.totalSelected = this.totalSelected + 1;
      set(file, "selected", true);
    }
    this.selectAllStatus(model);
  }

  @action
  selectAll(model) {
    model.map(file => {
      if (this.allSelected) {
        set(file, "selected", false);
        this.totalSelected = 0;
      } else {
        set(file, "selected", true);
        this.totalSelected = model.length;
      }
    });

    this.selectAllStatus(model);
  }

  @action
  downloadSelected(model) {
    let message = "";
    let available = "";
    let unavailable = "";
    let selectedFiles = model.filter(file => file.selected);
    selectedFiles.map(file => {
      if (file.selected && file.status === "available") {
        available += `path:\t\t\t${file.path}\ndevice:\t\t\t${file.device}\n\n`;
      } else {
        unavailable += `path:\t\t\t${file.path}\ndevice:\t\t\t${file.device}\n\n`;
      }
    });
    if (available === "") {
      available = "No files to list\n\n";
    }
    if (unavailable === "") {
      available = "No files to list\n\n";
    }
    message += `You have selected ${selectedFiles.length} files to download.\n`;
    message += `Unfortunately, some of them may not be available for download at this time.\n\n`;
    message += `FILES READY FOR DOWNLOAD:\n${available}`;
    message += `FILES CURRENTLY UNAVAILABLE FOR DOWNLOAD:\n${unavailable}`;
    alert(message);
  }

  selectAllStatus(model) {
    let checkbox = document.getElementById("select-all");

    if (this.totalSelected > 0) {
      this.isDisabled = false;
    } else {
      this.isDisabled = true;
    }

    if (this.totalSelected === model.length) {
      this.allSelected = true;
      checkbox.indeterminate = false;
    }
    if (this.totalSelected < model.length) {
      this.allSelected = false;
      checkbox.indeterminate = true;
    }
    if (this.totalSelected === 0) {
      this.allSelected = false;
      checkbox.indeterminate = false;
    }
  }
}
