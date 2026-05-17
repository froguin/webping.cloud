export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function timeout(ms: number): Promise<void> {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('timeout'))
    }, ms)
  })
}

function withCacheBuster(url: string): string {
  const parsedUrl = new URL(url)
  if (typeof window !== 'undefined' && window.location.protocol === 'https:') {
    parsedUrl.protocol = 'https:'
  }
  parsedUrl.searchParams.set('_webping', `${Date.now()}-${Math.random().toString(36).slice(2)}`)
  return parsedUrl.toString()
}

async function singlePing(url: string, controller: AbortController): Promise<number> {
  const start = performance.now()
  await fetch(withCacheBuster(url), {
    cache: 'no-store',
    credentials: 'omit',
    mode: 'no-cors',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    signal: controller.signal,
  })
  const elapsed = Math.round(performance.now() - start)
  if (elapsed < 2) {
    throw new Error('network error')
  }
  return elapsed
}

export async function ping(url: string): Promise<number> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 10000)

  try {
    // Warm up the connection (DNS, TCP, TLS)
    try {
      await singlePing(url, controller)
    } catch {
      // ignore warm-up errors
    }

    // Take 3 samples and return the minimum
    const samples: number[] = []
    for (let i = 0; i < 3; i++) {
      try {
        const latency = await singlePing(url, controller)
        samples.push(latency)
      } catch (e) {
        if (controller.signal.aborted) throw e
      }
    }

    if (samples.length === 0) {
      throw new Error('failed to ping')
    }

    return Math.min(...samples)
  } finally {
    clearTimeout(timer)
  }
}
