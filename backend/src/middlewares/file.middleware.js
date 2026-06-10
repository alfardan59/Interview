const multer = require("multer")

const upload = multer({
    storage:multer.memoryStorage(),
    limits:{
        fileSize: 3 * 1024 * 1024 //maximum size of 3mb
    }
})

module.exports = upload