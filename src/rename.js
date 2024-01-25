import fs from "fs";
const textSource = fs.readFileSync("/Users/uchikkegowda/Downloads/accountList-csv-rId-cb0399f6-ad85-4ef5-a78f-9a0b2e3ea87a.csv", "utf8");
console.log(textSource.split(',')[1].replace('Page Views for ',"").replace(' (Operations for Networks - web)',""));
const fileName =  textSource.split(',')[1].replace('Page Views for ',"").replace(' (Operations for Networks - web)',"");
fs.rename("/Users/uchikkegowda/Downloads/accountList-csv-rId-cb0399f6-ad85-4ef5-a78f-9a0b2e3ea87a.csv", `/Users/uchikkegowda/Downloads/accountList-new-${fileName}.csv`, function(err) {
    if ( err ) console.log('ERROR: ' + err)});
