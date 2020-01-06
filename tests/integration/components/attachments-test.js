import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render, click } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";

module("Integration | Component | attachments", function(hooks) {
  setupRenderingTest(hooks);
  test("it renders the default content inside a list of attachments", async function(assert) {
    await render(hbs`<Attachments/>`);

    assert.dom(".select-all").exists();
    assert.dom("#select-all").exists();
    assert.dom("#select-all").isNotChecked();
    assert.dom(".selected-count").exists();
    assert.dom(".selected-count").hasText("None Selected");
    assert.dom(".download-button").exists();
    assert.dom(".download-button").hasText("Download Selected");
    assert.dom(".download-button").hasAttribute("disabled");
    assert.dom(".heading").exists();
  });

  test("it renders select all as checked when select all is clicked and the download button is no longer disabled", async function(assert) {
    await render(hbs`<Attachments/>`);
    this.setProperties({
      file: [
        {
          name: "somefilename.exe",
          device: "Device Name",
          path: "\\ThisPath\\somefilename.exe",
          status: "available",
          selected: null
        },
        {
          name: "somefilename2.exe",
          device: "Device Name 2",
          path: "\\ThisPath\\somefilename2.exe",
          status: "available",
          selected: null
        }
      ]
    });

    await render(hbs`<Attachments @model={{this.file}} />`);
    await click("#select-all");
    assert.dom("#select-all").isChecked();
    assert.dom(".selected-count").hasText("Selected 2");
    assert.dom(".download-button").hasNoAttribute("disabled");
  });

  test("it renders the download button as clickable when files are selected", async function(assert) {
    await render(hbs`<Attachments/>`);
    this.setProperties({
      file: [
        {
          name: "somefilename.exe",
          device: "Device Name",
          path: "\\ThisPath\\somefilename.exe",
          status: "available",
          selected: null
        }
      ]
    });

    await render(hbs`<Attachments @model={{this.file}} />`);
    await click(".rowWrapper");
    assert.dom(".download-button disabled").doesNotExist();
  });

  test("it renders the details of a file that is available for download inside of attachments", async function(assert) {
    await render(hbs`<Attachments/>`);

    this.setProperties({
      file: [
        {
          name: "somefilename.exe",
          device: "Device Name",
          path: "\\ThisPath\\somefilename.exe",
          status: "available",
          selected: null
        }
      ]
    });

    await render(hbs`<Attachments @model={{this.file}} />`);
    assert.dom(".rowWrapper").exists();
    assert.dom(".row").exists();
    assert.dom(".rowWrapper .name").hasText("somefilename.exe");
    assert.dom(".rowWrapper .device").hasText("Device Name");
    assert.dom(".rowWrapper .path").hasText("\\ThisPath\\somefilename.exe");
    assert.dom(".rowWrapper .status-icon .green").exists();
    assert.dom(".rowWrapper .status").hasText("available");

    await click(".rowWrapper");
    assert.dom(".selected").exists();
  });

  test("it renders the details of a file that is not available for download inside of attachments", async function(assert) {
    await render(hbs`<Attachments/>`);

    this.setProperties({
      file: [
        {
          name: "somefilename2.exe",
          device: "Device Name 2",
          path: "\\ThisPath\\somefilename2.exe",
          status: "scheduled",
          selected: null
        }
      ]
    });

    await render(hbs`<Attachments @model={{this.file}} />`);
    assert.dom(".rowWrapper").exists();
    assert.dom(".row").exists();
    assert.dom(".rowWrapper .name").hasText("somefilename2.exe");
    assert.dom(".rowWrapper .device").hasText("Device Name 2");
    assert.dom(".rowWrapper .path").hasText("\\ThisPath\\somefilename2.exe");
    assert.dom(".rowWrapper .status-icon .green").doesNotExist();
    assert.dom(".rowWrapper .status").hasText("scheduled");

    await click(".rowWrapper");
    assert.dom(".selected").exists();
  });

  test("it renders the details of a file that is not available for download inside of attachments", async function(assert) {
    await render(hbs`<Attachments/>`);

    this.setProperties({
      file: [
        {
          name: "somefilename2.exe",
          device: "Device Name 2",
          path: "\\ThisPath\\somefilename2.exe",
          status: "scheduled",
          selected: null
        }
      ]
    });

    await render(hbs`<Attachments @model={{this.file}} />`);
    assert.dom(".rowWrapper").exists();
    assert.dom(".row").exists();
    assert.dom(".rowWrapper .name").hasText("somefilename2.exe");
    assert.dom(".rowWrapper .device").hasText("Device Name 2");
    assert.dom(".rowWrapper .path").hasText("\\ThisPath\\somefilename2.exe");
    assert.dom(".rowWrapper .status-icon .green").doesNotExist();
    assert.dom(".rowWrapper .status").hasText("scheduled");

    await click(".rowWrapper");
    assert.dom(".selected").exists();
  });
});
