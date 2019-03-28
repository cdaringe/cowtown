import joi from 'joi'

type Config = {
  port: number
  logLevel: 'debug' | 'info' | 'warn' | 'error' | 'silent'
}

export const fromEnv: () => Partial<Config> = () => {
  const partialConfig: Partial<Config> = {};
  if (process.env.PORT) partialConfig.port = parseInt(process.env.PORT)
  if (process.env.LOG_LEVEL) partialConfig.logLevel = process.env.LOG_LEVEL as any
  return partialConfig
}

// GOOD
export const create: (partial?: Partial<Config>) => Config = (partial = {}) => {
  // create a complete configuration container, provide universally applicable
  // defaults
  const { port, logLevel } = partial
  const config: Config = {
    port: port || 8080,
    logLevel: logLevel || 'warn'
  }
  validate(config)
  return config
}

export const validate = (config: Config) => {
  const res = joi.validate(config, {
    port: joi.number().min(0),
    logLevel: joi.any().valid('debug', 'info', 'warn', 'error', 'silent')
  }, { presence: 'required' })
  if (res.error) throw res.error
  return config
}

// BAD
// export const config = fromEnv() // not extensible in testing
// export const config = create(fromEnv()) // not extensible in testing
