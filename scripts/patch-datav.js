const fs = require('fs')
const path = require('path')

const patches = [
  'node_modules/@jiaminghi/data-view/lib/components/decoration3/src/main.vue',
  'node_modules/@jiaminghi/data-view/lib/components/decoration6/src/main.vue'
]

function patchFile(relativePath) {
  const filePath = path.resolve(__dirname, '..', relativePath)

  if (!fs.existsSync(filePath)) {
    return
  }

  const source = fs.readFileSync(filePath, 'utf8')
  const patched = source
    .replace(
      /<template\s*\n\s*v-for="\(point, i\) in points"\s*\n\s*>/,
      '<template\n        v-for="(point, i) in points"\n        :key="i"\n      >'
    )
    .replace(/\n\s*:key="i"(\n\s*:fill=)/, '$1')

  if (patched !== source) {
    fs.writeFileSync(filePath, patched)
    console.log(`patched ${relativePath}`)
  }
}

patches.forEach(patchFile)
