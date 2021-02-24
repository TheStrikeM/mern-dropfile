const fileService = require("../services/fileService")
const User = require("../models/User")
const File = require("../models/File")


class FileController {
    async createDir(req, res) {
        try {
            const {name, type, parent} = req.body
            const file = new File({name, type, parent, user: req.user.id})

            const papka = await File.findOne({_id: parent})
            if(!papka) {
                file.path = name
                await fileService.createDir(file)
            } else {
                file.path = `${papka.path}\\${file.name}`
                await fileService.createDir(file)
                papka.childs.push(file._id)
                await papka.save()
            }
            await file.save()
            return res.json(file)
        } catch (e) {
            console.log('Error:', e)
            return res.status(400).json({message: "FileController error", error: e})
        }

    }

    async getFiles(req, res) {
        try {
            const files = await File.find({user: req.user.id, parent: req.query.parent})
            return res.json(files)
        } catch (e) {
            console.log('Error:', e)
            return res.status(400).json({message: "Error in fetFiles FileController", error: e})
        }
    }
}

module.exports = new FileController()