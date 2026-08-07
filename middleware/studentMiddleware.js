const fs = require("fs")

function logReqRes(fileName){
return (req, res, next)=>{
      fs.appendFile(
        fileName,
        `\n${new Date().toLocaleString()}: ${req.ip} ${req.method} ${req.path}`,
        (err) => {
          if (err) {
            return res.status(500).json({ message: "Failed to write log file" });
          }
    
          next();
        },
      );
}
}

module.exports = {logReqRes}