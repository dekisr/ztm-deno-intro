export function denode(input) {
  if (input.toLowerCase() === 'node') {
    return input.toLowerCase().split('').sort().join('')
  }
  return input
}
