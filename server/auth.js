import jwt from 'jsonwebtoken'

export function signToken(user) {
  return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET || 'change-this-secret', { expiresIn: '30d' })
}

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : ''
  if (!token) return res.status(401).json({ error: '未登录' })
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || 'change-this-secret')
    next()
  } catch {
    res.status(401).json({ error: '登录已过期' })
  }
}
