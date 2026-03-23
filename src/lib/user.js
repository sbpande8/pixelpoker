const KEY = 'pixelpoker_user'

export function getUser() {
  try {
    const stored = localStorage.getItem(KEY)
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

export function setUser(fields) {
  const existing = getUser()
  const user = {
    id: existing?.id || crypto.randomUUID(),
    username: fields.username ?? existing?.username ?? '',
    avatarId: fields.avatarId ?? existing?.avatarId ?? null,
  }
  localStorage.setItem(KEY, JSON.stringify(user))
  return user
}

export function clearUser() {
  localStorage.removeItem(KEY)
}
