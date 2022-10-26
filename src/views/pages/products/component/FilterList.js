export const FilterList = [
    {
        name: 'Loại thuốc',
        id: 'category',
        values: [
            { title: 'Thuốc', val: 'Thuốc' },
            { title: 'Thực phẩm chức năng', val: 'Thực phẩm chức năng' },
            { title: 'Dụng cụ y tế', val: 'Dụng cụ y tế' },
        ]
    },
    {
        name: 'Giá',
        id: 'price',
        values: [
            { title: '< 300 000đ', val: [1, 299999] },
            { title: '300 000đ - 400 000đ', val: [300000, 399999] },
            { title: '400 000đ - 600 000đ', val: [400000, 599999] },
            { title: '600 000đ - 1 000 000đ', val: [600000, 999999] },
            { title: '1 000 000đ - 1 500 000đ', val: [1000000, 1499999] },
            { title: '> 1 500 000', val: [1500000, 99999999999999] },]
    },
    {
        name: 'Nhà sản xuất',
        id: 'producer',
        values: [
            { title: 'Abrigo Giovanni', val: 'Abrigo Giovanni' },
            { title: 'Altos Las Hormigas', val: 'Altos Las Hormigas' },
            { title: 'Andre Brunel', val: 'Andre Brunel' },
            { title: 'Arione', val: 'Arione' },
            { title: 'Bernhard Huber', val: 'Bernhard Huber' },
            { title: 'Bric Cenciurio', val: 'Bric Cenciurio' },
            { title: 'Castellari Bergaglio', val: 'Castellari Bergaglio' },
            { title: 'Cavalchina', val: 'Cavalchina' },
            { title: 'Champagne Mangin and Fils', val: 'Champagne Mangin and Fils' }]
    },
    {
        name: 'Độ tuổi',
        id: 'age',
        values: [
            { title: '< 6 tuổi', val: [0, 5.9] },
            { title: '6 - 12 tuổi', val: [6, 11.9] },
            { title: '12 - 18 tuổi', val: [12, 15.9] },
            { title: '18 - 60 tuổi', val: [18, 59.9] },
            { title: '> 60 tuổi', val: [60, 200] },]
    }
]