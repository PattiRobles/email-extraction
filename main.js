import fs from "fs";

const file = fs.readFileSync('test.txt', 'utf8')
console.log(typeof file)
//to.string and 'utf8' in the function produce the same result

//search potential emails - returns 2010
const emailRegex = /(@)/g
const potentialEmails = file.match(emailRegex)
console.log(potentialEmails.length)

//naive approach - search for softwire emails - 261
let counter = 0

for (let i = 0; i < file.length; i++) {
    if (file.substring(i, i + 14) === '@softwire.com\r' ||
        file.substring(i, i + 14) === '@softwire.com ') {
        counter++
    }
}
console.log(`Naive approach count: ${counter}`)


//search softwire.com emails - returns 261
const softwireEmailRegex = /(@softwire\.com)\s/g
const softwireEmails = file.match(softwireEmailRegex)
console.log(`Regex approach count - Softwire emails: ${softwireEmails.length}`)

//search for all possible domains - returns 1825
const allDomainRegex = /@(\w+)\.(\w+)(\.\w+)?\b/g
const allDomainEmails = file.match(allDomainRegex)
console.log(`Regex approach count all emails: ${allDomainEmails.length}`)
console.log(allDomainEmails)

//dictionary of domains - 15 different domains
let emailDictionary = {}
for (const domain of allDomainEmails) {
    if (allDomainEmails[domain]) {
        emailDictionary[domain] += 1;
    } else {
        emailDictionary[domain] = 1;
    }
}
console.log(emailDictionary);
console.log(Object.keys(emailDictionary).length);

//count how many emails per domain  
for (const domain of allDomainEmails) {
    if (emailDictionary[domain]) {
        emailDictionary[domain]++
    }
}
console.log(emailDictionary)

//most and least popular domains
const sortedDictionary = Object.entries(emailDictionary).sort((a, b) => a[1] - b[1]);
const leastPopularDomain = sortedDictionary.shift()[0]
const mostPopularDomain = sortedDictionary.pop()[0]
console.log(`The most popular domain is ${mostPopularDomain}.\nThe least popular domain is ${leastPopularDomain}.`)

//10 most popular domains
//this section and above to be combined to keep code concise
const dictionaryPopularityRank = Object.entries(emailDictionary).sort((a, b) => b[1] - a[1])
console.log(dictionaryPopularityRank)
const popular10DomainData = dictionaryPopularityRank.slice(0, 10)
const popular10Domains = []
for (const domain of popular10DomainData) {
    popular10Domains.push(domain[0])
}
console.log(`The 10 most popular domains -in popularity order- are:\n${popular10Domains.join(' \n')}`)