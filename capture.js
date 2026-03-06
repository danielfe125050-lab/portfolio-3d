import puppeteer from 'puppeteer';

const PROJECTS = [
    { name: 'lapate', url: 'https://lapate.vercel.app' },
    { name: 'cantosol', url: 'https://canto-de-sol.vercel.app' },
    { name: 'quesudas', url: 'https://lasquesudasdealeja.vercel.app' },
    { name: 'terapia', url: 'https://terapia-serena.vercel.app' }
];

(async () => {
    // Launch browser
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    // Set viewport to mobile/tablet size so the layout is compact and readable in the 3D frame
    await page.setViewport({ width: 768, height: 1024 });

    for (const project of PROJECTS) {
        console.log(`Taking screenshot for ${project.name}...`);
        try {
            await page.goto(project.url, { waitUntil: 'networkidle2', timeout: 30000 });
            // Wait an extra second for animations to finish
            await new Promise(r => setTimeout(r, 1000));
            await page.screenshot({ path: `./public/${project.name}.png` });
            console.log(`Success: ${project.name}.png saved!`);
        } catch (error) {
            console.error(`Failed to screenshot ${project.name}:`, error.message);
        }
    }

    await browser.close();
    console.log("All screenshots completed!");
})();
