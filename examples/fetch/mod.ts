import * as log from 'https://deno.land/std/log/mod.ts'
import * as _ from 'https://deno.land/x/lodash@4.17.15-es/lodash.js'

await log.setup({
  handlers: {
    console: new log.handlers.ConsoleHandler('DEBUG'),
  },
  loggers: {
    default: {
      level: 'DEBUG',
      handlers: ['console'],
    },
  },
})

interface Launch {
  flightNumber: number
  mission: string
  rocket: string
  customers: Array<string>
}

const launches = new Map<number, Launch>()
export async function downloadLaunchData() {
  log.info('Downloading launch data...')
  log.warning('THIS IS A WARNING!')
  const response = await fetch('https://api.spacexdata.com/v3/launches', {
    method: 'GET',
  })

  if (!response.ok) {
    log.warning('Problem downloading launch data.')
    throw new Error('Launch data download failed.')
  }

  const launchData = await response.json()
  for (const launch of launchData) {
    const payloads = launch['rocket']['second_stage']['payloads']
    const customers = _.flatMap(
      payloads,
      (payload: any) => payload['customers']
    )

    const flightData = {
      flightNumber: launch['flight_number'],
      mission: launch['mission_name'],
      rocket: launch['rocket']['rocket_name'],
      customers,
    }
    launches.set(flightData.flightNumber, flightData)
    log.info(JSON.stringify(flightData))
  }
}

async function postElon() {
  const response = await fetch('https://reqres.in/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      name: 'Elon Musk',
      job: 'billionaire',
    }),
  })
  const elon = await response.json()
  console.log(elon)
}

if (import.meta.main) {
  await downloadLaunchData()
  log.info(import.meta.main)
  log.info(`Downloaded data for ${launches.size} SpaceX launches.`)
}
// postElon()
