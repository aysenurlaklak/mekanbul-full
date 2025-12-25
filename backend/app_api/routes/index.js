const jwt = require("express-jwt");
const auth = jwt.expressjwt({
    secret: process.env.JWT_SECRET,
    userProperty: "payload",
    algorithms: ["sha1", "RS256", "HS256"],
});
const requireAdmin = (req, res, next) => {
    if (req.auth && req.auth.role === "admin") {
        return next();
    }
    return res.status(403).json({ status: "Bu işlem için admin yetkisi gerekli!" });
};

var express= require('express');
var router=express.Router();
var venueController=require("../controller/VenueController");
var commentController=require("../controller/CommentController");
const ctrlAuth=require("../controller/Auth");
router.post('/signup', ctrlAuth.signUp);
router.post('/login', ctrlAuth.login)

router
.route("/venues/all")
.get(auth, requireAdmin, venueController.listAllVenues);

router
.route("/venues")
.get(venueController.listVenues)
.post(auth, requireAdmin, venueController.addVenue);

router
.route("/venues/:venueid")
.get(venueController.getVenue)
.put(auth, requireAdmin, venueController.updateVenue)
.delete(auth, requireAdmin, venueController.deleteVenue);

router
.route("/venues/:venueid/comments")
.post(auth, commentController.addComment)

router
.route("/venues/:venueid/comments/:commentid")
.get(commentController.getComment)
.put(auth, commentController.updateComment)
.delete(auth, commentController.deleteComment);

module.exports=router;