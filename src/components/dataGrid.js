import React, { useState, useEffect } from 'react'
import ReactTable from "react-table";
import "react-table/react-table.css";
import createRowData from './createRowData'

export default function Grid() {
    const [gridData, setGridData] = useState([])

    useEffect(() => {
        let rowData = createRowData(50)
        setGridData(rowData)
    }, [])
    let rowData = createRowData(50)
    console.log(rowData, 'rowData')

    const defaultColumnProperties = {
        width: 160,
        sortable: true
    };
    const columns = [
        {
            key: "serailNum",
            name: "S.No"
        },
        {
            key: "clientId",
            name: "Client Id"
        },
        {
            key: "name",
            name: "Name"
        },
        {
            key: "email",
            name: "Email Id"
        },
        {
            key: "phoneNum",
            name: "Phone Number"
        },
        {
            key: "brandName",
            name: "Brand Name"
        },
        {
            key: "status",
            name: "Status"
        },
        {
            key: "actions",
            name: "Actions"
        },
        {
            key: "firstName",
            name: "First Name"
          },
    ].map((c) => ({ ...c, ...defaultColumnProperties }));
    const statusActions = [
        {
            icon: <span className="glyphicon glyphicon-remove" />,
            callback: () => {
              alert("Deleting");
            }
          }
      ];
    // const getCellActions = (column, row) => {
    //     const cellActions = {
    //         actions: statusActions
    //     };
    //     return cellActions[column.key]
    //   }

    if (!gridData || !columns) return null;
    const firstNameActions = [
        {
          icon: <span className="glyphicon glyphicon-remove" />,
          callback: () => {
            alert("Deleting");
          }
        },
        {
          icon: "glyphicon glyphicon-link",
          actions: [
            {
              text: "Option 1",
              callback: () => {
                alert("Option 1 clicked");
              }
            },
            {
              text: "Option 2",
              callback: () => {
                alert("Option 2 clicked");
              }
            }
          ]
        }
      ];
    function getCellActions(column, row) {
        const cellActions = {
          firstName: firstNameActions
        };
        return row.id % 2 === 0 ? cellActions[column.key] : null;
      }
      console.log(gridData, 'gridData')
    return (
        <div className="m-3">
            <ReactDataGrid
                columns={columns}
                rowGetter={(i) => gridData[i]}
                rowsCount={50}
                minHeight={500}
                getCellActions={getCellActions}
            />
        </div>
    );
}