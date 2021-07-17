import {
  xlsxSites,
  xlsxCamera,
  xlsxCustomer,
  xlsxUser,
  xlsxGroup,
  xlsxIntegrator,
} from "../../Components/Interfaces";
import { utils, WorkSheet, writeFile } from "xlsx";
type Data = xlsxCamera[] | xlsxSites[] | xlsxUser[] | xlsxGroup[] | xlsxCustomer[] | xlsxIntegrator[];
export const downloadXLSX = (data: Data, fileName: string) => {
  let wb = utils.book_new();

  const header = Object.keys(data[0]); 

   var wscols:{wch:number}[] = [];
   for (var i = 0; i < header.length; i++) {  
     wscols.push({ wch: header[i].length + 5 }) 
   }
  let ws:WorkSheet = utils.json_to_sheet(data);
  ws['!cols'] = wscols
  utils.book_append_sheet(wb, ws, "Sheet1");
  writeFile(
    wb,
    `${fileName}-${new Date().toLocaleDateString()}_${new Date().toLocaleTimeString()}.xlsx`
  );
};
