import { state, muat, aturRender } from "./state.js";
import { renderProfil, render } from "./dom.js";
import { pasangPendengar } from "./events.js";

Object.assign(state, muat());
aturRender((nextState) => {
  render(nextState);
  renderProfil(nextState);
});
pasangPendengar();
renderProfil(state);
render(state);
