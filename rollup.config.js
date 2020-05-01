import babel from 'rollup-plugin-babel';
import commonjs from '@rollup/plugin-commonjs';

const commonConfig = {
  input: 'src/index.js',
  plugins: [
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
    }),
    commonjs({
      ignoreGlobal: true,
    }),
  ],
};

export default [
  {
    ...commonConfig,
    output: {
      dir: 'lib/cjs',
      format: 'cjs',
    },
  },
  {
    ...commonConfig,
    output: {
      dir: 'lib/esm',
      format: 'esm',
    },
  },
];
