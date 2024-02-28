module.exports = (app) => {
	require('../routes/authRoutes')(app);
	require('../routes/pantryItemRoutes')(app);
	require('../routes/userRoutes')(app);
};
