import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./DataTableComponent.scss";

const datagridSx = {
  borderRadius: 2,
  "& .MuiDataGrid-columnHeaders": {
    color: "#000",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Montserrat",
    "& svg": {
      color: "white",
    },
  },
  "& .MuiTablePagination-root": {
    fontSize: 14,
  },
  "& MuiTablePagination-displayedRows": {
    fontSize: 14,
  },
};

const DataTableComponent = ({
  checkboxSelection,
  autoHeight,
  rowHeight,
  rowDocs,
  columnDocs,
  filter,
  onRowClick,
}) => {
  const [selectionModel, setSelectionModel] = React.useState([]);

  const handleOnRowClick = (e) => {
    if (onRowClick) {
      onRowClick(e);
    }
  };

  const getShowingData = (filter) => {
    if (!filter) return rowDocs;
    filter.toString();

    if (filter === "") return rowDocs;
    const res = rowDocs.filter((row) => {
      console.log(JSON.stringify(row).indexOf(filter), JSON.stringify(row));
      return JSON.stringify(row).indexOf(filter) !== -1;
    });
    return res;
  };

  return (
    <div
      style={
        autoHeight
          ? { maxHeight: 750, width: "100%" }
          : { height: 750, width: "100%" }
      }
      className="datagrid-container-wrapper"
    >
      {selectionModel?.length > 0 && (
        <span className="selected-rows-count">
          Đã chọn {selectionModel.length} hàng.{" "}
          <strong>Xóa hàng đã chọn</strong>
        </span>
      )}
      <DataGrid
        rows={getShowingData(filter)}
        columns={columnDocs}
        checkboxSelection={!!checkboxSelection}
        pageSize={10}
        onSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);
          console.log(selectionModel);
        }}
        selectionModel={selectionModel}
        sx={datagridSx}
        rowHeight={rowHeight || 48}
        onRowClick={handleOnRowClick}
        disableSelectionOnClick
        hideFooterSelectedRowCount
        autoHeight={!!autoHeight}
      />
    </div>
  );
};

export default DataTableComponent;
