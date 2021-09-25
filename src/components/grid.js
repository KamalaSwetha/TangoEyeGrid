import React, { useState, useEffect, useRef } from 'react'
import { AgGridReact } from "@ag-grid-community/react";
import {
  AllCommunityModules
} from "@ag-grid-community/all-modules";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import createRowData from './createRowData'

export function ValidateButtons(params) {
  return (
    <span>
      <button onClick={() => params.onClick('validate', params.data)} className='btn btn-primary' style={{ backgroundColor: 'green' }}>Validate</button>
      <button onClick={() => params.onClick('decline', params.data)} className='btn btn-primary' style={{ backgroundColor: 'red' }}>Decline</button>
    </span>
  )
}
export default function Grid() {
  const [gridData, setGridData] = useState([])
  const [dataChange, setDataChange] = useState(false)
  const gridApi = useRef();

  useEffect(() => {
    let rowData = createRowData(150)
    setGridData(rowData)
  }, [])
  const defaultColumnProperties = {
    sortable: true,
    resizable: true,
    filter: true,
  };
  const columns = [
    {
      headerName: "Select All",
      children: [
        {editable: true,
        headerCheckboxSelection:true,
        // headerCheckboxSelectionFilteredOnly:true,
        checkboxSelection:true,
        width: 100}
      ]
    },
    {
      headerName: 'Client Details',
      cellStyle: {textAlign: 'center'},
      children: [
        {
          field: "serailNum",
          headerName: "S.No",
          width: 100
        },
        {
          field: "clientId",
          headerName: "Client Id",
          width: 120
        },
        {
          field: "name",
          headerName: "Name",
          width: 150
        },
        {
          field: "email",
          headerName: "Email Id",
          width:250
        },
        {
          field: "phoneNum",
          headerName: "Phone Number",
          width: 150
        },
        {
          field: "brandName",
          headerName: "Brand Name",
          width:230
        },
        {
          field: "status",
          headerName: "Status",
          width: 100
        },
      ]
    },
    {
      headerName: "Action",
      cellStyle: {textAlign: 'center'},
      children: [
        {headerName: "Validate/Decline",
          cellRendererFramework: (data) => ValidateButtons(data),
          cellRendererParams: {
            onClick: (type, data) => handleStatus(type, data)
          }}
      ]
    }
  ]
  const handleStatus = (type, data) => {
    let index = gridData.findIndex((val) => val.serailNum === data.serailNum)
    if (type == 'validate') {
      gridData[index].status = 'Confirmed'
    } else if (type == 'decline') {
      gridData[index].status = 'Declined'
    }
    setDataChange(!dataChange)
    setGridData(gridData)
  }
  const onGridReady = params => {
    gridApi.current = params.api
  };
  const onQuickFilterChanged = () => {
    gridApi.current.setQuickFilter(document.getElementById("quickFilter").value);
  }
  return (

    <div
      className="ag-theme-alpine m-3"
      style={{ height: "600px", width: "95%" }}
    >
      <div style={{ marginBottom: "30px" }}>
        <div class="form-outline">
          <input type="text"
            onInput={onQuickFilterChanged}
            id="quickFilter"
            placeholder="Quick filter..." class="form-control"
            aria-label="Search" />
        </div>
      </div>
      <AgGridReact
        onGridReady={onGridReady}
        columnDefs={columns}
        defaultColDef={defaultColumnProperties}
        rowData={gridData}
        modules={AllCommunityModules}
        pagination={true}
        paginationAutoPageSize={true}
        rowSelection={'multiple'}
        suppressColumnVirtualisation
      />
    </div>
  )
}