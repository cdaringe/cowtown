const ghpages = require('gh-pages')
const path = require('path')

const buildDirname = path.resolve(__dirname, '..', 'public')

console.log('starting publish')
ghpages.publish(buildDirname, {
  repo: `https://${process.env.GH_TOKEN}@github.com/cdaringe/cowtown.git`,
  silent: true
}, err => {
  if (err) {
    console.error(err.message)
    throw err
  }
  console.log('docs published')
})
