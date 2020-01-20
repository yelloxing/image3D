export default {
    vs: `
    attribute vec4 a_position;
    attribute vec4 a_color;
    attribute float a_size;
    varying vec4 v_color;
    uniform mat4 u_matrix;
    void main(){
        gl_Position=u_matrix * a_position;
        gl_PointSize=a_size;
        v_color=a_color;
    }
    `,
    fs: `
    precision mediump float;
    varying vec4 v_color;
    void main(){
        gl_FragColor=v_color;
    }
    `
};
