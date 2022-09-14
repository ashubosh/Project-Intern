const collegeModel = require("../models/collegeModel")

let regname = /^[A-Z][-a-zA-Z]+$/
let regfullname = /^(?![\s.]+$)[a-zA-Z\s.]*$/
let reglogo = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/
const createCollege = async function (req, res) {

    try {
        let data = req.body;
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "data is not given" })

        let name = data.name
        if (!name) return res.status(400).send({ status: false, message: "name is a  mandatory " })

        if (!regname.test(name)) return res.status(400).send({ status: false, msg: "pls enter correct name" })
        
        let fullname = data.fullName
        if (!fullname) return res.status(400).send({ status: false, message: "fullname is a  mandatory " })
       
        if (!regfullname.test(fullname)) return res.status(400).send({ status: false, msg: "pls enter correct fullname" })

        let logolink = data.logoLink
        if (!logolink) return res.status(400).send({ status: false, message: "logolink is a  mandatory " })

        if (!reglogo.test(logolink)) return res.status(400).send({ status: false, msg: "pls enter correct logolink" })
        let isDeleted = data.isDeleted
        if (isDeleted) {
            if (typeof (isDeleted) != 'boolean')
                return res.status(400).send({ status: false, message: "isDeleted is wrong type" })
            if (isDeleted === true) {
                if (!moment(deletedAt, 'YYYY-MM-DD', true).isValid())
                    return res.status(400).send({ status: false, message: "Plz write DeletedAt in Valid format" })
            }
        }

        let college = await collegeModel.create(data)
        return res.status(201).send({ status: true, data: college })

    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}
module.exports = { createCollege }