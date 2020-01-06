import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action, set } from "@ember/object";

export default class AttachmentsComponent extends Component {
  @tracked totalSelected = 0;
  @tracked allSelected = false;
  @tracked disabled = true;

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
    if (this.allSelected) {
      model.map(file => {
        set(file, "selected", false);
      });
      this.totalSelected = 0;
    } else {
      model.map(file => {
        set(file, "selected", true);
      });
      this.totalSelected = model.length;
    }
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
    if (this.totalSelected === model.length) {
      this.allSelected = true;
    } else {
      this.allSelected = false;
    }

    if (this.totalSelected > 0) {
      this.disabled = false;
    } else {
      this.disabled = true;
    }

    if (this.totalSelected === model.length) {
      checkbox.indeterminate = false;
    }
    if (this.totalSelected < model.length) {
      checkbox.indeterminate = true;
    }
    if (this.totalSelected === 0) {
      checkbox.indeterminate = false;
    }
  }
}
