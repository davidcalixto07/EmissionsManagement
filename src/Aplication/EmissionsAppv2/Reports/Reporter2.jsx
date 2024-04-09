import React from "react";
import { Document, Page, Text, View, StyleSheet, PDFViewer, Image } from "@react-pdf/renderer";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const jsonData = {
  "Generales": {
    "numeroReporte": 1840,
    "fecha": "07/28/2023",
    "Fbateria": "TipoA",
    "latitud": "4.60971",
    "longitud": "-74.08175",
    "operador": "Esteban Sanchez",
    "NombreCon": "TEA2024",
    "NombreCampo": { "campo1": "Campo A", "campo2": "Campo B", "campo3": "Campo C" }
  },
  "TEAS": [
    {
      "id": "TEA001",
      "altura": "10",
      "diametro": "1",
      "Ainstalacion": "2014",
      "Ffun": "60",
      "Hfun": "2",
      "Segmento": "A",
      "medicion": "manual",
      "medidor": "manual",
      "serial": "xzer21",
      "vgqocp": "20",
      "vgqpi": "15",
      "vgnqpe": "15",
      "vgqgp": "12",
      "vgqpp": "10",
      "vgqev": "8",
      "gvirc": "3",
      "qpenp": "2",
      "fe": "0.5",
      "Tr": "0.3",
      "FF": "3",
      "vgqenp": "2",
      "qppp": "3",
      "KPCA": "200",
      "CE": "20",
      "DRE": "30",
      "C1": "20",
      "C2": "20",
      "C3": "20",
      "C4": "20",
      "C5": "20",
      "C6+": "20",
      "H2": "20",
      "C02": "20",
      "ECO2": "20",
      "ECH4": "20",
      "EN20": "20",
      "ECO2e": "200",



    },


  ],


};

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    color: "black",
    padding: 8,
  },
  section: {
    margin: 1,
    padding: 1,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
  tableRow: { flexDirection: "row" },
  tableCol: { flexDirection: "column" },
  tableRow2: {
    flexDirection: "row",
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: "rgb(242,242,242)"
  },
  tableRow3: {
    flexDirection: "row",
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: "white"
  },

  tableCell: {
    flex: 1,
    fontSize: 10,
    padding: 0,
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    justifyContent: 'center',
  },
  tableCell2: {
    fontSize: "0.8vw",
    padding: 0,
    borderStyle: "solid",
    borderColor: "black",
    justifyContent: "center",
  },
  text1: {
    fontSize: "0.8vw",
    textAlign: 'center',


  },
  text2: {
    fontSize: "1.1vw",
    textAlign: 'center',
    fontWeight: "bold"


  }
});

