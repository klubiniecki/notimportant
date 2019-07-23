#!/usr/bin/env node
const fs = require("fs");
const nf = require("node-fetch");
const c = require('colors');
const aR = require('app-root-path');
const [,, ...args] = process.argv;

const gF = (d, f_) => {
    const f = fs.readdirSync(d);
    for (const i in f) {
        const n = d + "/" + f[i];
        fs.statSync(n).isDirectory() ? gF(n, f_) : f_.push(n);
    }
    return f_;
};

const g = async () => {
    try {
        const r = await nf("https://uselessfacts.jsph.pl/random.json?language=en");
        return j = await r.json();
    } catch (e) {
        console.log(e);
    }
};

let n = 0;
const F = gF(`${aR}/${args.length > 0 ? args : 'src'}`, []);
F.filter(f => f.split('.').pop() === "css" || f.split('.').pop() === "scss").map(f =>
    fs.readFile(f, 'utf8', (e,d) => {
            if (e) console.log(e);
            if (d.includes("!important")) {
                g().then(r => fs.writeFile(f, d.replace("!important", `/*${r.text}*/`), 'utf8', () => {
                    n++;
                    console.log(c.bold(`🔥 Your !important kill count: ${c.red(n)} ☠️`))
                    }
                ))
            }
        }
    )
);
