function jump() {
  let o = {i: 0}

  const up = new TWEEN.Tween(o)
  .to({i: 5}, 100)
  .onUpdate(() => shape.translateX(2))

  const down = new TWEEN.Tween(o)
  .to({i: 0}, 100)
  .onUpdate(() => shape.translateX(-2))
  .onComplete(() => shape.position.set(0, 0, 0))

  up.chain(down).start();
}

