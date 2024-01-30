import puppeteer from 'puppeteer';
import fs from "fs";

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({headless: false, slowMo: 250});
  const page = await browser.newPage();
  // Set screen size
  await page.setViewport({width: 1780, height: 1224});
  const val =0;

  const downloadCSVForPage = async (pageId) => {
    await page.goto(`https://app.pendo.io/s/5640672618741760/features/${pageId}`, {
        waitUntil: "domcontentloaded",
    });
    try {
     await page.waitForXPath("//a[contains(., 'View All Accounts')]");
 
    const elements = await page.$$("tfoot a");
    await elements[1].click();
    //await page.waitForNavigation();
    await page.waitForTimeout(2000);


     const columnBtn = await page.waitForSelector(`button[aria-label="columns"]`);
     await columnBtn.click();

     // add Last visit
     const addColumnBtn = await page.waitForXPath("//a[contains(., 'Add Columns')]");
     await addColumnBtn.click();
     const selectEl = await page.waitForSelector(".select2-container.ng-empty");
     await selectEl.click();
     const lastVisitoption = await page.$x("//li[contains(., 'Last Visit')]");
     await lastVisitoption[1].click();


        // add name
        const addColumnBtn2 = await page.waitForXPath("//a[contains(., 'Add Columns')]");
        await addColumnBtn2.click();
        const selectEl2 = await page.waitForSelector(".select2-container.ng-empty");
        await selectEl2.click();
        const nameoption = await page.$x("//li[contains(., 'name')]");
        await nameoption[3].click();


        // add orgname
        const addColumnBtn3 = await page.waitForXPath("//a[contains(., 'Add Columns')]");
        await addColumnBtn3.click();
        const selectEl3 = await page.waitForSelector(".select2-container.ng-empty");
        await selectEl3.click();
        const orgnameoption = await page.$x("//li[contains(., 'orgName')]");
        await orgnameoption[1].click();

          // add orgname
          const addColumnBtn4 = await page.waitForXPath("//a[contains(., 'Add Columns')]");
          await addColumnBtn4.click();
          const selectEl4 = await page.waitForSelector(".select2-container.ng-empty");
          await selectEl4.click();
          const productVersionoption = await page.$x("//li[contains(., 'productVersion')]");
          await productVersionoption[1].click();

            // add time SpendOnApp
           /* const addColumnBtn5 = await page.waitForXPath("//a[contains(., 'Add Columns')]");
            await addColumnBtn5.click();
            const selectEl5 = await page.waitForSelector(".select2-container.ng-empty");
            await selectEl5.click();
            const timeSpentOnApp = await page.$x("//li[contains(., 'Time on App')]");
            await timeSpentOnApp[1].click();*/


             // add time SpendOnApp
             const addColumnBtn6 = await page.waitForXPath("//a[contains(., 'Add Columns')]");
             await addColumnBtn6.click();
             const selectEl5 = await page.waitForSelector(".select2-container.ng-empty");
             await selectEl5.click();
             const timeSpentOnApp = await page.$x("//li[contains(., 'Usage Trending')]");
             await timeSpentOnApp[1].click();
//add visitor
     const addColumnBtn1 = await page.waitForXPath("//a[contains(., 'Add Columns')]");
     await addColumnBtn1.click();
     const selectEl1 = await page.waitForSelector(".select2-container.ng-empty");
     await selectEl1.click();
     const visitoroption = await page.$x("//li[contains(., 'Visitors')]");
     await visitoroption[1].click();


     const submitBtn = await page.waitForXPath("//button[contains(., 'Save Columns')]");
     await submitBtn.click();
     await page.waitForTimeout(2000);

    const downloadBtn = await page.waitForSelector(`button[aria-label="download"]`);
    await downloadBtn.click();
    const exportBtn = await page.waitForSelector(`button.csv-download`);
    await exportBtn.click();
    await page.waitForTimeout(2000);
    await page.goto('https://app.pendo.io/s/5640672618741760/features', {
      waitUntil: "domcontentloaded",
    });

    const closeBtn = await page.waitForXPath("//button[contains(., 'Close')]");
    await closeBtn.click();
    const backtoPageBtn =  await page.waitForXPath("//a[contains(., 'Back to Page Detail')]")
  await backtoPageBtn.click();
  const backtoPages =  await page.waitForXPath("//a[contains(., 'Back to Pages')]")
  await backtoPages.click();
    }catch{
      await page.goto('https://app.pendo.io/s/5640672618741760/features', {
        waitUntil: "domcontentloaded",
      });
    }
   /* const closeBtn = await page.waitForXPath("//button[contains(., 'Close')]");
    await closeBtn.click();
    const backtoPageBtn =  await page.waitForXPath("//a[contains(., 'Back to Page Detail')]")
  await backtoPageBtn.click();
  const backtoPages =  await page.waitForXPath("//a[contains(., 'Back to Pages')]")
  await backtoPages.click();*/

 

  };

  let pageListFetched = false;
  const textSource = fs.readFileSync("src/doneFeatures.txt", "utf8");
  const donePageIds = textSource?.split("\n") || [];
  page.on('response', async response => {
    if (response.url().includes("api/s/5640672618741760/feature?expand=") && !pageListFetched) {
        const jsonResponse = await response.json();
        const pageIds = jsonResponse.filter(({appId}) => (appId === 5725580939100160)).map(({id}) => id);
        pageListFetched = true;

       for(let i=0; i<pageIds.length; i++) {
          if (!donePageIds.includes(pageIds[i])) {
            await downloadCSVForPage(pageIds[i]);
            console.log(pageIds[i])
          }
        }
      
       // await browser.close();
    }
  });

  // Navigate the page to a URL
  await page.goto('https://app.pendo.io/s/5640672618741760/features', {
    waitUntil: "domcontentloaded",
  });
  await page.waitForTimeout(9000);
  await page.waitForSelector(`div[role="grid"]`);
})();