const empModelfile = require('../model/empModel');
const noteModel = new empModelfile.NoteModel;




class NoteService {

    async craeteNoteService(req) {
        let data = await noteModel.createNoteModel(req)
        return data;
    }

    async  getAllNotes(req) {
        let allnotes = await noteModel.getAllNotes({ userId: req.id });
        return allnotes;
    }

    async updateNoteService(req) {
       
        let response = {
            message: '',
            success: '',
            data: ''
        }
        let card = await noteModel.findNote(req);
        if (card) {
            let data = await noteModel.updateNote(req, card);
            return data
        } else {
            response.success = false,
                response.message = 'plase provide note id ',
                response.status = 500,
                response.data = card
            return { response }
        }


    }


    deleteNote(req) {
        return noteModel.deleteNote(req.empId);
    }


}
module.exports =  new NoteService() ;
