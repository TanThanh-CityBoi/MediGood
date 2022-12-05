import React, { useEffect, useState } from "react"
import { useNavigate, createSearchParams, useLocation } from "react-router-dom"
import { Accordion, Container } from 'react-bootstrap'
import './FilterComponent.scss'
import { useDispatch } from "react-redux"
import { productActions } from "../../../../actions/product.actions"
import { FilterList } from "./FilterList"

const convertFilter = (listCheck, filters) => {
    const queryFilter = {
        category: [],
        price: [],
        producer: [],
        age: []
    }
    listCheck.forEach((val, idx) => {
        switch (idx) {
            case 0:
                val.forEach((val2, idx2) => {
                    queryFilter.category.push(filters[idx].values[val2].val);
                });
                break;
            case 1:
                val.forEach((val2, idx2) => {
                    queryFilter.price.push(filters[idx].values[val2].val[0], filters[idx].values[val2].val[1]);
                });
                break;
            case 2:
                val.forEach((val2, idx2) => {
                    queryFilter.producer.push(filters[idx].values[val2].val);
                });
                break;
            case 3:
                val.forEach((val2, idx2) => {
                    queryFilter.age.push(filters[idx].values[val2].val[0], filters[idx].values[val2].val[1]);
                });
                break;
            default: break;
        }

    })
    console.log("===========query filter============: ", queryFilter);
    return queryFilter;
}

function FilterComponent(props) {
    const filters = FilterList;
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
    const initCheck = [[], [], [], []]
    const [listCheck, setListCheck] = useState(initCheck);

    function useQuery() {
        const { search } = useLocation();
        return React.useMemo(() => new URLSearchParams(search), [search]);
    }
    const query = useQuery()
    const initPramSearch = { category: [], price: [], producer: [], age: [] };
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
        if (query.has('category')) {
            var categorys = query.getAll('category')
            categorys.forEach((val, idx) => {
                newParam.category.push(val);
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

        if (query.has('producer')) {
            var producers = query.getAll('producer')
            producers.forEach((val, idx) => {
                newParam.producer.push(val);
                if (filter2[2].includes(val)) listCheck[2].push(filter2[2].indexOf(val));
            })
        }

        if (query.has('age')) {
            var ages = query.getAll('age')
            ages.forEach((val, idx) => {
                newParam.age.push(val);
                if (filter2[3].includes(val)) listCheck[3].push(filter2[3].indexOf(val));
            })
        }

        setParamSearch(newParam);
        console.log("=========list check=========== ", listCheck);
        const queryBE = convertFilter(listCheck, filters);
        dispatch(productActions.getList(queryBE));
    }, [])

    useEffect(() => {
        if (!query.has('age') && !query.has('category') && !query.has('price') && !query.has('producer')) {
            setListCheck(initCheck);
            setParamSearch(initPramSearch);
        }
        else {
            const queryBE = convertFilter(listCheck, filters);
            dispatch(productActions.getList(queryBE));
        }
    }, [query])

    return (
        <Container className="filter-component-wrapper">
            <h1>Sản phẩm</h1>
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