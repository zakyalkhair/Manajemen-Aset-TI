import type { AxiosError } from 'axios'

export type FieldErrors = Record<string, string>

export type NormalizedHttpError = {
  status: number
  message: string
  fields: FieldErrors
}

const pickFirst = (value: unknown) => {
  if (Array.isArray(value)) return String(value[0] ?? '')
  if (value == null) return ''
  return String(value)
}

export const normalizeHttpError = (err: unknown): NormalizedHttpError => {
  const fallback: NormalizedHttpError = {
    status: 0,
    message: 'Terjadi kesalahan',
    fields: {},
  }

  const e = err as AxiosError<any>
  const status = e?.response?.status ?? 0
  const data = e?.response?.data

  const normalized: NormalizedHttpError = {
    status,
    message: 'Terjadi kesalahan',
    fields: {},
  }

  if (typeof data?.message === 'string' && data.message.trim()) {
    normalized.message = data.message
  } else if (typeof e?.message === 'string' && e.message.trim()) {
    normalized.message = e.message
  } else {
    normalized.message = fallback.message
  }

  if (status === 422 && data?.errors && typeof data.errors === 'object') {
    const fields: FieldErrors = {}
    for (const key of Object.keys(data.errors)) {
      fields[key] = pickFirst(data.errors[key])
    }
    normalized.fields = fields
    if (Object.keys(fields).length > 0) {
      normalized.message = 'Validasi gagal'
    }
  }

  return normalized
}
