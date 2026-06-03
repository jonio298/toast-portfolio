import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { appendFile, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

function readJsonBody(request) {
  return new Promise((resolveBody, rejectBody) => {
    let body = ''

    request.on('data', (chunk) => {
      body += chunk
    })

    request.on('end', () => {
      try {
        resolveBody(JSON.parse(body || '{}'))
      } catch (error) {
        rejectBody(error)
      }
    })
  })
}

function localConsultationStorage() {
  return {
    name: 'local-consultation-storage',
    configureServer(server) {
      server.middlewares.use('/api/consultation', (request, response) => {
        if (request.method !== 'POST') {
          response.statusCode = 405
          response.end('Method not allowed')
          return
        }

        readJsonBody(request)
          .then(async (data) => {
          try {
            const message = String(data.message || '').trim()

            if (!message) {
              response.statusCode = 400
              response.end(JSON.stringify({ error: 'Message is required' }))
              return
            }

            const entry = [
              '--- Consultation Request ---',
              `Received: ${new Date().toLocaleString()}`,
              message,
              '',
            ].join('\n')

            await appendFile(resolve(process.cwd(), 'consultation-requests.txt'), entry, 'utf8')

            response.setHeader('Content-Type', 'application/json')
            response.end(JSON.stringify({ ok: true }))
          } catch {
            response.statusCode = 500
            response.end(JSON.stringify({ error: 'Could not save request' }))
          }
          })
          .catch(() => {
            response.statusCode = 400
            response.end(JSON.stringify({ error: 'Invalid request' }))
          })
      })

      server.middlewares.use('/api/admin/requests', (request, response) => {
        if (request.method !== 'POST') {
          response.statusCode = 405
          response.end('Method not allowed')
          return
        }

        readJsonBody(request)
          .then(async (data) => {
            if (data.username !== 'JSowner' || data.password !== 'abn12345') {
              response.statusCode = 401
              response.setHeader('Content-Type', 'application/json')
              response.end(JSON.stringify({ error: 'Invalid login' }))
              return
            }

            let requests = ''

            try {
              requests = await readFile(resolve(process.cwd(), 'consultation-requests.txt'), 'utf8')
            } catch {
              requests = 'No consultation requests yet.'
            }

            response.setHeader('Content-Type', 'application/json')
            response.end(JSON.stringify({ ok: true, requests }))
          })
          .catch(() => {
            response.statusCode = 400
            response.end(JSON.stringify({ error: 'Invalid request' }))
          })
      })

      server.middlewares.use('/api/admin/clear', (request, response) => {
        if (request.method !== 'POST') {
          response.statusCode = 405
          response.end('Method not allowed')
          return
        }

        readJsonBody(request)
          .then(async (data) => {
            if (data.username !== 'JSowner' || data.password !== 'abn12345') {
              response.statusCode = 401
              response.setHeader('Content-Type', 'application/json')
              response.end(JSON.stringify({ error: 'Invalid login' }))
              return
            }

            await writeFile(resolve(process.cwd(), 'consultation-requests.txt'), '', 'utf8')

            response.setHeader('Content-Type', 'application/json')
            response.end(JSON.stringify({ ok: true, requests: 'No consultation requests yet.' }))
          })
          .catch(() => {
            response.statusCode = 400
            response.end(JSON.stringify({ error: 'Invalid request' }))
          })
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), localConsultationStorage()],
})
