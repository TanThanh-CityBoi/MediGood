import React from 'react';
import { useNavigate } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid';
import './TransactionTable.scss';

const datagridSx = {
    "& .css-jz7yqw-MuiDataGrid-virtualScrollerContent": {
        height: "100% !important"
    },
    '& div[data-rowIndex][role="row"]': {
        color: "#000",
        fontSize: 14,
        //risky
        minHeight: "40px !important",
        height: "40px !important",
        "& div": {
            minHeight: "40px !important",
            height: "40px !important",
            lineHeight: "40px !important"
        },
        '& .super-app.receipt_status_0': {
            color: '#adb5bd',
        },
        '& .super-app.receipt_status_1': {
            color: '#FFB246',
        },
        '& .super-app.receipt_status_2': {
            color: '#03b181',
        },
        '& .super-app.receipt_status_3': {
            color: '#618C46',
        },
        '& .super-app.receipt_status_4': {
            color: '#0d6efd',
        },
        '& .super-app.receipt_status_5': {
            color: '#ff0018',
        },
    },
    "& .MuiDataGrid-columnHeaders": {
        backgroundColor: "rgba(127, 127, 127, 0.44)",
        color: "#000",
        fontSize: 14,
        fontWeight: '600',
        fontFamily: 'Montserrat',
    },
    "& .MuiTablePagination-root": {
        fontSize: 14
    },
    "& MuiTablePagination-displayedRows": {
        fontSize: 14
    }
};


const TransactionTable = ({ rowDocs, columnDocs, filter }) => {
    const navigate = useNavigate();
    const onCellClick = (params, event) => {
        console.log("id selected: ", params.id);
        navigate('/chi-tiet-hoa-don/' + params.id);
    }

    const getShowingData = (filter) => {
        if (filter === "") return rowDocs;
        var res = [];
        rowDocs.forEach((rowDoc) => {
            var vals = Object.values(rowDoc);
            var isFind = false;
            vals.forEach(val => {
                if (val.toString().indexOf(filter) !== -1) {
                    isFind = true;
                }
            });
            if (isFind) return res.push(rowDoc);
        })
        return res;
    }

    return (
        <div
            style={{ height: 500, width: '100%' }}
            className="datagrid-container"
        >
            <DataGrid
                rows={getShowingData(filter)}
                columns={columnDocs}
                pageSize={8}
                rowsPerPageOptions={[8]}
                sx={datagridSx}
                onCellClick={(params, event) => onCellClick(params, event)}
            />
        </div>
    );
}

export { TransactionTable };