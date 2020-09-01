export default (ctx) => {
  const {req} = ctx
  if (req.headers.cookie) {
    const cookies = req.headers.cookie.split(';')
    const cookieMap = cookies.reduce((t, c) => {
      const [key, value] = c.split('=')
      t[key] = value
      return t
    }, {})
    return cookieMap
  }

  return {}
}
