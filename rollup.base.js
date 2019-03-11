import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';

export default function setup(isProd = false) {
  return {
    input: 'src/index.js',
    output: {
      file: 'server.js',
      format: 'cjs'
    },
    external: [
      'express',
      'express-jwt',
      'jwks-rsa',
      'pg-promise'
    ],
    plugins: [
      babel({ include: 'src/**' }),
      resolve({ jail: '/src/' }),
      commonjs(),
      isProd && replace({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      isProd && terser()
    ].filter(Boolean)
  };
}
