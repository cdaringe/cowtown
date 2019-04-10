export default {
  title: 'cowtown',
  description: 'a comprehensive guide to server application development',
  htmlContext: {
    favicon: 'public/favicon.ico'
  },
  indexHtml: 'public/index.html',
  public: 'public',
  menu: [
    'introduction',
    'goals',
    'getting started',
    'create a middleware',
    'stack middlewares',
    'create a basic server',
    'create hello world',
    'routing - naive',
    'routing - basic',
    'manage configuration',
    'gracefully update configuration',
    'upload files',
    'serve static files',
    'serve an api and a ui',
    'isomorphic rendering',
    'logging',
    'security'
  ],
  themeConfig: {
    mode: 'dark'
  },
  codeSandbox: false,
  // debug: true,
  typescript: true
}
