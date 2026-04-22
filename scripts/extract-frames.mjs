import { execFileSync } from 'child_process'
import { createRequire } from 'module'
import { mkdirSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)
const ffmpegPath = require('ffmpeg-static')
const root = join(__dirname, '..')

mkdirSync(join(root, 'public', 'frames'), { recursive: true })

console.log('Extracting 120 frames at 15fps from hero-source.mp4 …')

execFileSync(ffmpegPath, [
  '-y',
  '-i', join(root, 'public', 'hero-source.mp4'),
  '-vf', 'fps=15,scale=1920:1080',
  '-frames:v', '120',
  '-q:v', '4',
  join(root, 'public', 'frames', 'frame_%04d.jpg'),
], { stdio: 'inherit' })

console.log('Done — frames written to public/frames/')
