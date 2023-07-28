precision mediump float;
varying vec2 vUv;
uniform float iTime;
uniform float alpha;

void main() {
  float x = vUv.x * 40.0;
  float y = vUv.y * -40.0;
  float t = iTime * 0.3;
  float col = sin(sin(t+x/4.0)-t+y/9.0+sin(x/6.0+sin(t*0.1)+sin(x/9.0+y/9.0)));
  float antialias = col/fwidth(col);
  float clampedr = clamp(antialias, 0.816, 1.);
  float clampedg = clamp(antialias, 1., 1.);
  float clampedb = clamp(antialias, 0.757, 1.);
  gl_FragColor = vec4(clampedr,clampedg,clampedb,alpha);
}