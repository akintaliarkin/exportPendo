import fs from "fs";
const dirPath ="/Users/uchikkegowda/Downloads/vrni-cloud-trial-customers-script/";

fs.readdir(dirPath, function (err, files) {
    if (err) {
      console.error("Could not list the directory.", err);
      process.exit(1);
    }
    files.forEach(function (file, index) {
        console.log('file',file)
        const textSource = fs.readFileSync(dirPath+file, "utf8");
        console.log(textSource.split(',')[1].replace('Page Views for ',"").replace(' (Operations for Networks - web)',""));

const fileName =  textSource.split(',')[1].replace('Page Views for ',"").replace(' (Operations for Networks - web)',"");
console.log("filename",fileName );
fs.rename(dirPath+file, `/Users/uchikkegowda/Downloads/vrni-cloud-trial-customers-script/accountList-${fileName}.csv`, function(err) {
    if ( err ) console.log('ERROR: ' + err)});
    });
});

