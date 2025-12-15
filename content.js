document.addEventListener("mouseup", function() {
  const selection = window.getSelection();
  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0);
  const text = selection.toString().trim();
  if (text.length === 0) return;

  const parent = range.commonAncestorContainer.parentElement;

  // Exclude interactive or non-text elements
  const excludeTags = ["A", "BUTTON", "INPUT", "TEXTAREA", "IMG"];
  if (excludeTags.includes(parent.tagName)) return;

  // Wrap only the selected text in a span
  const span = document.createElement("span");
  span.style.color = "black";
  span.style.backgroundColor = "black";
  span.dataset.blackedOut = "true";
  span.title = "Click to toggle blackout"; // tooltip

  try {
    range.surroundContents(span);
  } catch (e) {
    console.warn("Selection too complex to wrap.");
    return;
  }

  selection.removeAllRanges();

  // Toggle blackout on click
  span.addEventListener("click", function(e) {
    e.stopPropagation();
    if (span.dataset.blackedOut === "true") {
      span.style.color = "";
      span.style.backgroundColor = "";
      span.dataset.blackedOut = "false";
      span.title = ""; // remove tooltip when restored
    } else {
      span.style.color = "black";
      span.style.backgroundColor = "black";
      span.dataset.blackedOut = "true";
      span.title = "Click to toggle blackout"; // restore tooltip
    }
  });
});
