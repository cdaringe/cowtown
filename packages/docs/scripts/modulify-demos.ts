import { watch } from 'chokidar'
import * as path from 'path'
import * as fs from 'fs-extra'
import camelCase from 'lodash/camelCase'

const SRC_DIRNAME = path.resolve(__dirname, '..', 'src')
const DEMO_SRC_AS_MODULES_DIRNAME = path.resolve(
  SRC_DIRNAME,
  'demoSourceAsStrings'
)
const emitter = watch('./**/*.ts', {
  cwd: SRC_DIRNAME,
  ignored: ['./**/*.d.ts', DEMO_SRC_AS_MODULES_DIRNAME]
})

const demoFiles = new Set()

function toParts (filename: string) {
  const parts = filename.replace(/\..*$/, '').split(path.sep)
  const basename = parts[parts.length - 1]
  const demoname = parts[parts.length - 2]
  const varname = camelCase(`${demoname}_${basename}`)
  return { basename, demoname, filename, varname }
}

const log = (...args: any[]) => console.log('[sdg]:', ...args)

async function flushEntry () {
  const importParts = Array.from(demoFiles.entries()).map(([filename]) =>
    toParts(filename)
  )
  const imports = importParts
    .map(({ basename, demoname, varname }) => {
      return `const ${varname}: string = require('${path.resolve(
        DEMO_SRC_AS_MODULES_DIRNAME,
        demoname,
        `${basename}.json`
      )}').text`
    })
    .join('\n')
  await fs.writeFile(
    path.join(DEMO_SRC_AS_MODULES_DIRNAME, 'demoSource.ts'),
    `
${imports}
export const sourceByDemoName = {
  ${importParts.map(({ varname }) => `${varname}`).join('\n  ')}
}
  `.trim()
  )
}

async function onChange (relativeFilename: string) {
  const filename = path.resolve(SRC_DIRNAME, relativeFilename)
  demoFiles.add(filename)
  const { basename, demoname } = toParts(filename)
  log(`modulifying ${relativeFilename}`)
  if (!basename || !demoname) { throw new Error(`no demoname [${demoname}]or basename [${basename}]`) }
  const demoDirname = path.join(DEMO_SRC_AS_MODULES_DIRNAME, demoname)
  await fs.mkdirp(demoDirname)
  await fs.writeFile(
    path.resolve(demoDirname, `${basename}.json`),
    `${JSON.stringify({ text: (await fs.readFile(filename)).toString() })}`
  )
  flushEntry()
}

async function onRm (relativeFilename: string) {
  const filename = path.resolve(SRC_DIRNAME, relativeFilename)
  demoFiles.delete(filename)
  log(`demodulifying ${relativeFilename}`)
  await flushEntry()
}

log('starting modulify-demos')
emitter.on('add', onChange)
emitter.on('change', onChange)
emitter.on('unlink', onRm)
console.log(process.argv)
if (process.argv[2] === '--build') {
  emitter.on('ready', () => process.exit(0))
} else if (process.argv[2] === '--watch') {
  // pass
} else {
  throw new Error('missing --build or --watch flag')
}
