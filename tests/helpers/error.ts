/* eslint-disable @typescript-eslint/no-explicit-any */
const originalConsoleError = console.error
const jsDomCssError = 'Error: Could not parse CSS stylesheet'
export default (...params: any[]) => {
  if (!params.find((p) => p.toString().includes(jsDomCssError))) {
    originalConsoleError(...params)
  }
}
