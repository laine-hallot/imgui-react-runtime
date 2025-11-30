import esbuild from 'esbuild';
import { babelFlowPlugin } from 'esbuild-plugin-babel-flow';

const outDirArgIndex = process.argv.findIndex((arg) => arg === '--outdir');
const outdir =
  outDirArgIndex === -1
    ? undefined
    : (() => {
        const outdirValue = process.argv[outDirArgIndex + 1];
        if (outdirValue === undefined) {
          console.error('--outdir argument passed but no value was provided');
          exit();
        }
        return outdirValue;
      })();

esbuild
  .build({
    entryPoints: ['src/index.ts'],
    write: true,
    bundle: true,
    outdir: outdir ?? './dist/',
    sourcemap: true,
    plugins: [babelFlowPlugin()],
  })
  .catch(() => process.exit(1));
