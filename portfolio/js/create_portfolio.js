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
        new Product('https://incubationwork.github.io/kayalvizhi-K/javascript/eligibility/index.html','voting_eligibility.jpeg','Voting Eligibility'),
        new Product('https://incubationwork.github.io/kayalvizhi-K/javascript/even_number/index.html','even_number.jpeg','Even Number'),
        new Product('https://incubationwork.github.io/kayalvizhi-K/javascript/sum_of_digit/index.html','sum_of_digits.jpeg','Sum of Digits'),
        new Product('https://incubationwork.github.io/kayalvizhi-K/javascript/filter/index.html','filter_items.jpeg','Filter Items'),
        new Product('https://incubationwork.github.io/kayalvizhi-K/javascript/square_root/index.html','square_of_a_number.jpeg','Square a list of Numbers'),
        new Product('https://incubationwork.github.io/kayalvizhi-K/javascript/fizz-buzz/index.html','fizz_buzz.png','Fizz Buzz'),
        new Product('https://incubationwork.github.io/kayalvizhi-K/javascript/todo_list/second/index.html','Todo_list.png','TODO List'),
        new Product('https://incubationwork.github.io/kayalvizhi-K/javascript/monster_attack/index.html','Monster_attack.png','Monster Attack'),
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