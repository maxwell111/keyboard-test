import "../scss/main.scss";

const keyboardTest = {
  keyboard: null,
  outPutBlock: null,
  exitMessageBlock: null,
  init() {
    this.setKeyboardType();
    if (this.keyboard) {
      this.outputBlock = document.getElementById("output");
      this.clearOutputButton = document.getElementById("clear-output");
      this.outputBlock.classList.add("is-visible");
      this.keyboard.classList.add("is-active");

      document.addEventListener("keydown", (event) => {
        const key = event.code;
        const text = key === "Space" ? "Space" : event.key; // For space button we have empty key, so condition prevents empty output.
        if (key) {
          this.findKey(key);
          this.outputText(text);
          this.clearOutputButton.classList.add('is-active');
        }
      });
      
      this.clearOutputButton.addEventListener("click", (e) => {
        this.clearOutputResults();
        e.target.classList.remove('is-active');
      });
      
    } else {
      this.showExitMessage();
    }
  },
  findKey(pressedKey) {
    if (this.keyboard) {
      const keyBlocks = this.keyboard.querySelectorAll(".key");
      keyBlocks.forEach((block) => {
        block.classList.remove("key-active");
        if (block.dataset.code == pressedKey) {
          block.classList.add("key-active");
        }
      });
    }
  },
  outputText(keyText) {
    const outPutResult = this.outputBlock.querySelector(".output-result");
    if (outPutResult) {
      const outPutResultTemplate = `<span>${keyText}</span>`;
      outPutResult.insertAdjacentHTML("beforeend", outPutResultTemplate);
    }
  },
  setKeyboardType() {
    const platform = navigator.userAgentData.platform.toLowerCase();
    this.keyboard = document.querySelector(
      platform.includes("mac") ? "#keyboard1" : null
    );
  },
  showExitMessage() {
    this.exitMessageBlock = document.querySelector(".exit-message");
    this.exitMessageBlock.classList.add("is-active");
  },
  clearOutputResults() {
    const outPutResult = this.outputBlock.querySelector(".output-result");
    outPutResult.replaceChildren();
  },
};

document.addEventListener("DOMContentLoaded", () => {
  keyboardTest.init();
});
