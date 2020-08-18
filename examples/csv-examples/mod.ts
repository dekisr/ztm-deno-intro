import { join } from 'https://deno.land/std/path/mod.ts'

async function readFile() {
  const path = join('text_files', 'hello.txt')
  const data = await Deno.readTextFile(path)
  console.log(data)
}

// for await (const dirEntry of Deno.readDir('./')) {
//   console.log(dirEntry.name)
// }

readFile()
