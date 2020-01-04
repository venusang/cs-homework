import Route from "@ember/routing/route";

export default class AttachmentsRoute extends Route {
  model() {
    return [
      {
        name: "smss.exe",
        device: "Stark",
        path: "\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe",
        status: "scheduled",
        selected: null
      },
      {
        name: "netsh.exe",
        device: "Targaryen",
        path: "\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe",
        status: "available",
        selected: null
      },
      {
        name: "uxtheme.dll",
        device: "Lanniester",
        path: "\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll",
        status: "available",
        selected: null
      },
      {
        name: "cryptbase.dll",
        device: "Martell",
        path: "\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll",
        status: "scheduled",
        selected: null
      },
      {
        name: "7za.exe",
        device: "Baratheon",
        path: "\\Device\\HarddiskVolume1\\temp\\7za.exe",
        status: "scheduled",
        selected: null
      }
    ];
  }
}
