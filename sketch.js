let bgImg, baseImg, img1, img2, img3, img1h, img2h, img3h, imgIn, imgMa, imgPl, imgRu;
let alpha1 = 0, alpha2 = 0, alpha3 = 0; // 透明度
let fadeSpeed = 0.1; // 渐变速度
let pulseSpeed = 0.05; // **加快动画速度**
let pulseOffset = 0; // 控制呼吸动画的波动

function preload() {
  bgImg = loadImage("1B.png"); // 最底层
  baseImg = loadImage("1.0.png"); // 现在是背景层，不会盖住 1.1/1.2/1.3
  img1 = loadImage("1.1.png");
  img2 = loadImage("1.2.png");
  img3 = loadImage("1.3.png");
  img1h = loadImage("1.1h.png");
  img2h = loadImage("1.2h.png");
  img3h = loadImage("1.3h.png");
  imgIn = loadImage("1in.png");
  imgMa = loadImage("1ma.png");
  imgPl = loadImage("1pl.png");
  imgRu = loadImage("1ru.png");
}

function setup() {
  createCanvas(1920, 1080);
}

function draw() {
  background(250);

  // **1B.png 底图** (随鼠标缓慢移动)
  let bgSize = 1920;
  imageMode(CENTER);
  image(bgImg, mouseX, mouseY, bgSize, bgSize);
  imageMode(CORNER);

  // **固定四角的装饰图片**
  image(imgIn, 20, 20);
  image(imgMa, 1900 - imgMa.width, 20);
  image(imgPl, 1900 - imgPl.width, 1060 - imgPl.height);
  image(imgRu, 20, 1060 - imgRu.height);

  // **检测鼠标是否进入区域**
  let inRegion1 = (mouseX > 530 && mouseX < 1400 && mouseY > 150 && mouseY < 320);
  let inRegion2 = (mouseX > 720 && mouseX < 1180 && mouseY > 320 && mouseY < 670);
  let inRegion3 = (mouseX > 530 && mouseX < 1400 && mouseY > 670 && mouseY < 980);

  // **平滑控制透明度**
  alpha1 = lerp(alpha1, inRegion1 ? 255 : 0, fadeSpeed);
  alpha2 = lerp(alpha2, inRegion2 ? 255 : 0, fadeSpeed);
  alpha3 = lerp(alpha3, inRegion3 ? 255 : 0, fadeSpeed);

  // **加快呼吸动画的速度**
  pulseOffset += pulseSpeed;
  let dynamicAlpha = map(sin(pulseOffset), -1, 1, 230, 255); // 90% ~ 100% 透明度
  let dynamicScale = map(sin(pulseOffset), -1, 1, 0.95, 1.05); // ±10px 变化

  // **绘制 `1.xh` 呼吸动画层（先绘制，但被 `1.0.png` 遮挡）**
  drawBreathingImage(img1h, 960, 245, alpha1, dynamicAlpha, dynamicScale);
  drawBreathingImage(img2h, 960, 510, alpha2, dynamicAlpha, dynamicScale);
  drawBreathingImage(img3h, 960, 781, alpha3, dynamicAlpha, dynamicScale);

  // **绘制 `1.1.png`、`1.2.png`、`1.3.png`，始终覆盖 `1.0.png`**
  tint(255, alpha1);
  image(img1, 0, 0, width, height);
  noTint();

  tint(255, alpha2);
  image(img2, 0, 0, width, height);
  noTint();

  tint(255, alpha3);
  image(img3, 0, 0, width, height);
  noTint();

  // **最后绘制 `1.0.png`，但 `1.1/1.2/1.3` 仍在上面**
  tint(255, alpha1);
  image(img1, 0, 0, width, height);
  noTint();
}

// **封装函数：在指定位置绘制 `1.xh` 呼吸动画**
function drawBreathingImage(img, x, y, alpha, dynamicAlpha, dynamicScale) {
  if (alpha > 10) {
    push();
    translate(x, y);
    scale(dynamicScale);
    tint(255, dynamicAlpha);
    imageMode(CENTER);
    image(img, 0, 0);
    noTint();
    imageMode(CORNER);
    pop();
  }
}
