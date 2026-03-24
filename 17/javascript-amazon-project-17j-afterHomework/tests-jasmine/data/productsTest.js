// 导入 products.js 相关类
import { Product, Clothing, Appliance } from "../../data/products.js";

// 创建整个文件的描述
describe("test suit: products.js", () => {
    // 这个函数类的功能是: (1)存储基础数据 (2)提供链接 (3)提供经过修饰的价格
    describe("test suit: products.js -> class Product", () => {
        let productExample;
        beforeEach(() => {
            // 创建一个被传入的普通物品: Ciri
            productExample = {
                id: "9baab029f463f330bb33ed5676aa4dfd",
                image: "images/products/9baab029f463f330bb33ed5676aa4dfd.jpg",
                name: "Ciri",
                rating: { stars: 5, count: 1 },
                priceCents: 9999,
                keywords: ["witcher 3", "yuedaiyan"],
            };
        });
        it("basic test: product (储存基础数据)", () => {
            const newProduct = new Product(productExample);
            expect(newProduct.id).toEqual("9baab029f463f330bb33ed5676aa4dfd");
            expect(newProduct.image).toEqual("images/products/9baab029f463f330bb33ed5676aa4dfd.jpg");
            expect(newProduct.name).toEqual("Ciri");
            expect(newProduct.rating).toEqual({ stars: 5, count: 1 });
            expect(newProduct.priceCents).toEqual(9999);
        });

        it("method test: getStarsUrl (提供类方法)", () => {
            const newProduct = new Product(productExample);
            expect(newProduct.getStarsUrl()).toEqual("images/ratings/rating-50.png");
        });
        it("method test: getPrice (提供经过修饰的价格)", () => {
            const newProduct = new Product(productExample);
            expect(newProduct.getPrice()).toEqual("99.99");
        });
    });

    // 这个函数的功能是: (1)继承父类 Product 的所有属性 (3)sizeChartLink (3)返回一个尺码表HTML链接
    describe("test suit: products.js -> class Clothing", () => {
        let productExample;
        let newProduct;
        // 创建一个被传入的衣服物品
        beforeEach(() => {
            productExample = {
                id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
                image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
                name: "Adults Plain Cotton T-Shirt - 2 Pack",
                rating: {
                    stars: 4.5,
                    count: 56,
                },
                priceCents: 799,
                keywords: ["tshirts", "apparel", "mens"],
                type: "clothing",
                sizeChartLink: "images/clothing-size-chart.png",
            };
            newProduct = new Clothing(productExample);
        });

        it("basic test: Clothing 继承父类: 基础储存服务", () => {
            expect(newProduct.id).toEqual("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");
            expect(newProduct.image).toEqual("images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg");
            expect(newProduct.name).toEqual("Adults Plain Cotton T-Shirt - 2 Pack");
            expect(newProduct.rating).toEqual({ stars: 4.5, count: 56 });
            expect(newProduct.priceCents).toEqual(799);
            expect(newProduct.sizeChartLink).toEqual("images/clothing-size-chart.png");
        });

        it("(toEqual() 方法) 测试 sizeChartLink 及返回 HTML", () => {
            expect(newProduct.extraInfoHTML()).toContain(`
        <a href="images/clothing-size-chart.png" target="_blank">
            Size chart 
        </a>
        `);
        });

        it("(DOM 方法) 测试 sizeChartLink 及返回 HTML", () => {
            // 通过被测试函数获得 HTML 字符串
            const newProductHTML = newProduct.extraInfoHTML();
            // 将上一步生成的字符串,生成 DOM (内存中)
            const newProductDOM = document.createElement("div");
            newProductDOM.innerHTML = newProductHTML;
            // 获得 <a> 元素
            const aEl = newProductDOM.querySelector("a");
            expect(aEl).not.toBeNull();
            expect(aEl.getAttribute("href")).toEqual("images/clothing-size-chart.png");
            expect(aEl.getAttribute("target")).toEqual("_blank");
            expect(aEl.textContent.trim()).toEqual("Size chart");
        });
    });

    // 这个函数的功能: (1)继承父类 Product 的所有属性 (2)通过 extraInfoHTML 返回一段 HTML, 其中包含两个<a>
    describe("test suit: products.js -> class Appliance", () => {
        let productExample;
        let newAppliance;
        beforeEach(() => {
            // 创建一个被传入的电器物品
            productExample = {
                id: "0d7f9afa-2efe-4fd9-b0fd-ba5663e0a524",
                image: "images/products/coffeemaker-with-glass-carafe-black.jpg",
                name: "Coffeemaker with Glass Carafe and Reusable Filter - 25 Oz, Black",
                rating: {
                    stars: 4.5,
                    count: 1211,
                },
                priceCents: 2250,
                keywords: ["coffeemakers", "kitchen", "appliances"],
                type: "appliance",
                instructionsLink: "/images/appliance-instructions.png",
                warrantyLink: "/images/appliance-warranty.png",
            };
            newAppliance = new Appliance(productExample);
        });

        it("basic test: 继承父类属性 & 本身属性", () => {
            expect(newAppliance.id).toEqual("0d7f9afa-2efe-4fd9-b0fd-ba5663e0a524");
            expect(newAppliance.image).toEqual("images/products/coffeemaker-with-glass-carafe-black.jpg");
            expect(newAppliance.rating).toEqual({
                stars: 4.5,
                count: 1211,
            });
            expect(newAppliance.priceCents).toEqual(2250);
            expect(newAppliance.instructionsLink).toEqual("/images/appliance-instructions.png");
            expect(newAppliance.warrantyLink).toEqual("/images/appliance-warranty.png");
        });

        it("类方法测试: extraInfoHTML() test", () => {
            const HTML = newAppliance.extraInfoHTML();
            const DOM = document.createElement("div");
            DOM.innerHTML = HTML;

            // 获取两个<a>标签
            const aEls = DOM.querySelectorAll("a");
            const aEl_1 = aEls[0];
            const aEl_2 = aEls[1];

            // 测试第一个<a>
            expect(aEl_1).not.toBeNull();
            expect(aEl_1.getAttribute("href")).toEqual("/images/appliance-instructions.png");
            expect(aEl_1.getAttribute("target")).toEqual("_blank");
            expect(aEl_1.textContent.trim()).toEqual("Instructions");

            // 测试第二个<a>
            expect(aEl_2).not.toBeNull();
            expect(aEl_2.getAttribute("href")).toEqual("/images/appliance-warranty.png");
            expect(aEl_2.getAttribute("target")).toEqual("_blank");
            expect(aEl_2.textContent.trim()).toEqual("Warranty");
        });
    });
});
