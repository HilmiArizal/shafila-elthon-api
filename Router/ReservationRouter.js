const expressRouter = require('express').Router();
const { ReservationController } = require('../Controller');

expressRouter.get('/getReservation', ReservationController.getReservation);
expressRouter.get('/getListReservation', ReservationController.getListReservation);
expressRouter.post('/postReservation', ReservationController.postReservation);
expressRouter.delete('/deleteReservation', ReservationController.deleteReservation)

module.exports = expressRouter;