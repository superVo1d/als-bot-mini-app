// global.d.ts
declare global {
  namespace globalThis {
    var __PIXI_APP__: PIXI.Application<PIXI.Renderer>;
  }
}