const Reporter2 = () => {
  const nav = useNavigate();

  return (
    <div>
      <Button onClick={() => nav('/Emissions/')}>
        Back to overview
      </Button>
      <PDFViewer style={{ width: "100%", height: "calc(100vh - 48px)" }}>
        <Document>
          <Page orientation="landscape" size="A4" style={styles.page}>
            <View style={styles.section}>
              <View style={styles.table}>
                {/*Encabezado 1*/}
                <View style={{ ...styles.tableRow }}>
                  <Image src={'/logoHc.jpeg'} style={{ width: 100, height: 50 }} />
                  <View style={{ ...styles.tableRow3, width: "80%", flexDirection: "column" }}><Text style={styles.text2}>FORMATO REPORTE DE EFICIENCIA DE COMBUSTIÓN EN TEA</Text><Text style={styles.text2}>AGENCIA NACIONAL DE HIDROCARBUROS</Text></View>
                  <View style={{ ...styles.tableRow3, width: "20%", flexDirection: "column" }}><Text style={styles.text2}>ANH-COV-FR-20</Text><Text style={styles.text2}>30/10/2023</Text><Text style={styles.text2}>Versión 1</Text></View>

                </View>
                {/*fila 1*/}
                <View style={styles.tableRow}>
                  <View style={styles.tableCell}><Text>Número de Reporte: </Text></View>
                  <View style={styles.tableCell}><Text>{jsonData.Generales.numeroReporte}</Text></View>
                  <View style={styles.tableCell}><Text>Fecha de presentación (dd/mm/aaaa): </Text></View>
                  <View style={styles.tableCell}><Text>{jsonData.Generales.fecha}</Text></View>
                </View>
                {/*Fila 2*/}
                <View style={styles.tableRow}>
                  <View style={styles.tableCell}><Text>Facilidad de Batería</Text></View>
                  <View style={styles.tableCell}><Text>{jsonData.Generales.Fbateria}</Text></View>
                  <View style={styles.tableCell}><Text>Ubicación en coordenadas</Text></View>
                  <View style={styles.tableCell}><Text>Latitud</Text></View>
                  <View style={styles.tableCell}><Text>{jsonData.Generales.latitud}</Text></View>
                  <View style={styles.tableCell}><Text>Longitud</Text></View>
                  <View style={styles.tableCell}><Text>{jsonData.Generales.longitud}</Text></View>
                </View>
                {/*Fila 3*/}
                <View style={styles.tableRow}>
                  <View style={styles.tableCell}><Text>Operador</Text></View>
                  <View style={styles.tableCell}><Text>{jsonData.Generales.operador}</Text></View>
                  <View style={styles.tableCell}><Text>Nombre de los Contratos:  </Text></View>
                  <View style={styles.tableCell}><Text>{jsonData.Generales.NombreCon}</Text></View>

                </View>
                {/*Fila 4*/}
                <View style={styles.tableRow}>
                  <View style={styles.tableCell}><Text>Nombre de los Campos:{jsonData.Generales.NombreCampo.campo1},{jsonData.Generales.NombreCampo.campo2},{jsonData.Generales.NombreCampo.campo3}</Text></View>
                </View>
                {/*Titulo 1*/}
                <View style={{ ...styles.tableRow, backgroundColor: "rgb(180,198,231)" }}>
                  <View style={styles.tableCell}><Text style={styles.text2}>SECCIÓN I. INFORMACIÓN DE LA TEA</Text></View>
                </View>
                {/*Encabezados 1*/}
                <View style={{ ...styles.tableRow, backgroundColor: "rgb(242,242,242)" }}>
                  <View style={styles.tableCell}><Text style={styles.text1}>ID TEA</Text></View>
                  <View style={styles.tableCell}><Text style={styles.text1}>Tipo TEA</Text></View>
                  <View style={styles.tableCell}><Text style={styles.text1}>Presión del sistema (psig)</Text></View>
                  <View style={styles.tableCell}><Text style={styles.text1}>Tecnología de la TEA</Text></View>
                  <View style={styles.tableCell}><Text style={styles.text1}>Altura TEA (ft)</Text></View>
                  <View style={styles.tableCell}><Text style={styles.text1}>Diámetro TEA (in)</Text></View>
                  <View style={styles.tableCell}><Text style={styles.text1}>Año de instalación</Text></View>
                  <View style={styles.tableCell}><Text style={styles.text1}>Horas estimadas de funcionamiento al año </Text></View>
                  <View style={styles.tableCell}><Text style={styles.text1}>Segmento uso TEA</Text></View>
                  <View style={styles.tableCell}><Text style={styles.text1}>Método de medición del volumen de gas quemado</Text></View>
                  <View style={styles.tableCell}><Text style={styles.text1}>Tipo de Medidor </Text></View>
                  <View style={styles.tableCell}><Text style={styles.text1}>Serial Medidor</Text></View>
                </View>
                {/*Contenido 1*/}
                <View style={styles.tableRow}>
                  <View style={styles.tableCell}><Text style={styles.text1} >{jsonData.TEAS[0].id} </Text></View>
                  <View style={styles.tableCell}><Text style={styles.text1}>A </Text></View>
                  <View style={styles.tableCell}><Text style={styles.text1}>20</Text></View>
                  <View style={styles.tableCell}><Text style={styles.text1}></Text></View>
                  <View style={styles.tableCell}><Text style={styles.text1}>{jsonData.TEAS[0].altura}</Text></View>
                  <View style={styles.tableCell}><Text style={styles.text1}>{jsonData.TEAS[0].diametro}</Text></View>
                  <View style={styles.tableCell}><Text style={styles.text1}>2014</Text></View>
                  <View style={styles.tableCell}><Text style={styles.text1}>{jsonData.TEAS[0].Hfun}</Text></View>
                  <View style={styles.tableCell}><Text style={styles.text1}>{jsonData.TEAS[0].Segmento}</Text></View>
                  <View style={styles.tableCell}><Text style={styles.text1}>{jsonData.TEAS[0].medicion}</Text></View>
                  <View style={styles.tableCell}><Text style={styles.text1}>{jsonData.TEAS[0].medidor}</Text></View>
                  <View style={styles.tableCell}><Text style={styles.text1}>{jsonData.TEAS[0].serial}</Text></View>
                </View>
                {/*Contenido 1-1*/}
                <View style={styles.tableRow}>
                  <View style={styles.tableCell}><Text> </Text></View>
                  <View style={styles.tableCell}><Text></Text></View>
                  <View style={styles.tableCell}><Text></Text></View>
                  <View style={styles.tableCell}><Text></Text></View>
                  <View style={styles.tableCell}><Text></Text></View>
                  <View style={styles.tableCell}><Text></Text></View>
                  <View style={styles.tableCell}><Text></Text></View>
                  <View style={styles.tableCell}><Text></Text></View>
                  <View style={styles.tableCell}><Text></Text></View>
                  <View style={styles.tableCell}><Text></Text></View>
                  <View style={styles.tableCell}><Text></Text></View>
                  <View style={styles.tableCell}><Text></Text></View>
                </View>
                {/*Contenido 1-2*/}
                <View style={styles.tableRow}>
                  <View style={styles.tableCell}><Text> </Text></View>
                  <View style={styles.tableCell}><Text></Text></View>
                  <View style={styles.tableCell}><Text></Text></View>
                  <View style={styles.tableCell}><Text></Text></View>
                  <View style={styles.tableCell}><Text></Text></View>
                  <View style={styles.tableCell}><Text></Text></View>
                  <View style={styles.tableCell}><Text></Text></View>
                  <View style={styles.tableCell}><Text></Text></View>
                  <View style={styles.tableCell}><Text></Text></View>
                  <View style={styles.tableCell}><Text></Text></View>
                  <View style={styles.tableCell}><Text></Text></View>
                  <View style={styles.tableCell}><Text></Text></View>
                </View>

                {/*Titulo 3*/}
                <View style={{ ...styles.tableRow, backgroundColor: "rgb(180,198,231)" }}>
                  <View style={styles.tableCell}><Text style={styles.text2}>SECCIÓN II. QUEMA DE GAS NATURAL EN EXPLOTACIÓN DE HIDROCARBUROS</Text></View>
                </View>
                {/*Encabezados 3*/}
                <View style={{ ...styles.tableRow }}>
                  <View style={{ ...styles.tableRow2, width: "8%", backgroundColor: "rgb(217,225,242)", borderRight: "none" }}><Text style={{ ...styles.text1, fontSize: "1vw" }}>ID TEA </Text></View>
                  <View style={{ ...styles.tableRow2, width: "20%" }}>
                    <View style={{ ...styles.tableCol, width: "100%" }}>
                      <View style={{ ...styles.tableCell2, borderBottom: "1px", backgroundColor: "rgb(217,225,242)" }}><Text style={{ ...styles.text1, fontSize: "1vw" }} >Quema rutinaria</Text></View>
                      <View style={styles.tableCell2}>
                        <View style={{ ...styles.tableRow }}>
                          <View style={{ ...styles.tableCell, border: "none", borderRight: "1px" }}>
                            <View style={{ ...styles.tableCol, width: "100%" }}>
                              <View style={{ ...styles.tableCell2, borderBottom: "1px", borderLeft: "none" }}><Text style={styles.text1}>Volumen de quema por seguridad</Text></View>
                              <View style={{ ...styles.tableRow }}>
                                <View style={{ ...styles.tableCell, border: "none", borderLeft: "none", borderRight: "1px" }}><Text style={{ ...styles.text1, fontSize: "0.7vw" }}>Volumen de gas quemado por gas de purga (KPC/año)</Text></View>
                                <View style={{ ...styles.tableCell, border: "none", borderLeft: "none", borderRight: "none" }}><Text style={{ ...styles.text1, fontSize: "0.7vw" }}> Volumen  de gas quemado por pilotos (KPC/año)</Text></View>
                              </View>
                            </View>
                          </View>
                          <View style={{ ...styles.tableCell, border: "none", }}><Text style={{ ...styles.text1, fontSize: "0.7vw" }}> Volumen de gas quemado económinamente inviable(KPC/año)</Text></View>

                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={{ ...styles.tableRow2, width: "15%" }}><View style={{ ...styles.tableCol, width: "100%", border: "none" }}>
                    <View style={{ ...styles.tableCell2, backgroundColor: "rgb(217,225,242)", border: "1px", border: "none" }}><Text style={{ ...styles.text1, fontSize: "1vw" }} >Gas de venteo intencional recolectado para quema</Text></View>
                    <View style={{ ...styles.tableCell2, border: "1px", height: "39px", borderLeft: "none", borderRight: "none", borderBottom: "none" }}><Text style={{ ...styles.text1, fontSize: "0.7vw" }} >Volumen de gas recolectado de venteo intencional y quemado en TEA (KPC/año)</Text></View>
                  </View></View>
                  <View style={{ ...styles.tableRow2, width: "15%" }}><View style={{ ...styles.tableCol, width: "100%" }}>
                    <View style={{ ...styles.tableCell2, backgroundColor: "rgb(217,225,242)", border: "none" }}><Text style={{ ...styles.text1, fontSize: "1vw" }} >Quema por eventos                    planeados</Text></View>
                    <View style={{ ...styles.tableCell2, borderTop: "1px", height: "40px" }}><Text style={styles.text1} >Volumen de gas quemado por eventos planeados (KPC/año)</Text></View>
                  </View></View>
                  <View style={{ ...styles.tableRow2, width: "38%" }}>
                    <View style={{ ...styles.tableCol, width: "100%" }}>
                      <View style={{ ...styles.tableCell2, borderBottom: "1px", backgroundColor: "rgb(217,225,242)", height: "20" }}><Text style={{ ...styles.text1, fontSize: "1vw" }} >Quema por eventos no planeados</Text></View>
                      <View style={{ ...styles.tableCell2 }}>
                        <View style={{ ...styles.tableRow }}>
                          <View style={{ ...styles.tableCell, height: "40px", border: "none", borderRight: "1px" }}><Text style={styles.text1}>Factor de eficiencia (Fe)</Text></View>
                          <View style={{ ...styles.tableCell, height: "40px", border: "none", borderRight: "1px" }}><Text style={styles.text1}>Factor de reducción de quema por eventos no planeados en el tiempo (Tr)</Text></View>
                          <View style={{ ...styles.tableCell, height: "40px", border: "none", borderRight: "1px" }}><Text style={styles.text1}>Factor F (Fe * Tr)</Text></View>
                          <View style={{ ...styles.tableCell, height: "40px", border: "none" }}><Text style={styles.text1}>Volumen de gas quemado por eventos no planeados (KPC/año)</Text></View>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={{ ...styles.tableRow2, width: "10%" }}><View style={{ ...styles.tableCol, width: "100%" }}>
                    <View style={{ ...styles.tableCell2, backgroundColor: "rgb(217,225,242)", border: "none" }}><Text style={{ ...styles.text1, fontSize: "1vw" }} >Quema por permiso puntual</Text></View>
                    <View style={{ ...styles.tableCell2, borderTop: "1px", height: "40px" }}><Text style={styles.text1} >Volumen de gas quemado por permisio puntual (KPC/año)</Text></View>
                  </View></View>
                </View>
                {/*cONTENIDO 3*/}
                <View style={{ ...styles.tableRow }}>
                  <View style={{ ...styles.tableRow3, width: "7.6%" }}><Text style={styles.text1}> {jsonData.TEAS[0].id}</Text></View>
                  <View style={{ ...styles.tableRow3, width: "4.7%" }}><Text style={styles.text1}> {jsonData.TEAS[0].vgqgp}</Text></View>
                  <View style={{ ...styles.tableRow3, width: "4.7%" }}><Text style={styles.text1}> {jsonData.TEAS[0].vgqpp}</Text></View>
                  <View style={{ ...styles.tableRow3, width: "9.4%" }}><Text style={styles.text1}>{jsonData.TEAS[0].vgqev} </Text></View>
                  <View style={{ ...styles.tableRow3, width: "14.15%" }}><Text style={styles.text1}> {jsonData.TEAS[0].gvirc}</Text></View>
                  <View style={{ ...styles.tableRow3, width: "14.15%" }}><Text style={styles.text1}> {jsonData.TEAS[0].qpenp}</Text></View>
                  <View style={{ ...styles.tableRow3, width: "9%" }}><Text style={styles.text1}>{jsonData.TEAS[0].fe} </Text></View>
                  <View style={{ ...styles.tableRow3, width: "8.95%" }}><Text style={styles.text1}> {jsonData.TEAS[0].Tr}</Text></View>
                  <View style={{ ...styles.tableRow3, width: "8.95%" }}><Text style={styles.text1}>{jsonData.TEAS[0].FF} </Text></View>
                  <View style={{ ...styles.tableRow3, width: "9%" }}><Text style={styles.text1}>{jsonData.TEAS[0].vgqenp} </Text></View>
                  <View style={{ ...styles.tableRow3, width: "9.4%" }}><Text style={styles.text1}> {jsonData.TEAS[0].qppp}</Text></View>
                </View>
                {/*cONTENIDO 3.1*/}
                <View style={{ ...styles.tableRow }}>
                  <View style={{ ...styles.tableRow3, width: "7.6%" }}><Text style={styles.text1}> {jsonData.TEAS[0].id}</Text></View>
                  <View style={{ ...styles.tableRow3, width: "4.7%" }}><Text style={styles.text1}> {jsonData.TEAS[0].vgqgp}</Text></View>
                  <View style={{ ...styles.tableRow3, width: "4.7%" }}><Text style={styles.text1}> {jsonData.TEAS[0].vgqpp}</Text></View>
                  <View style={{ ...styles.tableRow3, width: "9.4%" }}><Text style={styles.text1}>{jsonData.TEAS[0].vgqev} </Text></View>
                  <View style={{ ...styles.tableRow3, width: "14.15%" }}><Text style={styles.text1}> {jsonData.TEAS[0].gvirc}</Text></View>
                  <View style={{ ...styles.tableRow3, width: "14.15%" }}><Text style={styles.text1}> {jsonData.TEAS[0].qpenp}</Text></View>
                  <View style={{ ...styles.tableRow3, width: "9%" }}><Text style={styles.text1}>{jsonData.TEAS[0].fe} </Text></View>
                  <View style={{ ...styles.tableRow3, width: "8.95%" }}><Text style={styles.text1}> {jsonData.TEAS[0].Tr}</Text></View>
                  <View style={{ ...styles.tableRow3, width: "8.95%" }}><Text style={styles.text1}>{jsonData.TEAS[0].FF} </Text></View>
                  <View style={{ ...styles.tableRow3, width: "9%" }}><Text style={styles.text1}>{jsonData.TEAS[0].vgqenp} </Text></View>
                  <View style={{ ...styles.tableRow3, width: "9.4%" }}><Text style={styles.text1}> {jsonData.TEAS[0].qppp}</Text></View>
                </View>
                {/*cONTENIDO 3.2*/}
                <View style={{ ...styles.tableRow }}>
                  <View style={{ ...styles.tableRow3, width: "7.6%" }}><Text style={styles.text1}> {jsonData.TEAS[0].id}</Text></View>
                  <View style={{ ...styles.tableRow3, width: "4.7%" }}><Text style={styles.text1}> {jsonData.TEAS[0].vgqgp}</Text></View>
                  <View style={{ ...styles.tableRow3, width: "4.7%" }}><Text style={styles.text1}> {jsonData.TEAS[0].vgqpp}</Text></View>
                  <View style={{ ...styles.tableRow3, width: "9.4%" }}><Text style={styles.text1}>{jsonData.TEAS[0].vgqev} </Text></View>
                  <View style={{ ...styles.tableRow3, width: "14.15%" }}><Text style={styles.text1}> {jsonData.TEAS[0].gvirc}</Text></View>
                  <View style={{ ...styles.tableRow3, width: "14.15%" }}><Text style={styles.text1}> {jsonData.TEAS[0].qpenp}</Text></View>
                  <View style={{ ...styles.tableRow3, width: "9%" }}><Text style={styles.text1}>{jsonData.TEAS[0].fe} </Text></View>
                  <View style={{ ...styles.tableRow3, width: "8.95%" }}><Text style={styles.text1}> {jsonData.TEAS[0].Tr}</Text></View>
                  <View style={{ ...styles.tableRow3, width: "8.95%" }}><Text style={styles.text1}>{jsonData.TEAS[0].FF} </Text></View>
                  <View style={{ ...styles.tableRow3, width: "9%" }}><Text style={styles.text1}>{jsonData.TEAS[0].vgqenp} </Text></View>
                  <View style={{ ...styles.tableRow3, width: "9.4%" }}><Text style={styles.text1}> {jsonData.TEAS[0].qppp}</Text></View>
                </View>

                {/*TITULO 4*/}
                <View style={{ ...styles.tableRow, backgroundColor: "rgb(180,198,231)" }}>
                  <View style={styles.tableCell}><Text style={{ textAlign: 'center' }}>SECCIÓN III. RELACIÓN DE EMISIONES DE GASES DE EFECTO INVERNADERO</Text></View>
                </View>
                {/*Encabezado  4*/}
                <View style={{ ...styles.tableRow }}>
                  <View style={{ ...styles.tableRow2, width: "8%" }}><Text style={styles.text1}>ID TEA </Text></View>
                  <View style={{ ...styles.tableRow2, width: "7.5%" }}><Text style={styles.text1}> Segmento uso TEA</Text></View>
                  <View style={{ ...styles.tableRow2, width: "7.5%" }}><Text style={styles.text1}>Volumen Total de Gas Quemado en TEA (KPC/año)  </Text></View>
                  <View style={{ ...styles.tableRow2, width: "7.5%" }}><Text style={styles.text1}>Eficiencia CE (%) </Text></View>
                  <View style={{ ...styles.tableRow2, width: "7.5%" }}><Text style={styles.text1}> Eficiencia DRE metano (%)</Text></View>
                  <View style={{ ...styles.tableRow2, width: "32%" }}>
                    <View style={{ ...styles.tableCol, width: "100%" }}>
                      <View style={{ ...styles.tableCell2, borderBottom: "1px" }}><Text style={styles.text1} >Composicion Molar representativa del gas quemado</Text></View>
                      <View style={{ ...styles.tableRow }}>
                        <View style={{ ...styles.tableRow3, width: "12.5%", height: "13px" }}><Text style={styles.text1}>C1</Text></View>
                        <View style={{ ...styles.tableRow3, width: "12.5%" }}><Text style={styles.text1}>C2 </Text></View>
                        <View style={{ ...styles.tableRow3, width: "12.5%" }}><Text style={styles.text1}>C3 </Text></View>
                        <View style={{ ...styles.tableRow3, width: "12.5%" }}><Text style={styles.text1}>C4 </Text></View>
                        <View style={{ ...styles.tableRow3, width: "12.5%" }}><Text style={styles.text1}>C5</Text></View>
                        <View style={{ ...styles.tableRow3, width: "12.5%" }}><Text style={styles.text1}>C6+ </Text></View>
                        <View style={{ ...styles.tableRow3, width: "12.5%" }}><Text style={styles.text1}>H2 </Text></View>
                        <View style={{ ...styles.tableRow3, width: "12.5%" }}><Text style={styles.text1}>CO2</Text></View>

                      </View>

                    </View>



                  </View>
                  <View style={{ ...styles.tableRow2, width: "7.5%" }}><Text style={styles.text1}>Emisiones CO2 (tCO2/año) </Text></View>
                  <View style={{ ...styles.tableRow2, width: "7.5%" }}><Text style={styles.text1}> Emisiones CH4 (tCH4/año)</Text></View>
                  <View style={{ ...styles.tableRow2, width: "7.5%" }}><Text style={styles.text1}> Emisiones N2O (tN2O/año)</Text></View>
                  <View style={{ ...styles.tableRow2, width: "7.5%" }}><Text style={styles.text1}> Emisiones CO2e (tCO2e/año)</Text></View>
                </View>
                {/*Contenido  4.1*/}
                <View style={{ ...styles.tableRow }}>
                  <View style={{ ...styles.tableRow3, width: "8%" }}><Text style={styles.text1}>{jsonData.TEAS[0].id} </Text></View>
                  <View style={{ ...styles.tableRow3, width: "7.5%" }}><Text style={styles.text1}>{jsonData.TEAS[0].Segmento} </Text></View>
                  <View style={{ ...styles.tableRow3, width: "7.5%" }}><Text style={styles.text1}> {jsonData.TEAS[0].KPCA}</Text></View>
                  <View style={{ ...styles.tableRow3, width: "7.5%" }}><Text style={styles.text1}> {jsonData.TEAS[0].CE}</Text></View>
                  <View style={{ ...styles.tableRow3, width: "7.5%" }}><Text style={styles.text1}>{jsonData.TEAS[0].DRE} </Text></View>
                  <View style={{ ...styles.tableRow3, width: "4%" }}><Text style={styles.text1}> {jsonData.TEAS[0].C1}</Text></View>
                  <View style={{ ...styles.tableRow3, width: "4%" }}><Text style={styles.text1}> {jsonData.TEAS[0].C2}</Text></View>
                  <View style={{ ...styles.tableRow3, width: "4%" }}><Text style={styles.text1}>{jsonData.TEAS[0].C3} </Text></View>
                  <View style={{ ...styles.tableRow3, width: "4%" }}><Text style={styles.text1}> {jsonData.TEAS[0].C4}</Text></View>
                  <View style={{ ...styles.tableRow3, width: "4%" }}><Text style={styles.text1}> {jsonData.TEAS[0].C5} </Text></View>
                  <View style={{ ...styles.tableRow3, width: "4%" }}><Text style={styles.text1}> {jsonData.TEAS[0]["C6+"]}</Text></View>
                  <View style={{ ...styles.tableRow3, width: "4%" }}><Text style={styles.text1}> {jsonData.TEAS[0].H2} </Text></View>
                  <View style={{ ...styles.tableRow3, width: "4%" }}><Text style={styles.text1}>{jsonData.TEAS[0].C02} </Text></View>
                  <View style={{ ...styles.tableRow3, width: "7.5%" }}><Text style={styles.text1}> {jsonData.TEAS[0].ECO2}</Text></View>
                  <View style={{ ...styles.tableRow3, width: "7.5%" }}><Text style={styles.text1}> {jsonData.TEAS[0].ECH4} </Text></View>
                  <View style={{ ...styles.tableRow3, width: "7.5%" }}><Text style={styles.text1}>{jsonData.TEAS[0].EN20} </Text></View>
                  <View style={{ ...styles.tableRow3, width: "7.5%" }}><Text style={styles.text1}> {jsonData.TEAS[0].ECO2e} </Text></View>

                </View>
                {/*Contenido  4.2*/}
                <View style={{ ...styles.tableRow }}>
                  <View style={{ ...styles.tableRow3, width: "8%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "7.5%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "7.5%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "7.5%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "7.5%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "4%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "4%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "4%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "4%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "4%" }}><Text style={styles.text1}>  </Text></View>
                  <View style={{ ...styles.tableRow3, width: "4%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "4%" }}><Text style={styles.text1}>  </Text></View>
                  <View style={{ ...styles.tableRow3, width: "4%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "7.5%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "7.5%" }}><Text style={styles.text1}>  </Text></View>
                  <View style={{ ...styles.tableRow3, width: "7.5%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "7.5%" }}><Text style={styles.text1}>  </Text></View>

                </View>
                {/*Contenido  4.3*/}
                <View style={{ ...styles.tableRow }}>
                  <View style={{ ...styles.tableRow3, width: "8%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "7.5%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "7.5%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "7.5%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "7.5%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "4%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "4%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "4%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "4%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "4%" }}><Text style={styles.text1}>  </Text></View>
                  <View style={{ ...styles.tableRow3, width: "4%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "4%" }}><Text style={styles.text1}>  </Text></View>
                  <View style={{ ...styles.tableRow3, width: "4%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "7.5%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "7.5%" }}><Text style={styles.text1}>  </Text></View>
                  <View style={{ ...styles.tableRow3, width: "7.5%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "7.5%" }}><Text style={styles.text1}>  </Text></View>

                </View>
                {/*Contenido  4.4*/}
                <View style={{ ...styles.tableRow }}>
                  <View style={{ ...styles.tableRow3, width: "8%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "7.5%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "7.5%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "7.5%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "7.5%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "4%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "4%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "4%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "4%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "4%" }}><Text style={styles.text1}>  </Text></View>
                  <View style={{ ...styles.tableRow3, width: "4%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "4%" }}><Text style={styles.text1}>  </Text></View>
                  <View style={{ ...styles.tableRow3, width: "4%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "7.5%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "7.5%" }}><Text style={styles.text1}>  </Text></View>
                  <View style={{ ...styles.tableRow3, width: "7.5%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "7.5%" }}><Text style={styles.text1}>  </Text></View>

                </View>
                {/*Contenido  4.5*/}
                <View style={{ ...styles.tableRow }}>
                  <View style={{ ...styles.tableRow3, width: "8%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "7.5%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "7.5%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "7.5%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "7.5%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "4%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "4%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "4%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "4%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "4%" }}><Text style={styles.text1}>  </Text></View>
                  <View style={{ ...styles.tableRow3, width: "4%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "4%" }}><Text style={styles.text1}>  </Text></View>
                  <View style={{ ...styles.tableRow3, width: "4%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "7.5%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "7.5%" }}><Text style={styles.text1}>  </Text></View>
                  <View style={{ ...styles.tableRow3, width: "7.5%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "7.5%" }}><Text style={styles.text1}>  </Text></View>

                </View>
                {/*Contenido  4.6*/}
                <View style={{ ...styles.tableRow }}>
                  <View style={{ ...styles.tableRow3, width: "8%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "7.5%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "7.5%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "7.5%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "7.5%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "4%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "4%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "4%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "4%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "4%" }}><Text style={styles.text1}>  </Text></View>
                  <View style={{ ...styles.tableRow3, width: "4%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "4%" }}><Text style={styles.text1}>  </Text></View>
                  <View style={{ ...styles.tableRow3, width: "4%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "7.5%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "7.5%" }}><Text style={styles.text1}>  </Text></View>
                  <View style={{ ...styles.tableRow3, width: "7.5%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "7.5%" }}><Text style={styles.text1}>  </Text></View>

                </View>
                {/*Contenido  4.7*/}
                <View style={{ ...styles.tableRow }}>
                  <View style={{ ...styles.tableRow3, width: "8%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "7.5%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "7.5%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "7.5%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "7.5%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "4%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "4%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "4%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "4%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "4%" }}><Text style={styles.text1}>  </Text></View>
                  <View style={{ ...styles.tableRow3, width: "4%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "4%" }}><Text style={styles.text1}>  </Text></View>
                  <View style={{ ...styles.tableRow3, width: "4%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "7.5%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "7.5%" }}><Text style={styles.text1}>  </Text></View>
                  <View style={{ ...styles.tableRow3, width: "7.5%" }}><Text style={styles.text1}> </Text></View>
                  <View style={{ ...styles.tableRow3, width: "7.5%" }}><Text style={styles.text1}>  </Text></View>

                </View>
                <View style={{ ...styles.tableRow3, width: "100%" }}><Text style={styles.text1}> Adjuntar certificaciones de eficiencia de TEA, según </Text></View>
              </View>
              <View style={{ ...styles.tableRow, backgroundColor: "rgb(180,198,231)" }}>
                <View style={styles.tableCell}><Text style={styles.text2}>SECCIÓN IV. DOCUMENTOS ANEXOS AL FORMATO</Text></View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCell}><Text style={styles.text2}> </Text></View>
              </View>
              <View style={{ ...styles.tableRow, backgroundColor: "rgb(180,198,231)" }}>
                <View style={styles.tableCell}><Text style={styles.text2}>SECCIÓN V. OBSERVACIONES</Text></View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCell}><Text style={{ textAlign: 'center' }}> </Text></View>
              </View>
              <View style={{ ...styles.tableRow, backgroundColor: "rgb(180,198,231)" }}>
                <View style={styles.tableCell}><Text style={styles.text2}>SECCIÓN VI. RESPONSABLES</Text></View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCell}><Text style={{ textAlign: 'center' }}>Nombre del Responsable Técnico Operadora</Text></View>
                <View style={styles.tableCell}><Text style={{ textAlign: 'center' }}>Firma del Responsable Técnico Operadora</Text></View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCell}><Text style={{ textAlign: 'center' }}> </Text></View>
                <View style={styles.tableCell}><Text style={{ textAlign: 'center' }}> </Text></View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCell}><Text style={{ textAlign: 'center' }}>Número de Tarjeta profesional: </Text></View>
                <View style={styles.tableCell}><Text style={{ textAlign: 'center' }}> </Text></View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCell}><Text > Nota: La información aquí suministrada deberá estar acorde con lo establecido en la Resolución 40066 de 2022 y a la Resolución 40317 de 2023 del Ministerio de Minas y Energía</Text></View>
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};

export default Reporter2;
