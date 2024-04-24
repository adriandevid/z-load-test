const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const { exec } = require("child_process"); 

var fs = require('fs');
var files = fs.readdirSync('./scenarios');

var file_scenarios = {};
var counter = 0;

files.forEach(function (dir) {
    fs.readdirSync(`./scenarios/${dir}/`).forEach(function(scenario) {
        if(scenario.includes("js")) {
            file_scenarios[counter.toString()] = {
                id: dir,
                scenario: scenario,
                command: `k6 run --out web-dashboard=export=./scenarios/${dir}/reports/${scenario.split(".")[0]}_{time}.html ./scenarios/${dir}/${scenario}`
            };

            counter++
        }
    })
})


var options = Object.keys(file_scenarios).map((key) => `${key} - ${file_scenarios[key].id} - ${file_scenarios[key].scenario}`).join("\n");

console.log("==============================================");
console.log("select a scenario: ");
console.log("\n")
console.log("scenarios: \n"+ options);

readline.question(`$: `, num1 => {
    var time = `${new Date().toLocaleDateString().replaceAll("/", "-")}_${new Date().toLocaleTimeString().replaceAll(":", "_")}`;
    
    file_scenarios[num1].command = file_scenarios[num1].command.replaceAll("{time}", time);

    exec(file_scenarios[num1].command, (err, outs, errs) => {
        readline.close();
    });
});