import "./index.css";
import "./index.less";
import "./index.scss";
import caishenye from "../public/assets/money.gif";

class Test {
  constructor() {
    this.renderDiv();
    this.renderImg();
  }

  renderDiv() {
    const div = document.createElement("div");
    div.className = "test";
    div.innerHTML = "hello";
    document.body.appendChild(div);
  }

  renderImg() {
    const img = document.createElement("img");
    img.src = caishenye;
    document.body.appendChild(img);
  }
}

new Test();
