var fs = require("fs")
var fetch = require("node-fetch")

const fileName = "./tos-meny.html"
const env = "dev"
const chainId = "1300"
const keyName = "app_tos"
const elevatedRestApiAuthKey = ""

fs.readFile(fileName, "utf8", function (err, content) {
    if (err) {
        console.error(err)
        return
    }

    fetch(`https://platform-rest-${env}.ngdata.no/api/dynamic-content/${chainId}/${keyName}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "text/html",
                "elevated-rest-api-auth-key": elevatedRestApiAuthKey
            },
            body: content,
        }
    ).then(
        function (response) {
            if (!response.ok) {
                console.error(`${response.status} ${response.statusText}`)
                return
            }
            console.log(`Saved ${fileName} on ${keyName}`)
        })
})
