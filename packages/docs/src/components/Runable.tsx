import React from 'react'
const Embed = require('react-runkit')
interface RunkitEmbed {
  // Specify the source code that the notebook will use.
  source: string
  // If true, the user will not be able to edit or run the embed.
  readOnly?: boolean
  // If 'endpoint', the notebook will be run as an endpoint and a link to the served page will be shown.
  // <Embed source={ `exports.endpoint = (req, res) => res.end('Hello, world!')` } mode='endpoint' />
  mode?: 'endpoint'
  // Request a version or semver range for the node engine.
  // <Embed source={ `console.log('Hello, world!')` nodeVersion='7' } />
  nodeVersion?: string
  // Provide a list of environment variables accessible in the notebook through process.env.
  // <Embed source={ 'console.log(`Hello, ${ process.env.FIRSTNAME } ${ process.env.LASTNAME }!`' } env={ ['FIRSTNAME=Haskell', 'LASTNAME=Curry'] } />
  env?: [string]
  // Provide a title for the notebook when opened on RunKit.
  // <Embed source={ `console.log('Hello, world!')` } title='Hello World' />
  title?: string
  // Provide a minimum height for the embed ('130px' by default).
  // <Embed source={ `console.log('Hello, world!')` } minHeight='200px' />
  minHeight?: string
  // Specify the Unix time in milliseconds at which packages should resolved. Packages published after the date will be ignored.
  // <Embed source={ `require('babel-core')` } packageTimestamp={ 1468195200000 } />
  packageTimestamp?: number
  // Specify source code that is run before the main source. This code will not be shown in the embed.
  // <Embed source={ `console.log(_.map(_.add(1), [1, 2, 3]))` } preamble={ `const _ = require('lodash/fp')` } />
  preamble?: string
  // Provide a callback that is run when the embed is loaded.
  // <Embed source={ `console.log('Hello, world!')` } onLoad={ this.alertLoaded.bind(this) } />
  onLoad?: () => void
  // Provide a callback that is run whenever the embed's URL changes.
  // <Embed source={ `console.log('Hello, world!')` } onLoad={ this.alertURLChanged.bind(this) } />
  onURLChanged?: () => void
  onEvaluate?: () => void
}
export const Runkit: React.FC<RunkitEmbed> = props => (
  <Embed mode={'endpoint'} {...props} />
)
