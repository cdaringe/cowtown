const ghpages = require('gh-pages')
const path = require('path')

const buildDirname = path.resolve(__dirname, 'public')

ghpages.publish(buildDirname, {
  repo: `https://${process.env.GH_TOKEN}@github.com/cdaringe/cowtown.git`,
  silent: true
}, err => {
  if (err) throw err
  console.log('docs published')
})
