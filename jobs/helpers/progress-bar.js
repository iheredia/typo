const ProgressBar = require('progress');

module.exports = class {
  constructor(displayName) {
    this.displayName = displayName
    this.progressBar = null;
  }

  setTotal(total) {
    const displayConfig = `${this.displayName} [:bar]`;
    this.progressBar = new ProgressBar(displayConfig, { total });
  }

  tick() {
    this.progressBar.tick();
  }
}