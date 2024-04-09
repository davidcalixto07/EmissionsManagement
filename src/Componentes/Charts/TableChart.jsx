import Table from "react-bootstrap/Table";

const TableChart = ({ headers, data, color = "#6610f2", overflow }) => {
  const tableData = data.map((row, rowIndex) => (
    <tr key={rowIndex}>
      {row.map((item, columnIndex) => (
        <td key={item}>{item}</td>
      ))}
    </tr>
  ));

  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          {headers.map((header) => (
            <th style={{ backgroundColor: color, color: "whitesmoke" }}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody style={{ height: 50, overflowY: overflow ? 'auto' : 'clip' }}>{tableData}</tbody>
    </Table>
  );
};

export default TableChart;
