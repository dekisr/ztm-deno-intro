import { join } from 'https://deno.land/std/path/mod.ts'
import { BufReader } from 'https://deno.land/std/io/mod.ts'
import { parse } from 'https://deno.land/std/encoding/csv.ts'

import * as _ from 'https://deno.land/x/lodash@4.17.15-es/lodash.js'

async function readFile() {
  const path = join('text_files', 'hello.txt')
  const data = await Deno.readTextFile(path)
  console.log(data)
}
// readFile()

// for await (const dirEntry of Deno.readDir('./')) {
//   console.log(dirEntry.name)
// }

interface Planet {
  [key: string]: string
}

async function loadPlanetsData() {
  const path = join('.', 'kepler_exoplanets_nasa.csv')
  const file = await Deno.open(path)

  const bufReader = new BufReader(file)
  const result = await parse(bufReader, {
    header: true,
    comment: '#',
  })
  Deno.close(file.rid)

  const planets = (result as Array<Planet>).filter((planet) => {
    const planetaryRadius = Number(planet['koi_prad'])
    const stellarMass = Number(planet['koi_smass'])
    const stellarRadius = Number(planet['koi_srad'])

    return (
      planet['koi_disposition'] === 'CONFIRMED' &&
      planetaryRadius > 0.5 &&
      planetaryRadius < 1.5 &&
      stellarMass > 0.78 &&
      stellarMass < 1.04 &&
      stellarRadius > 0.99 &&
      stellarRadius < 1.01
    )
  })

  return planets
    .map((planet) =>
      _.pick(planet, [
        'kepler_name',
        'koi_prad',
        'koi_smass',
        'koi_srad',
        'koi_count',
        'koi_steff',
        'koi_period'
      ])
    )
    .sort((a, b) => Number(a['koi_period']) - Number(b['koi_period']))
}

async function planetsByOrbitalPeriod() {
  const path = join('.', 'kepler_exoplanets_nasa.csv')
  const file = await Deno.open(path)

  const bufReader = new BufReader(file)
  const result = await parse(bufReader, {
    header: true,
    comment: '#',
  })
  Deno.close(file.rid)

  const orderedByOrbitalPeriod = (result as Array<Planet>).sort(
    (a, b) => Number(a['koi_period']) - Number(b['koi_period'])
  )

  return orderedByOrbitalPeriod
}

const newEarths = await loadPlanetsData()
console.log(`${newEarths.length} habitable planets found!`)
for (const planet of newEarths) console.log(planet)
const byOrbitalPeriod = await planetsByOrbitalPeriod()
const shortest = byOrbitalPeriod[0]
const longest = byOrbitalPeriod[byOrbitalPeriod.length - 1]
console.log(`
The shortest orbital period is ${shortest['koi_period']} from ${
  shortest['kepler_name']
}
And the longest orbital period is ${longest['koi_period']} from ${
  longest['kepler_name'] || 'NoName'
}
`)
