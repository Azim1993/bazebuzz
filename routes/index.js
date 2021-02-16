import {Router} from 'express'
import authRoutes from './v1/auth'
import userRoutes from './v1/user'
import categoryRoutes from './v1/category'

const router = new Router()

router.get("/", (req, res) => {
  res.send("hello buddy. Welcome to BazeBuzz");
});
router.get("/api", (req, res) => {
  res.send("hello buddy. Welcome to BazeBuzz API");
});

router.use("/api/v1", authRoutes)
router.use("/api/v1", userRoutes)
router.use("/api/v1", categoryRoutes)

module.exports = router;
