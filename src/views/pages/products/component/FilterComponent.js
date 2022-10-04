import React, { useEffect, useState } from "react"
import { useNavigate, createSearchParams, useLocation } from "react-router-dom"
import { Accordion, Container } from 'react-bootstrap'
import './FilterComponent.scss'
import { useDispatch } from "react-redux"
import { productActions } from "../../../../actions/product.actions"

const convertFilter = (listCheck, filters) => {
    const queryFilter = {
        color: [],
        price: [],
        capacity: [],
        concentrationPercent: [],
        producer: [],
        foods: [],
        productType: "wine"
    }
    listCheck.forEach((val, idx) => {
        switch (idx) {
            case 0:
                val.forEach((val2, idx2) => {
                    queryFilter.color.push(filters[idx].values[val2].val);
                });
                break;
            case 1:
                val.forEach((val2, idx2) => {
                    queryFilter.price.push(filters[idx].values[val2].val[0], filters[idx].values[val2].val[1]);
                });
                break;
            case 2:
                val.forEach((val2, idx2) => {
                    queryFilter.capacity.push(filters[idx].values[val2].val);
                });
                break;
            case 3:
                val.forEach((val2, idx2) => {
                    var priceObject = { _min: filters[idx].values[val2].val[0], _max: filters[idx].values[val2].val[1] };
                    queryFilter.concentrationPercent.push(priceObject);
                });
                break;
            case 4:
                val.forEach((val2, idx2) => {
                    queryFilter.producer.push(filters[idx].values[val2].val);
                });
                break;
            case 5:
                val.forEach((val2, idx2) => {
                    queryFilter.foods.push(filters[idx].values[val2].val);
                });
                break;
            default: break;
        }

    })
    console.log("query filter: ", queryFilter);
    return queryFilter;
}

