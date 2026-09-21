import { access, mkdir, writeFile } from 'node:fs/promises';

const dishes = [
  [1, 'classic-chicken-burger', '"Crispy Chicken Burger & French Fry Set"'],
  [2, 'crispy-veg-burger', 'vegetable burger food'],
  [3, 'double-cheese-burger', 'double cheeseburger food'],
  [4, 'bbq-chicken-burger', '"BBQ chicken burger at Slim Chickens"'],
  [5, 'margherita-pizza', 'pizza margherita food'],
  [6, 'farmhouse-pizza', 'vegetable pizza peppers mushrooms food'],
  [7, 'pepperoni-pizza', 'pepperoni pizza food'],
  [8, 'bbq-chicken-pizza', 'barbecue chicken pizza food'],
  [9, 'chicken-biryani', 'intitle:"Chicken biryani" India food -mutton'],
  [10, 'hyderabadi-chicken-biryani', 'Hyderabadi chicken dum biryani food'],
  [11, 'paneer-biryani', '"Panner Vegetable Hyderabad Biryani"'],
  [12, 'mutton-biryani', 'mutton biryani food'],
  [13, 'chicken-alfredo-pasta', 'chicken alfredo pasta food'],
  [14, 'arrabbiata-pasta', 'penne arrabbiata red sauce pasta'],
  [15, 'mushroom-white-sauce-pasta', 'mushroom cream sauce pasta food'],
  [16, 'club-sandwich', 'club sandwich chicken egg food'],
  [17, 'grilled-chicken-sandwich', 'grilled chicken sandwich food'],
  [18, 'paneer-tikka-sandwich', 'Indian paneer sandwich food'],
  [19, 'chicken-tikka-wrap', 'chicken shawarma wrap food'],
  [20, 'paneer-tikka-wrap', 'paneer kathi roll food'],
  [21, 'chicken-wings', 'fried chicken wings food'],
  [22, 'french-fries', '"French fries with salt"'],
  [23, 'garlic-bread', 'garlic bread food'],
  [24, 'chicken-65', '"Chicken 65 - Sezan"'],
  [25, 'chocolate-brownie', 'chocolate brownie dessert'],
  [26, 'new-york-cheesecake', 'New York cheesecake slice'],
  [27, 'cold-coffee', 'iced coffee beverage'],
  [28, 'chocolate-milkshake', 'chocolate milkshake glass'],
  [29, 'fresh-lemon-soda', 'lemonade drink glass'],
  [30, 'coke', '"Glass of Cola"']
];

const outputDirectory = new URL('../src/assets/food/', import.meta.url);
await mkdir(outputDirectory, { recursive: true });
const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function getJson(url) {
  for (let attempt = 1; attempt <= 5; attempt += 1) {
    const response = await fetch(url, { headers: { 'User-Agent': 'BiteHouseCollegeProject/1.0 (educational use)' } });
    const body = await response.text();
    if (response.ok && body.startsWith('{')) return JSON.parse(body);
    if (attempt === 5) throw new Error(`Commons API failed after ${attempt} attempts: ${body.slice(0, 100)}`);
    await wait(attempt * 2500);
  }
}

const credits = [];
for (const [id, slug, query] of dishes) {
  const fileUrl = new URL(`${id}-${slug}.jpg`, outputDirectory);
  try {
    await access(fileUrl);
    console.log(`${id}. ${slug} already downloaded`);
    continue;
  } catch {
    // Download missing assets below.
  }
  await wait(1200);
  const params = new URLSearchParams({
    action: 'query', generator: 'search', gsrsearch: query, gsrnamespace: '6', gsrlimit: '8',
    prop: 'imageinfo', iiprop: 'url|mime', iiurlwidth: '1000', format: 'json', origin: '*'
  });
  const json = await getJson(`https://commons.wikimedia.org/w/api.php?${params}`);
  const pages = Object.values(json.query?.pages || {}).sort((a, b) => a.index - b.index);
  const match = pages.find((page) => page.imageinfo?.[0]?.thumburl && page.imageinfo[0].mime?.startsWith('image/'));
  if (!match) throw new Error(`No image found for ${query}`);

  const imageResponse = await fetch(match.imageinfo[0].thumburl, { headers: { 'User-Agent': 'BiteHouseCollegeProject/1.0 (educational use)' } });
  if (!imageResponse.ok) throw new Error(`Failed to download ${slug}: ${imageResponse.status}`);
  await writeFile(fileUrl, Buffer.from(await imageResponse.arrayBuffer()));
  credits.push({ id, dish: slug, source: match.imageinfo[0].descriptionurl, title: match.title });
  console.log(`${id}. ${slug} <- ${match.title}`);
}

await writeFile(new URL('sources.json', outputDirectory), `${JSON.stringify(credits, null, 2)}\n`);
