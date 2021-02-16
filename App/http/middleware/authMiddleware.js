import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.replace(' ', '')
    if (!token) return res.status(401).send({message: 'Unauthenticated'})

    const jwtPrivateKey = '12345566@azim'
    jwt.verify(token, jwtPrivateKey ,(err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

export default authMiddleware