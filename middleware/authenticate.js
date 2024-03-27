const isAuthenticated = (req, res, next) => {
    if (req.session.user === undefined) {
        return res.status(401).json({ error: "Unauthorized", message: "You do not have access." });

    }
    next();
};

module.exports = {
    isAuthenticated
};