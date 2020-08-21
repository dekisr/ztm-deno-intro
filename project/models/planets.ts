import * as log from 'https://deno.land/std/log/mod.ts'
import { join } from 'https://deno.land/std/path/mod.ts'
import { BufReader } from 'https://deno.land/std/io/mod.ts'
import { parse } from 'https://deno.land/std/encoding/csv.ts'

import { pick } from 'https://deno.land/x/lodash@4.17.15-es/lodash.js'

// interface Planet {
//   [key: string]: string
// }
type Planet = Record<string, string>

let planets: Array<Planet>

export const filterHabitablePlanets = (planets: Array<Planet>) => {
  return planets.filter((planet) => {
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
}

async function loadPlanetsData() {
  const path = join('data', 'kepler_exoplanets_nasa.csv')
  const file = await Deno.open(path)

  const bufReader = new BufReader(file)
  const result = await parse(bufReader, {
    header: true,
    comment: '#',
  })
  // Close file resource id (rid) to avoid leaking resources.
  Deno.close(file.rid)

  const planetsData = filterHabitablePlanets(result as Array<Planet>)

  return planetsData
    .map((planet) =>
      pick(planet, [
        'kepler_name',
        'koi_prad',
        'koi_smass',
        'koi_srad',
        'koi_count',
        'koi_steff',
      ])
    )
    .sort((a, b) => Number(a['koi_period']) - Number(b['koi_period']))
}

planets = await loadPlanetsData()
log.info(`${planets.length} habitable planets found!`)

export const getAllPlanets = () => planets
