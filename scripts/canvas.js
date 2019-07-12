function createCanvas() {
  const element = document.createElement('canvas');
  const canvas = new fabric.Canvas(element);

  const width = 4096;
  const height = 2048;
  
  const headRadius = 1000;

  const mouthRadius = headRadius * 0.425;
  const mouthColor = 'white';

  const eyeRadius = headRadius * 0.145;
  const eyeColor = 'white';

  const pupilSize = eyeRadius * 0.45;
  const pupilColor = '#7F081C';

  canvas.setHeight(height);
  canvas.setWidth(width);

  function rel(val, size, total) {
    return ((total * val) / 100) - size / 2
  }

  function createMouth() {
    const mouth = new fabric.Circle({
      radius: mouthRadius,
      fill: mouthColor,
      left: rel(50, mouthRadius * 2, headRadius),
      top: rel(55, mouthRadius * 2, headRadius),
      startAngle: Math.PI * 0.025,
      endAngle: Math.PI - Math.PI * 0.025
    })

    return mouth;
  }

  function createEye(options) {
    const socket = new fabric.Circle({
      radius: eyeRadius,
      fill: eyeColor,
    })

    const line = new fabric.Rect({
      height: pupilSize * 0.15,
      width: pupilSize,
      fill: pupilColor,
      originX: 'center',
      originY: 'center'
    })

    const a = fabric.util.object.clone(line);
    const b = fabric.util.object.clone(line);

    a.angle = 45;
    b.angle = -45;

    const pupil = new fabric.Group([a, b], {
      left: rel(50, pupilSize, eyeRadius * 2),
      top: rel(50, pupilSize, eyeRadius * 2),
    });

    return new fabric.Group([socket, pupil], options)
  }

  const background = new fabric.Rect({width, height});
  background.setGradient('fill', {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: background.height,
    colorStops: {
      0: '#7F081C',
      1: '#FFA07A',
    }
  });

  const mouth = createMouth();

  const leftEye = createEye({
    left: rel(25, eyeRadius * 2, headRadius),
    top: rel(35, eyeRadius * 2, headRadius)
  })

  const rightEye = createEye({
    left: rel(75, eyeRadius * 2, headRadius),
    top: rel(35, eyeRadius * 2, headRadius)
  })

  const head = new fabric.Circle({
    radius: headRadius / 2,
    stroke: 'transparent',
    fill: 'transparent'
  });

  canvas.add(background);
  canvas.add(new fabric.Group([head, mouth, leftEye, rightEye], {
    left: rel(50, headRadius,  width),
    top: rel(50,  headRadius, height)
  }))

  return element;
}