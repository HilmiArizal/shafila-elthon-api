const mongooseSchema = require("mongoose");


const reservationSchema = new mongooseSchema.Schema({
    name: {
        type: String,
    },
    wish: {
        type: String,
    },
    person: {
        type: Number,
    },
    reservation: {
        type: String,
    },
    session: {
        type: String,
    },
}, { timestamps: true });


module.exports = mongooseSchema.model("Reservation", reservationSchema);