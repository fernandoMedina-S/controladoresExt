import DataTable, { createTheme } from "react-data-table-component";
import Button from "@mui/material/Button";

import { columns } from "../../Models/tableData";

import 'react-toastify/dist/ReactToastify.css';


createTheme(
  "solarized",
  {
    text: {
      primary: "#f2e9e4",
      secondary: "#c9ada7",
    },
    background: {
      default: "#22223b",
    },
    context: {
      background: "#cb4b16",
      text: "#FFFFFF",
    },
    divider: {
      default: "#9a8c98",
    },
    action: {
      button: "rgba(0,0,0,.54)",
      hover: "rgba(0,0,0,.08)",
      disabled: "rgba(0,0,0,.12)",
    },
  },
  "dark"
);

const ControlTable = (props) => {
  const handleClick = (id) => {
    props.changeState(id);
    props.changeProgress(id);
  };

  const signalHandler = (id) => {
    props.handleSignal(id);
  }

  const handleDelete = (id) => {
    props.handleDelete(id);
  }

  return (
    <div className="control-table__main-container">
      <DataTable
        title="Administración de dispositivos de E/S"
        columns={[
          ...columns,
          {
            cell: (row) => (
              <>
                <Button
                  variant="contained"
                  color="info"
                  size="small"
                  onClick={() => signalHandler(row.id)}
                >
                  Señal
                </Button>
              </>
            ),
            
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
          },
          {
            cell: (row) => (
              <>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={() => handleClick(row.id)}
                >
                  Cambiar
                </Button>
              </>
            ),
            
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
          },
          {
            cell: (row) => (
              <>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleDelete(row.id)}
                >
                  Quitar
                </Button>
              </>
            ),
            
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
          },
        ]}
        data={props.devices}
        fixedHeader
        theme="solarized"
        className="control-table__data-table"
        noDataComponent={<h1>No hay dispositivos</h1>}
      />
    </div>
  );
};

export default ControlTable;
