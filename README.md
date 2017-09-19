# NG Hackathon 2017 - gruppe el-kundeavis 


## Run

`npm install`  
`npm run run:mobile`  

#### Add this to your launch.json and Start Debugging:

```javascript
{
    // Use IntelliSense to learn about possible Node.js debug attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "serverer",
            "program": "${workspaceRoot}/server.js",
            "env": {
                "PORT": "3030",
                "NODE_ENV": "local"
            }
        } 
    ]
}
``` 
