import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action, set } from "@ember/object";

export default class AttachmentsComponent extends Component {
  @tracked totalSelected = 0;
  @tracked allSelected = false;
  @tracked disabled = true;

  @action
  selectRow(file) {
    let checkbox = document.getElementById("select-all");
    if (file.selected) {
      this.totalSelected = this.totalSelected - 1;
      set(file, "selected", false);
      if (this.totalSelected === 0) {
        this.disabled = true;
        this.allSelected = false;
        checkbox.indeterminate = false;
      } else {
        checkbox.indeterminate = true;
      }
    } else {
      this.disabled = false;
      this.totalSelected = this.totalSelected + 1;
      set(file, "selected", true);
      checkbox.indeterminate = true;
    }
  }
  @action
  selectAll(model) {
    if (this.allSelected) {
      model.map(file => {
        set(file, "selected", false);
      });
      this.disabled = true;
      this.allSelected = false;
      this.totalSelected = 0;
    } else {
      model.map(file => {
        set(file, "selected", true);
      });
      this.disabled = false;
      this.allSelected = true;
      this.totalSelected = model.length;
    }
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
}
