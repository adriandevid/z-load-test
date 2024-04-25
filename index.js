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
        if(!scenario.includes("js")) {
            var indexOfScenarioForExecute = fs.readdirSync(`./scenarios/${dir}/${scenario}`)[0];
            file_scenarios[counter.toString()] = {
                id: scenario,
                path: dir,
                scenario: indexOfScenarioForExecute,
                command: `k6 run --out web-dashboard=export=./scenarios/${dir}/${scenario}/reports/${indexOfScenarioForExecute.split(".")[0]}_{time}.html ./scenarios/${dir}/${scenario}/${indexOfScenarioForExecute}`
            };

            counter++
        }
    })
})

var options = Object.keys(file_scenarios).map((key) => `${key} - ${file_scenarios[key].path} - ${file_scenarios[key].id}`).join("\n");

console.log("==============================================");
console.log("select a scenario: ");
console.log("\n")
console.log("scenarios: \n"+ options);

readline.question(`$: `, num1 => {
    var time = `${new Date().toLocaleDateString().replaceAll("/", "-")}_${new Date().toLocaleTimeString().replaceAll(":", "_")}`;
    
    file_scenarios[num1].command = file_scenarios[num1].command.replaceAll("{time}", time);

    exec(file_scenarios[num1].command, (err, outs, errs) => {
        console.log(outs)
        readline.close();
    });
});