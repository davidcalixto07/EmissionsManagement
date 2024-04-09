import React, { useState, useEffect } from "react";
import Papa from "papaparse";

const CsvReaderWithRowFilter = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("Base_datos.csv");
        const text = await response.text();

        Papa.parse(text, {
          header: false,
          dynamicTyping: true,
          complete: (result) => {
            setData(result.data);
          },
          error: (error) => {
            console.error("Error parsing CSV:", error.message);
          },
        });
      } catch (error) {
        console.error("Error fetching CSV:", error);
      }
    };

    fetchData();
  }, []);

  const filterData = () => {
    const filteredData = data.filter((row) => {
      return (
        row[0] === "Petrol" &&
        row[1] === "Mini" &&
        row[2] === "Euro 4" &&
        row[3] === "GDI" &&
        row[4] === "CO"
      );
    });
    console.log("Datos filtrados:", filteredData);
    return filteredData[0];
  };

  const filteredData = filterData();

  return (
    <div>
      hola Datos filtrados: {filteredData[8]},{filteredData[9]}{" "}
    </div>
  );
};

export default CsvReaderWithRowFilter;
