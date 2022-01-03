const mongoose = require('mongoose');
const empSchema = new mongoose.Schema({
    userId: String,
    Name: String,
    DOB: String,
    Address: String,
    Role: String,
    Salary: String,
    Experience: String,
}, {
    'timestamps': true
});


let Notes = mongoose.model('empData', empSchema);

class NoteModel {

    async createNoteModel(req) {
        console.log(" requ ", req.data);

        let response = {
            message: '',
            success: '',
            data: ''
        }
        let newNote = new Notes({
            Name: req.Name ? req.Name: "",
            DOB: req.DOB ? req.DOB : "",
            Address: req.Address ? req.Address : '',
            Role: req.Role ? req.Role : '',
            Salary: req.Salary ? req.Salary : '',
            Experience: req.Experience ? req.Experience : "",
            userId: req.data.id

        });
        return new Promise((resolve, reject) => {
            newNote.save()
                .then((result) => {
                    console.log(" result ", result);
                    response.success = true
                    response.message = 'Employee created succssfullyy'
                    response.data = result
                    resolve(response);

                }).catch((error) => {
                    console.log(" eeorr in saving ", error);

                    response.success = false,
                        response.message = 'Employee creation  failed',
                        response.data = null,
                        response.status = 500,
                        response.error = error
                    reject(response); label
                })

        });

    }

    getAllNotes(req) {
        var response = {
            success: false,
            message: '',
            data: '',
            err: ''
        }
        return new Promise((resolve, reject) => {
            Notes.find(req)
                .then((AllNotes) => {
                    response.success = true; 
                    response.message = "getting all Employees successfully"
                    response.data = AllNotes
                    resolve(response)
                }).catch((err) => {
                    response.success = false
                    response.message = "Note Does Not exist error";
                    response.err = err
                    reject(response)
                })

        })


    }

    findNote(req) {
        console.log(" req in find notes", req);

        return new Promise((resolve, reject) => {
            Notes.findById({ _id: req.empId }).then((data) => {
                console.log(" request ", data);

                resolve(data)
            }).catch((err) => {
                reject(err)
            })
        })
    }
    updateNote(req, data) {

        console.log(" req in model ererere*&*&&*&*&*&*&*&*&*", req, data);

        return new Promise((resolve, reject) => {
            var response = {
                success: false,
                message: '',
                data: ''
            }

            var noteModel = {
                Name: req.Name ? req.Name : data.Name,
                DOB: req.DOB ? req.DOB : data.DOB,
                Address: req.Address ? req.Address : data.Address,
                Role: req.Role ? req.Role : data.Role,
                Salary: req.Salary ? req.Salary : data.Salary,
                Experience: req.Experience ? req.Experience : data.Experience,
                userId: req.data.id
            }
            console.log(" note model ***", noteModel);

            Notes.updateOne({ _id: req.empId }, noteModel, { new: true }).then((result) => {
                console.log(" updted successfully", result);

                response.success = true;
                response.message = "Note Updated Successfully";
                response.data = result;
                response.status = 200
                resolve(response)
            }).catch((err) => {
                response.success = false;
                response.message = err;
                reject(response)
            })       
        })
    }

    deleteNote(req) {
        let response = {
            message: '',
            success: '',
            data: '',
            err: ''
        }
        return new Promise((resolve, reject) => {
            Notes.findByIdAndRemove({ _id: req }).then((data) => {
                if (data == null) {
                    response.message = 'note doesnot exist',
                        response.success = 'false',
                        response.data = data,
                        response.err = ''
                    resolve(response)
                } else {
                    response.message = 'note deleted successfully',
                        response.success = 'false',
                        response.data = data,
                        response.err = ''
                    resolve(response)
                }
            }).catch((err) => {
                response.message = 'note id not provided',
                    response.success = 'false',
                    response.data = '',
                    response.err = err
                reject(response)
            })
        })

    }

   
}

module.exports = { NoteModel };
