precision mediump float;
varying vec2 vUv;
uniform float iTime;
uniform float alpha;

void main() {
  float x = vUv.x * 40.0;
  float y = vUv.y * -40.0;
  float t = iTime * 0.3;
  float col = sin(t+y/7.0-sin(x/6.0+sin(t*0.1)+sin(x/15.0+y/9.0)));
  float antialias = col/fwidth(col);
  float clampedr = clamp(antialias, 0.725, 1.);
  float clampedg = clamp(antialias, 0.89, 1.);
  float clampedb = clamp(antialias, 1., 1.);
  gl_FragColor = vec4(clampedr,clampedg,clampedb,alpha);
}