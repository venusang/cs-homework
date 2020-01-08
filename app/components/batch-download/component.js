import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action, set } from "@ember/object";

export default class BatchDownloadComponent extends Component {
  constructor() {
    super(...arguments);
    this.headers = ["", "Name", "Device", "Path", "", "Status"];
  }
  headers = [];

  @tracked totalSelected = 0;

  get model() {
    return this.args.model;
  }

  get modelLength() {
    return this.args.modelLength;
  }

  get allSelected() {
    return this.totalSelected === this.modelLength ? true : false;
  }

  get isDisabled() {
    return this.totalSelected > 0 ? false : true;
  }

  get theTotal() {
    let checkbox = document.getElementById("select-all");
    if (this.totalSelected === this.modelLength) {
      checkbox.indeterminate = false;
      checkbox.checked = true;
      return `Selected ${this.totalSelected}`;
    }

    if (this.totalSelected !== this.modelLength && this.totalSelected > 0) {
      checkbox.indeterminate = true;
      return `Selected ${this.totalSelected}`;
    }

    if (this.totalSelected === 0) {
      checkbox.indeterminate = false;
      checkbox.checked = false;
      return `None Selected`;
    }
    return `None Selected`;
  }

  @action
  selectRow(file) {
    if (file.selected) {
      this.totalSelected = this.totalSelected - 1;
      set(file, "selected", false);
    } else {
      this.totalSelected = this.totalSelected + 1;
      set(file, "selected", true);
    }
  }

  @action
  selectAll() {
    let selectedFiles = this.model.filter(file => file.selected);
    if (selectedFiles.length === this.modelLength) {
      this.totalSelected = 0;
      this.model.map(file => {
        set(file, "selected", false);
      });
    } else {
      this.totalSelected = this.modelLength;
      this.model.map(file => {
        set(file, "selected", true);
      });
    }
  }

  @action
  downloadSelected() {
    let message = "";
    let available = "";
    let unavailable = "";
    let selectedFiles = this.model.filter(file => file.selected);
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
}
