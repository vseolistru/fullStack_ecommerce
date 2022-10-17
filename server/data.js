import bcrypt from 'bcryptjs'
//mock
const data = {
    users: [
        {
            username: 'vknseo',
            email: 'vknseo@google.com',
            password: bcrypt.hashSync('somepass'),
            isAdmin: true,
        }

    ],
    products: [
        {
            name: 'Nike Slim shits',
            slug: 'nike-slim-shits',
            category: 'Shirts',
            image: '/images/p1.jpg',
            price : 1800,
            countInStock: 10,
            brand: 'Nike',
            ratting: 6.5,
            numReviews: 5,
            description: 'High quality nike shirts'
        },
        {
            name: 'Adidas Fit shits',
            slug: 'adidas-fit-shits',
            category: 'Shirts',
            image: '/images/p2.jpg',
            price : 1600,
            countInStock: 12,
            brand: 'Adidas',
            ratting: 5.6,
            numReviews: 8,
            description: 'High quality adidas shirts'
        },
        {
            name: 'Nike Slim pants',
            slug: 'nike-slim-pants',
            category: 'Shirts',
            image: '/images/p3.jpg',
            price : 2600,
            countInStock: 7,
            brand: 'Nike',
            ratting: 4.7,
            numReviews: 14,
            description: 'High quality nike pants'
        },
        {
            name: 'Adidas Fit pants',
            slug: 'adidas-fit-pants',
            category: 'Pants',
            image: '/images/p4.jpg',
            price : 2200,
            countInStock: 8,
            brand: 'Adidas',
            ratting: 4.4,
            numReviews: 12,
            description: 'High quality adidas pants'
        }
    ],


}
export default data;