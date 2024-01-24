import puppeteer from 'puppeteer';

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({headless: false, slowMo: 350});
  const page = await browser.newPage();
  // Set screen size
  await page.setViewport({width: 1780, height: 1224});

  const downloadCSVForPage = async (pageId) => {
    await page.goto(`https://app.pendo.io/s/5640672618741760/pages/${pageId}`, {
        waitUntil: "domcontentloaded",
    });
    await page.waitForSelector('text/View All Accounts');
    const elements = await page.$$("tfoot a");
    await elements[1].click();
    await page.waitForNavigation();
    await page.waitForTimeout(2000);


    // const columnBtn = await page.waitForSelector(`button[aria-label="columns"]`);
    // await columnBtn.click();
    // const addColumnBtn = await page.$x("//a[contains(., 'Add Columns')]");
    // await addColumnBtn.click();
    // const selectEl = await page.waitForSelector("select.list-column-selector");
    // await selectEl.click();
    // const visitorOption = await page.$x("//li[contains(., 'Visitors')]");
    // await visitorOption.click();
    // const submitBtn = await page.$x("//button[contains(., 'Save Columns')]");
    // await submitBtn.click();
    // await page.waitForTimeout(2000);

    const downloadBtn = await page.waitForSelector(`button[aria-label="download"]`);
    await downloadBtn.click();
    const exportBtn = await page.waitForSelector(`button.csv-download`);
    await exportBtn.click();
    await page.waitForTimeout(2000);
  };

  let pageListFetched = false;
  page.on('response', async response => {
    if (response.url().includes("api/s/5640672618741760/page?expand=") && !pageListFetched) {
        const jsonResponse = await response.json();
        const pageIds = jsonResponse.filter(({appId}) => (appId === 5725580939100160)).map(({id}) => id);
        pageListFetched = true;
        await downloadCSVForPage(pageIds[0]);
        await browser.close();
    }
  });

  // Navigate the page to a URL
  await page.goto('https://app.pendo.io/s/5640672618741760/pages', {
    waitUntil: "domcontentloaded",
  });
  await page.waitForTimeout(8000);
  await page.waitForSelector(`div[role="grid"]`);
})();