function FilterComponent(props) {
    const filters = [
        {
            name: 'Màu sắc',
            id: 'color',
            values: [{ title: 'Đỏ', val: 'red' }, { title: 'Hồng', val: 'pink' }, { title: 'Trắng', val: 'white' }]
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
            name: 'Dung tích',
            id: 'capacity',
            values: [
                { title: '250 ml', val: 250 },
                { title: '375 ml', val: 375 },
                { title: '500 ml', val: 500 },
                { title: '750 ml', val: 750 },
                { title: '1 L', val: 1000 },
                { title: '1.5 L', val: 1500 },
                { title: '2 L', val: 2000 },
                { title: '3 L', val: 3000 }]
        },
        {
            name: 'Độ cồn   ',
            id: 'concentrationPercent',
            values: [{ title: '< 10', val: [1, 9.99] }, { title: '10 - 20', val: [10, 19.99] }, { title: '20 - 40', val: [20, 39.99] }, { title: '> 40', val: [40, 100] }]
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
            name: 'Thực phẩn phù hợp',
            id: 'foods',
            values: [
                { title: "Phô mai", val: "Phô mai" },
                { title: "Bánh ngọt", val: "Bánh ngọt" },
                { title: "Thịt gà", val: "Thịt gà" },
                { title: "Thịt lợn", val: "Thịt lợn" },
                { title: "Thịt vịt", val: "Thịt vịt" },
                { title: "Rau củ quả", val: "Rau củ quả" },
                { title: "Hải sản", val: "Hải sản" },
                { title: "Thịt thỏ", val: "Thịt thỏ" },
                { title: "Thịt cừu", val: "Thịt cừu" },]
        }
    ]
    //----------------------------------------------filter 2---------------------------------------------------------//
    var filter2 = [[]]//Lưu giá trị, không lưu trường
    filters.forEach((val, idx) => {
        var child = [];
        val.values.forEach((val2, idx2) => {
            child.push(val2.val.toString());
        })
        filter2.push(child);
    })
    filter2 = [...filter2.slice(1)]

    //--------------------------------------------------------------------------------------------------------//
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const initCheck = [[], [], [], [], [], []]
    const [listCheck, setListCheck] = useState(initCheck);

    function useQuery() {
        const { search } = useLocation();
        return React.useMemo(() => new URLSearchParams(search), [search]);
    }
    const query = useQuery()
    const initPramSearch = { color: [], price: [], capacity: [], concentrationPercent: [], producer: [], foods: [] };
    const [paramSearch, setParamSearch] = useState(initPramSearch);

    //-----------------------------------handle check---------------------------------------------------------//
    const handleCheck = (index, idx) => {
        var newParam = { ...paramSearch }
        var arr = [...listCheck]

        if (listCheck[index].includes(idx)) {

            var indexArr = [...arr[index].slice(0, arr[index].indexOf(idx)), ...arr[index].slice(arr[index].indexOf(idx) + 1)]
            setListCheck([...arr.slice(0, index), indexArr, ...arr.slice(index + 1)]);

            newParam[filters[index].id] = [...newParam[filters[index].id].slice(0, paramSearch[filters[index].id].indexOf(filter2[index][idx])),
            ...newParam[filters[index].id].slice(paramSearch[filters[index].id].indexOf(filter2[index][idx]) + 1)];
            setParamSearch(newParam);
        }
        else {

            var indexArr1 = [...arr[index]];
            indexArr1.push(idx);
            setListCheck([...arr.slice(0, index), indexArr1, ...arr.slice(index + 1)]);

            newParam[filters[index].id].push(filter2[index][idx]);
            setParamSearch(newParam);
        }
        navigate({
            pathname: '/san-pham',
            search: `?${decodeURIComponent(createSearchParams(newParam))}`,
        });
    }

    useEffect(() => {
        var newParam = { ...paramSearch }
        if (query.has('color')) {
            var colors = query.getAll('color')
            colors.forEach((val, idx) => {
                newParam.color.push(val);
                if (filter2[0].includes(val)) listCheck[0].push(filter2[0].indexOf(val));
            })
        }

        if (query.has('price')) {
            var prices = query.getAll('price')
            prices.forEach((val, idx) => {
                newParam.price.push(val);
                if (filter2[1].includes(val)) listCheck[1].push(filter2[1].indexOf(val));
            })
        }

        if (query.has('capacity')) {
            var capacitys = query.getAll('capacity')
            capacitys.forEach((val, idx) => {
                newParam.capacity.push(val);
                if (filter2[2].includes(val)) listCheck[2].push(filter2[2].indexOf(val));
            })
        }

        if (query.has('concentrationPercent')) {
            var concentrationPercents = query.getAll('concentrationPercent')
            concentrationPercents.forEach((val, idx) => {
                newParam.concentrationPercent.push(val);
                if (filter2[3].includes(val)) listCheck[3].push(filter2[3].indexOf(val));
            })
        }
        if (query.has('producer')) {
            var producers = query.getAll('producer')
            producers.forEach((val, idx) => {
                newParam.producer.push(val);
                if (filter2[4].includes(val)) listCheck[4].push(filter2[4].indexOf(val));
            })
        }
        if (query.has('foods')) {
            var foods = query.getAll('foods')
            foods.forEach((val, idx) => {
                newParam.foods.push(val);
                if (filter2[5].includes(val)) listCheck[5].push(filter2[5].indexOf(val));
            })
        }
        setParamSearch(newParam);
        console.log("list check: ", listCheck);
        const queryBE = convertFilter(listCheck, filters);
        dispatch(productActions.getList(queryBE));
    }, [])

    useEffect(() => {
        if (!query.has('color') && !query.has('price') && !query.has('producer') && !query.has('foods') && !query.has('concentrationPercent') && !query.has('capacity')) {
            setListCheck(initCheck);
            setParamSearch(initPramSearch);
        }
        else{

            const queryBE = convertFilter(listCheck, filters);
            dispatch(productActions.getList(queryBE));
        }
    }, [query])

    return (
        <Container className="filter-component-wrapper">
            <h1>Rượu</h1>
            <div className="filter-group">
                <Accordion defaultActiveKey={['0', '1']} alwaysOpen>
                    {filters.map((item, index) => (
                        <Accordion.Item eventKey={index.toString()} key={index} className={'filter-item'}>
                            <Accordion.Header className="item-header">{item.name}</Accordion.Header>
                            {item.values.map((val, idx) => (
                                <Accordion.Body key={idx}>
                                    <input type="checkbox" name={val.title} checked={listCheck[index].includes(idx)} onChange={() => handleCheck(index, idx)} />
                                    <label htmlFor={val.title} onClick={() => handleCheck(index, idx)}>{val.title}</label>
                                </Accordion.Body>
                            ))}
                        </Accordion.Item>
                    ))}
                </Accordion>
            </div>
        </Container>
    )
}
export { FilterComponent }