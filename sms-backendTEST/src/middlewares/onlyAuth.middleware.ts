import jwt from 'jsonwebtoken'
import SafeError from '../safeError'

const onlyAuth = (req: any, res: any, next: any) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      throw new Error('No token provided')
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string)

    req.user = decoded

    if (!req.user) {
      throw new SafeError('Invalid token')
    }

    next()
  } catch (err) {
    return res.status(401).json({
      message: 'Unauthorized'
    })
  }
}

export default onlyAuth
