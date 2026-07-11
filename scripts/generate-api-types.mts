/**
 * Generates TypeScript types from the RKR API Swagger spec.
 * Output: interfaces/api/index.ts
 *
 * Usage: yarn generate:api-types
 */

import openapiTS, { astToString } from 'openapi-typescript'
import * as fs from 'fs'
import * as path from 'path'
import * as url from 'url'

const SWAGGER_URL =
  'https://rkrapi-801419031002.us-east1.run.app/swagger/v1/swagger.json'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const OUTPUT_DIR = path.resolve(__dirname, '../interfaces/api')
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'index.ts')

async function main() {
  console.log(`Fetching schema from ${SWAGGER_URL} …`)

  const ast = await openapiTS(new URL(SWAGGER_URL))
  const contents = astToString(ast)

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  const banner = [
    '/**',
    ' * AUTO-GENERATED — do not edit by hand.',
    ` * Source: ${SWAGGER_URL}`,
    ` * Generated: ${new Date().toISOString()}`,
    ' *',
    ' * Run `yarn generate:api-types` to regenerate.',
    ' */',
    '',
  ].join('\n')

  fs.writeFileSync(OUTPUT_FILE, banner + contents, 'utf-8')
  console.log(`Types written to ${OUTPUT_FILE}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
