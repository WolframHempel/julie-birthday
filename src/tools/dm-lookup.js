export async function dmLookup(ean) {
    const url = `https://product-search.services.dmtech.com/de/search?query=${ean}&searchType=product&type=search`;
    const result = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
    const response = await result.json();
    const data = JSON.parse(response.contents);
    if (data.count === 0 || !data.products[0]) {
        return null;
    }

    return {
        name: data.products[0].name,
        price: data.products[0].price.value,
        image: data.products[0].imageUrlTemplates[0]
    }

}