import fs from "fs";
const file = fs.readFileSync('test.txt', 'utf8')
//to.string and 'utf8' in the function produce the same result

//search potential emails
const emailRegex = /(@)/g
const potentialEmails = file.match(emailRegex)
console.log(potentialEmails.length)

//naive approach

let counter = 0
for (let i = 0; i < file.length; i++) {
    if (file.substring(i, (i + 13)) == '@softwire.com ') {
        counter++
    }
}
console.log(`Naive approach count: ${counter}`)
console.log(typeof file)



//search softwire.com emails - returns 261
const softwireEmailRegex = /(@softwire\.com)\s/g
const softwireEmails = file.match(softwireEmailRegex)
console.log(`Regex approach count: ${softwireEmails.length}`)

//search for all possible domains
const allDomainRegex = /(\D+)\.(\D) /g

