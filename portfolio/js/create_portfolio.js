class Product{

    constructor(webpageUrl,image,title){
        this.webpageUrl=webpageUrl;
        this.image=image;
        this.title=title;
    }
}

const productList = {
    products: [
        new Product('https://incubationwork.github.io/kayalvizhi-K/testing/sample.html','portfolio6.jpeg','Flickr Page'),
        new Product('https://incubationwork.github.io/kayalvizhi-K/real-time-character-counter/index.html','portfolio5.jpeg','Real Time Character Counter'),
        new Product('https://incubationwork.github.io/kayalvizhi-K/calculator/index.html','portfolio2.jpeg','Flickr Page'),
    ],
    render(){
        const prodContainer = document.getElementById('add-item');
        const prodList = document.createElement('ul');
        prodList.className = "product-list";
        for(const prod of this.products){
            const prodEl = document.createElement('li');
            prodEl.className = "product-item";
            prodEl.innerHTML = `
            <div class="portfolio-item padd-15">
                <div class="portfolio-item-inner shadow-dark">
                    <div class="portfolio-img">
                        <a href="${prod.webpageUrl}">
                            <img src="images/${prod.image}" alt="">
                        </a>
                    </div>
                    <p  style="text-align: center; font-weight: 600;">${prod.title}</p>
                </div>
             </div>
            `;
            prodList.append(prodEl);
        }
        prodContainer.append(prodList);

    }
};
productList.render();