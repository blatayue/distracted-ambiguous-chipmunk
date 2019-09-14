import { connect, connection, set } from "mongoose";
// don't allow deprecated features
set("useNewUrlParser", true);
set("useFindAndModify", false);
set("useCreateIndex", true);
set("useUnifiedTopology", true);

export const connectDB = async () => {
	const host = process.env.MONGO_HOST;
	const mongoUser = process.env.MONGO_USER;
	const mongoPass = process.env.MONGO_PASS;


	try {
		// if ready, db still connected
		if (connection.readyState === 1) {
			console.log(
				`Ready State: ${connection.readyState}, still connected to DB`
			);
			return;
		}
		// try to connect to atlas db
		await connect(
			`mongodb+srv://${mongoUser}:${mongoPass}@${host}`,
			{ autoReconnect: true }
		);
		console.log(`Ready State: ${connection.readyState}`);
	} catch (e) {
		throw new Error(e);
	}
};
