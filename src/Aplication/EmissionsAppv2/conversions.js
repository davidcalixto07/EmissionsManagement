
export const emissionsUnits = [
    { name: 'Tco2eq', conv: (n) => n },
    { name: 'kgco2eq', conv: (n) => (n * 1000) }
];

export const flowUnits = [
    { name: 'SCFh', conv: (n) => n },
    { name: 'MSCFh', conv: (n) => n * 0.001 },
    { name: 'MSCFD', conv: (n) => n / 41.67 },
    { name: 'MMSCFh', conv: (n) => n * 0.000001 },
    { name: 'MMSCFD', conv: (n) => n / 41667 },
]

export const tempUnits = [
    { name: '°R', conv: (n) => n + 459.67 },
    { name: '°C', conv: (n) => ((n - 32) * (5 / 9)) },
    { name: 'K', conv: (n) => ((n - 32) * (5 / 9) + 273.15) },
    { name: '°F', conv: (n) => n },
]
export const pressureUnits = [
    { name: 'psi', factor: 1, offset: 0, conv: (n) => n },
    { name: 'kPa', conv: (n) => n * 6895 },
]

export const defaultUnits =
{
    flow: flowUnits[0],
    pressure: pressureUnits[0],
    temperature: tempUnits[0],
    emissions: emissionsUnits[0]
}