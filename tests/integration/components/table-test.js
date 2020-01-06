import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render, click } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";

module("Integration | Component | table", function(hooks) {
  setupRenderingTest(hooks);
  test("it renders the default content inside a table", async function(assert) {
    await render(hbs`<Table/>`);

    assert.dom("#select-all").exists();
    assert.dom("#select-all").isNotChecked();
    assert.dom(".selected-count").exists();
    assert.dom(".selected-count").hasText("None Selected");
    assert.dom(".download-button").exists();
    assert.dom(".download-button").hasText("Download Selected");
    assert.dom(".download-button").hasAttribute("disabled");
  });

  test("it renders the table headers", async function(assert) {
    await render(hbs`<Table/>`);
    this.setProperties({
      mockHeaders: ["Heading 1", "Heading 2", "Heading 3"]
    });

    await render(hbs`<Table @headers={{this.mockHeaders}}/>`);
    assert.dom(".heading").exists();
  });

  test("it renders select all as checked when select all is clicked and the download button is no longer disabled", async function(assert) {
    await render(hbs`<Table/>`);
    this.setProperties({
      mockFiles: [
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

    await render(hbs`<Table @model={{this.mockFiles}} />`);
    await click("#select-all");
    assert.dom("#select-all").isChecked();
    assert.dom(".selected-count").hasText("Selected 2");
    assert.dom(".download-button").hasNoAttribute("disabled");
  });

  test("it renders the download button as clickable when files are selected", async function(assert) {
    await render(hbs`<Table/>`);
    this.setProperties({
      mockFiles2: [
        {
          name: "somefilename.exe",
          device: "Device Name",
          path: "\\ThisPath\\somefilename.exe",
          status: "available",
          selected: null
        }
      ]
    });

    await render(hbs`<Table @model={{this.mockFiles2}} />`);
    await click(".row");
    assert.dom(".download-button disabled").doesNotExist();
  });

  test("it renders the details of a file that is available for download inside of attachments", async function(assert) {
    await render(hbs`<Table/>`);

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

    await render(hbs`<Table @model={{this.file}} />`);
    assert.dom(".row").exists();
    assert.dom(".cell").exists();
    assert.dom(".name").hasText("somefilename.exe");
    assert.dom(".device").hasText("Device Name");
    assert.dom(".path").hasText("\\ThisPath\\somefilename.exe");
    assert.dom(".status-icon .green").exists();
    assert.dom(".status").hasText("available");

    await click(".row");
    assert.dom(".selected").exists();
  });

  test("it renders the details of a file that is not available for download inside of attachments", async function(assert) {
    await render(hbs`<Table/>`);

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

    await render(hbs`<Table @model={{this.file}} />`);
    assert.dom(".row").exists();
    assert.dom(".cell").exists();
    assert.dom(".name").hasText("somefilename2.exe");
    assert.dom(".device").hasText("Device Name 2");
    assert.dom(".path").hasText("\\ThisPath\\somefilename2.exe");
    assert.dom(".status-icon .green").doesNotExist();
    assert.dom(".status").hasText("scheduled");

    await click(".row");
    assert.dom(".selected").exists();
  });

  test("it renders the details of a file that is not available for download inside of attachments", async function(assert) {
    await render(hbs`<Table/>`);

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

    await render(hbs`<Table @model={{this.file}} />`);
    assert.dom(".row").exists();
    assert.dom(".cell").exists();
    assert.dom(".name").hasText("somefilename2.exe");
    assert.dom(".device").hasText("Device Name 2");
    assert.dom(".path").hasText("\\ThisPath\\somefilename2.exe");
    assert.dom(".status-icon .green").doesNotExist();
    assert.dom(".status").hasText("scheduled");

    await click(".row");
    assert.dom(".selected").exists();
  });
});
