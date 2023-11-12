import SafeError from './safeError'

const safeReturn = (res: any, error: any) => {
  console.log(error)
  if (error instanceof SafeError && error.forClient) {
    return res.status(400).json({
      message: error.message
    })
  } else {
    return res.status(500).json({
      message: 'Internal server error'
    })
  }
}

export default safeReturn
