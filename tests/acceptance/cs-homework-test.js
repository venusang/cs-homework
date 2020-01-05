import { module, test } from "qunit";
import { click, visit, currentURL } from "@ember/test-helpers";
import { setupApplicationTest } from "ember-qunit";

module("Acceptance | cs homework", function(hooks) {
  setupApplicationTest(hooks);

  test("visiting /", async function(assert) {
    await visit("/");

    assert.equal(currentURL(), "/");
    assert.dom("a.button").hasText("Homework Assignment");
    await click("a.button");
    assert.equal(currentURL(), "/attachments");
  });
});
