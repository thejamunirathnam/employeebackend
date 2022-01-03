const service = require('../service/empService');


class NoteController {


    async createNote(req, res) {
        await service.craeteNoteService(req.body).then((result) => {
            res.send(result);
        }).catch((error) => {
            console.log("error ", error);
            res.send(error);

        })

    }

    async getAllNotes(req, res) {
        await service.getAllNotes(req.body.data).then((data) => {
            res.status(200).send(data)
        }).catch((err) => {
            console.log(err,"err")
            res.status(500).send(err)
        })
    }

    async updateNotesController(req, res) {
        try {
            let response = {
                message: '',
                error: '',
                success: '',
                data: ''
            }
            await service.updateNoteService(req.body)
                .then((result) => {
                   
                    res.status(200).send(result);
                }).catch((err) => {
                    console.log(" errrin controller ", err);
                        response.success = false,
                        response.message = 'plase provide note id ',
                        response.status = 500,
                        response.data = null,
                        response.error = err
                    res.status(500).send(response)
                })
        } catch (error) {
            res.send(error)

        }


    }
    async deleteForeverNote(req, res) {

        await service.deleteNote(req.body).then((data) => {
            res.status(200).send(data);
        }).catch((err) => {
            res.status(500).send(err);
        })
    }





}
module.exports = new NoteController();
