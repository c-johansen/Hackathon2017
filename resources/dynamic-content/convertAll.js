var marked = require("marked")
var fs = require("fs")

var config = {
    folder: "./",
    extIn: ".md",
    extOut: ".html",
    markedConfig: {
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: true,
        pedantic: false,
        sanitize: true,
        smartLists: true,
        smartypants: false
    }
}

marked.setOptions(config.markedConfig)

var path = require("path")

var files = fs.readdirSync(config.folder)

for (var i in files) {
    if (path.extname(files[i]) !== config.extIn) continue

    var inFile = config.folder + files[i]
    var outFile = config.folder + path.basename(files[i], config.extIn) + config.extOut

    fs.readFile(inFile, "utf8", function (err, content) {
        if (err) {
            console.error(err)
            return
        }

        fs.writeFileSync(outFile, marked(content))
        console.log("Converted", inFile, "to", outFile)
    })
}
