import jwt from "jsonwebtoken";
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers("Authorization");
    if (!token) {
      return res.status(400).json({ error: "UnAuthorized" });
    }
    const verified = jwt.verify(token, process.env.JWT_SECRETKEY);
    if (verified) {
      req.user = verified;
    }
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
/**
 * inga complete authendication and authorization ah pathi innumum purinjikiten
 * so athentication register and login - validation
 * Authorization -  after login aprm pandra ellame Authoprizarion pannuvom - token iruka nu pakrathu
 *  avanga logged user ethala pakka mudiyum - backend la API req panna mudyum - ithu than
 * so ithu ipa complete ah understand pannitkiten
 * Ivaru nalla industry level la soldraru - it matched
 */