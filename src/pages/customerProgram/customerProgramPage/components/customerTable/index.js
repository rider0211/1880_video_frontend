import Card from "@mui/material/Card";
import DataTable from "./DataTable";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import dataTableData from "./data/dataTableData";

function CustomerTable() {
  return (
    <VuiBox pt={6} pb={3}>
    <Card>
        <VuiBox p={3} pl={0} lineHeight={1}>
        <VuiTypography variant="h5" fontWeight="medium" color="white">
            Customers Table
        </VuiTypography>
        </VuiBox>
        <DataTable table={dataTableData} canSearch />
    </Card>
    </VuiBox>
  );
}

export default CustomerTable;
