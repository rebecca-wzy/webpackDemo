import './index.css'
import './index.less'
import './index.scss'

class Test {
  constructor() {
    this.renderDiv();
  }

  renderDiv() {
    const div = document.createElement("div");
    div.className = "test";
    div.innerHTML = "hello";
    document.body.appendChild(div);
  }
}

new Test();
