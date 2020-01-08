import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render, click } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";

module("Integration | Component | batch-download", function(hooks) {
  setupRenderingTest(hooks);
  test("it renders the default content inside the Batch Download", async function(assert) {
    await render(hbs`<BatchDownload/>`);
    this.setProperties({
      mockFiles: [
        {
          name: "somefilename.exe",
          device: "Device Name",
          path: "\\ThisPath\\somefilename.exe",
          status: "available"
        },
        {
          name: "somefilename2.exe",
          device: "Device Name 2",
          path: "\\ThisPath\\somefilename2.exe",
          status: "available"
        }
      ]
    });

    await render(hbs`<BatchDownload @model={{this.mockFiles}} />`);

    assert.dom("#select-all").exists();
    assert.dom("#select-all").isNotChecked();
    assert.dom(".selected-count").exists();
    assert.dom(".selected-count").hasText("None Selected");
    assert.dom(".download-button").exists();
    assert.dom(".download-button").hasText("Download Selected");
    assert.dom(".download-button").hasAttribute("disabled");
    assert.dom(".heading").exists();
  });

  test("it renders select all as checked when select all is clicked", async function(assert) {
    await render(hbs`<BatchDownload/>`);
    this.setProperties({
      mockFiles: [
        {
          name: "somefilename.exe",
          device: "Device Name",
          path: "\\ThisPath\\somefilename.exe",
          status: "available",
          selected: true
        },
        {
          name: "somefilename2.exe",
          device: "Device Name 2",
          path: "\\ThisPath\\somefilename2.exe",
          status: "available",
          selected: true
        }
      ]
    });

    await render(hbs`<BatchDownload @model={{this.mockFiles}} />`);
    await click("#select-all");
    assert.dom("#select-all").isChecked();
  });

  test("it renders the download button as clickable when files are selected", async function(assert) {
    await render(hbs`<BatchDownload/>`);
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

    await render(hbs`<BatchDownload @model={{this.mockFiles2}} />`);
    await click(".row");
    assert.dom(".download-button disabled").doesNotExist();
  });

  test("it renders the details of a file that is not available for download", async function(assert) {
    await render(hbs`<BatchDownload/>`);

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

    await render(hbs`<BatchDownload @model={{this.file}} />`);
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
