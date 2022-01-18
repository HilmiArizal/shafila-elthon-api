const { ReservationModel } = require('../Model');

module.exports = {

    getReservation: async (req, res) => {
        await ReservationModel.find().sort({ _id: -1 })
            .then((dataReservation) => {
                if (dataReservation.length === 0) return res.status(404).send({ message: 'Data Empty' });
                return res.status(200).send({ message: 'Data Successful', dataReservation });
            })
            .catch((err) => {
                res.status(500).send({ message: "Data Error" })
            });
    },

    getListReservation: async (req, res) => {
        const search = req.query.search;
        const currentPage = parseInt(req.query.currentPage);
        const perPage = parseInt(req.query.perPage);
        let totalData;

        function escapeRegex(text) {
            return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
        }

        await ReservationModel.find().countDocuments()
            .then((count) => {
                totalData = count;
                const regex = new RegExp(escapeRegex(search), "gi");
                if (!search) {
                    return ReservationModel.find().skip(currentPage * perPage).limit(perPage).sort({ createdAt: -1 });
                } else {
                    return ReservationModel.find({ $or: [{ name: regex }] }).skip(currentPage * perPage).limit(perPage).sort({ createdAt: -1 });
                }
            })
            .then((results) => {
                res.status(200).send({
                    message: results.length > 0 ? 'Get Data Successful' : 'Empty Data',
                    data: results,
                    total_data: totalData,
                    per_page: perPage,
                    current_page: currentPage
                });
            })
            .catch((err) => {
                res.status(500).send(err);
            })
    },

    postReservation: async (req, res) => {
        const dataReservation = new ReservationModel(req.body);
        await dataReservation.save()
            .then((dataReservation) => {
                res.status(200).send({ message: 'Data Successful', dataReservation });
            })
            .catch((err) => {
                res.status(500).send({ message: 'Data Error' })
            });
    },

    deleteReservation: async (req, res) => {
        await ReservationModel.deleteOne({ _id: req.query.id })
            .then((dataReservation) => {
                res.status(200).send({ message: 'Data Successful', dataReservation });
            })
            .catch((err) => {
                res.status(500).send({ message: 'Data Error' });
            })
    },

}