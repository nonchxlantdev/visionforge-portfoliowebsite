/** True once the boot splash has finished exiting. */
export function whenBootDone(cb) {
  if (typeof document !== 'undefined' && document.documentElement.dataset.boot === 'done') {
    cb()
    return () => {}
  }
  const onDone = () => cb()
  window.addEventListener('vf:boot-done', onDone, { once: true })
  return () => window.removeEventListener('vf:boot-done', onDone)
}
