import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState, useRef, useEffect} from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';

import { useParams } from "react-router-dom";
import moment from "moment";
import UploadService from "../../../services/UploadService";
import { InputText } from 'primereact/inputtext';
import { Dialog } from "primereact/dialog";
import { MultiSelect } from "primereact/multiselect";
import DownloadCSV from "../../../utils/DownloadCSV";
import InboxCreateDialogComponent from "../../cb_components/InboxPage/InboxCreateDialogComponent";
import InviteIcon from "../../../assets/media/Invite.png";
import ExportIcon from "../../../assets/media/Export & Share.png";
import CopyIcon from "../../../assets/media/Clipboard.png";
import DuplicateIcon from "../../../assets/media/Duplicate.png";
import DeleteIcon from "../../../assets/media/Trash.png";

const InvoiceDataTable = ({ items, fields, onEditRow, onRowDelete, onRowClick, searchDialog, setSearchDialog,   showUpload, setShowUpload,
    showFilter, setShowFilter,
    showColumns, setShowColumns, onClickSaveFilteredfields ,
    selectedFilterFields, setSelectedFilterFields,
    selectedHideFields, setSelectedHideFields, onClickSaveHiddenfields, loading, user,   selectedDelete,
  setSelectedDelete, onCreateResult}) => {
    const dt = useRef(null);
    const urlParams = useParams();
    const [globalFilter, setGlobalFilter] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [data, setData] = useState([]);

const dropdownTemplate0 = (rowData, { rowIndex }) => <p >{rowData.invoiceType?.eInvoiceTypes}</p>
const calendar_12Template1 = (rowData, { rowIndex }) => <p>{new Date(rowData.invoiceDateAndTime).toLocaleDateString()}</p>
const pTemplate2 = (rowData, { rowIndex }) => <p >{rowData.originalEInvoiceReferenceNumber}</p>
const p_numberTemplate3 = (rowData, { rowIndex }) => <p >{rowData.no}</p>
const pTemplate4 = (rowData, { rowIndex }) => <p >{rowData.classification}</p>
const p_numberTemplate5 = (rowData, { rowIndex }) => <p >{rowData.subtotal}</p>
const pTemplate6 = (rowData, { rowIndex }) => <p >{rowData.countryOfOrigin}</p>
const p_numberTemplate7 = (rowData, { rowIndex }) => <p >{rowData.totalExcludingTax}</p>
const dropdownTemplate8 = (rowData, { rowIndex }) => <p >{rowData.taxType?.taxType}</p>
const p_numberTemplate9 = (rowData, { rowIndex }) => <p >{rowData.taxRate}</p>
const p_numberTemplate10 = (rowData, { rowIndex }) => <p >{rowData.taxAmount}</p>
const pTemplate11 = (rowData, { rowIndex }) => <p >{rowData.detailsOfExemption}</p>
const p_numberTemplate12 = (rowData, { rowIndex }) => <p >{rowData.amountExempted}</p>
const p_numberTemplate13 = (rowData, { rowIndex }) => <p >{rowData.discountRate}</p>
const p_numberTemplate14 = (rowData, { rowIndex }) => <p >{rowData.discountAmount}</p>
const pTemplate15 = (rowData, { rowIndex }) => <p >{rowData.description1}</p>
const p_numberTemplate16 = (rowData, { rowIndex }) => <p >{rowData.feeChargeRate}</p>
const p_numberTemplate17 = (rowData, { rowIndex }) => <p >{rowData.feeChargeAmount}</p>
const dropdownTemplate18 = (rowData, { rowIndex }) => <p >{rowData.taxType1?.taxType}</p>
const p_numberTemplate19 = (rowData, { rowIndex }) => <p >{rowData.totalTaxableAmountPerTaxType}</p>
const p_numberTemplate20 = (rowData, { rowIndex }) => <p >{rowData.totalTaxAmountPerTaxType}</p>
const pTemplate21 = (rowData, { rowIndex }) => <p >{rowData.detailsOfTaxExemption}</p>
const p_numberTemplate22 = (rowData, { rowIndex }) => <p >{rowData.amountExemptedFromTax}</p>
const p_numberTemplate23 = (rowData, { rowIndex }) => <p >{rowData.discountAmount1}</p>
const pTemplate24 = (rowData, { rowIndex }) => <p >{rowData.description3}</p>
const p_numberTemplate25 = (rowData, { rowIndex }) => <p >{rowData.feeAmount}</p>
const pTemplate26 = (rowData, { rowIndex }) => <p >{rowData.description4}</p>
const pTemplate27 = (rowData, { rowIndex }) => <p >{rowData.invoiceNumber}</p>
const tickTemplate28 = (rowData, { rowIndex }) => <i className={`pi ${rowData.consolidated?"pi-check": "pi-times"}`}  ></i>
    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowData._id)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    
      const checkboxTemplate = (rowData) => (
    <Checkbox
      checked={selectedItems.some((item) => item._id === rowData._id)}
      onChange={(e) => {
        let _selectedItems = [...selectedItems];

        if (e.checked) {
          _selectedItems.push(rowData);
        } else {
          _selectedItems = _selectedItems.filter(
            (item) => item._id !== rowData._id,
          );
        }
        setSelectedItems(_selectedItems);
      }}
    />
  );
  const deselectAllRows = () => {
    // Logic to deselect all selected rows
    setSelectedItems([]); // Assuming setSelectedItems is used to manage selected items state
  };

  const handleDelete = async () => {
    if (!selectedItems || selectedItems.length === 0) return;

    try {
      const promises = selectedItems.map((item) =>
        client.service("companies").remove(item._id),
      );
      await Promise.all(promises);
      const updatedData = data.filter(
        (item) => !selectedItems.find((selected) => selected._id === item._id),
      );
      setData(updatedData);
      setSelectedDelete(selectedItems.map((item) => item._id));

      deselectAllRows();
    } catch (error) {
      console.error("Failed to delete selected records", error);
    }
  };
    
  const handleMessage = () => {
    setShowDialog(true); // Open the dialog
  };

  const handleHideDialog = () => {
    setShowDialog(false); // Close the dialog
  };

    return (
        <>
        <DataTable 
           value={items}
        ref={dt}
        removableSort
        onRowClick={onRowClick}
        scrollable
        rowHover
        stripedRows
        paginator
        rows={10}
        rowsPerPageOptions={[10, 50, 250, 500]}
        size={"small"}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        rowClassName="cursor-pointer"
        alwaysShowPaginator={!urlParams.singleUsersId}
        selection={selectedItems}
        onSelectionChange={(e) => setSelectedItems(e.value)}
        onCreateResult={onCreateResult}
        >
                <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
          body={checkboxTemplate}
        />
<Column field="invoiceType" header="Invoice Type" body={dropdownTemplate0} filter={selectedFilterFields.includes("invoiceType")} hidden={selectedHideFields?.includes("invoiceType")}  style={{ minWidth: "8rem" }} />
<Column field="invoiceDateAndTime" header="Invoice Date and Time" body={calendar_12Template1} filter={selectedFilterFields.includes("invoiceDateAndTime")} hidden={selectedHideFields?.includes("invoiceDateAndTime")}  sortable style={{ minWidth: "8rem" }} />
<Column field="originalEInvoiceReferenceNumber" header="Original e-Invoice Reference Number" body={pTemplate2} filter={selectedFilterFields.includes("originalEInvoiceReferenceNumber")} hidden={selectedHideFields?.includes("originalEInvoiceReferenceNumber")}  sortable style={{ minWidth: "8rem" }} />
<Column field="no" header="No" body={p_numberTemplate3} filter={selectedFilterFields.includes("no")} hidden={selectedHideFields?.includes("no")}  sortable style={{ minWidth: "8rem" }} />
<Column field="classification" header="Classification" body={pTemplate4} filter={selectedFilterFields.includes("classification")} hidden={selectedHideFields?.includes("classification")}  sortable style={{ minWidth: "8rem" }} />
<Column field="subtotal" header="Sub total" body={p_numberTemplate5} filter={selectedFilterFields.includes("subtotal")} hidden={selectedHideFields?.includes("subtotal")}  sortable style={{ minWidth: "8rem" }} />
<Column field="countryOfOrigin" header="Country of Origin" body={pTemplate6} filter={selectedFilterFields.includes("countryOfOrigin")} hidden={selectedHideFields?.includes("countryOfOrigin")}  sortable style={{ minWidth: "8rem" }} />
<Column field="totalExcludingTax" header="Total Excluding Tax" body={p_numberTemplate7} filter={selectedFilterFields.includes("totalExcludingTax")} hidden={selectedHideFields?.includes("totalExcludingTax")}  sortable style={{ minWidth: "8rem" }} />
<Column field="taxType" header="Tax Type" body={dropdownTemplate8} filter={selectedFilterFields.includes("taxType")} hidden={selectedHideFields?.includes("taxType")}  style={{ minWidth: "8rem" }} />
<Column field="taxRate" header="Tax Rate (%)" body={p_numberTemplate9} filter={selectedFilterFields.includes("taxRate")} hidden={selectedHideFields?.includes("taxRate")}  sortable style={{ minWidth: "8rem" }} />
<Column field="taxAmount" header="Tax Amount" body={p_numberTemplate10} filter={selectedFilterFields.includes("taxAmount")} hidden={selectedHideFields?.includes("taxAmount")}  sortable style={{ minWidth: "8rem" }} />
<Column field="detailsOfExemption" header="Details of Exemption" body={pTemplate11} filter={selectedFilterFields.includes("detailsOfExemption")} hidden={selectedHideFields?.includes("detailsOfExemption")}  sortable style={{ minWidth: "8rem" }} />
<Column field="amountExempted" header="Amount Exempted" body={p_numberTemplate12} filter={selectedFilterFields.includes("amountExempted")} hidden={selectedHideFields?.includes("amountExempted")}  sortable style={{ minWidth: "8rem" }} />
<Column field="discountRate" header="Discount Rate (%)" body={p_numberTemplate13} filter={selectedFilterFields.includes("discountRate")} hidden={selectedHideFields?.includes("discountRate")}  sortable style={{ minWidth: "8rem" }} />
<Column field="discountAmount" header="Discount Amount" body={p_numberTemplate14} filter={selectedFilterFields.includes("discountAmount")} hidden={selectedHideFields?.includes("discountAmount")}  sortable style={{ minWidth: "8rem" }} />
<Column field="description1" header="Description_1" body={pTemplate15} filter={selectedFilterFields.includes("description1")} hidden={selectedHideFields?.includes("description1")}  sortable style={{ minWidth: "8rem" }} />
<Column field="feeChargeRate" header="Fee/Charge Rate (%)" body={p_numberTemplate16} filter={selectedFilterFields.includes("feeChargeRate")} hidden={selectedHideFields?.includes("feeChargeRate")}  sortable style={{ minWidth: "8rem" }} />
<Column field="feeChargeAmount" header="Fee/Charge Amount" body={p_numberTemplate17} filter={selectedFilterFields.includes("feeChargeAmount")} hidden={selectedHideFields?.includes("feeChargeAmount")}  sortable style={{ minWidth: "8rem" }} />
<Column field="taxType1" header="Tax Type _1" body={dropdownTemplate18} filter={selectedFilterFields.includes("taxType1")} hidden={selectedHideFields?.includes("taxType1")}  style={{ minWidth: "8rem" }} />
<Column field="totalTaxableAmountPerTaxType" header="Total Taxable Amount per Tax Type" body={p_numberTemplate19} filter={selectedFilterFields.includes("totalTaxableAmountPerTaxType")} hidden={selectedHideFields?.includes("totalTaxableAmountPerTaxType")}  sortable style={{ minWidth: "8rem" }} />
<Column field="totalTaxAmountPerTaxType" header="Total Tax Amount Per Tax Type" body={p_numberTemplate20} filter={selectedFilterFields.includes("totalTaxAmountPerTaxType")} hidden={selectedHideFields?.includes("totalTaxAmountPerTaxType")}  sortable style={{ minWidth: "8rem" }} />
<Column field="detailsOfTaxExemption" header="Details of Tax Exemption" body={pTemplate21} filter={selectedFilterFields.includes("detailsOfTaxExemption")} hidden={selectedHideFields?.includes("detailsOfTaxExemption")}  sortable style={{ minWidth: "8rem" }} />
<Column field="amountExemptedFromTax" header="Amount Exempted from Tax" body={p_numberTemplate22} filter={selectedFilterFields.includes("amountExemptedFromTax")} hidden={selectedHideFields?.includes("amountExemptedFromTax")}  sortable style={{ minWidth: "8rem" }} />
<Column field="discountAmount1" header="Discount Amount_1" body={p_numberTemplate23} filter={selectedFilterFields.includes("discountAmount1")} hidden={selectedHideFields?.includes("discountAmount1")}  sortable style={{ minWidth: "8rem" }} />
<Column field="description3" header="Description_3" body={pTemplate24} filter={selectedFilterFields.includes("description3")} hidden={selectedHideFields?.includes("description3")}  sortable style={{ minWidth: "8rem" }} />
<Column field="feeAmount" header="Fee Amount" body={p_numberTemplate25} filter={selectedFilterFields.includes("feeAmount")} hidden={selectedHideFields?.includes("feeAmount")}  sortable style={{ minWidth: "8rem" }} />
<Column field="description4" header="Description_4" body={pTemplate26} filter={selectedFilterFields.includes("description4")} hidden={selectedHideFields?.includes("description4")}  sortable style={{ minWidth: "8rem" }} />
<Column field="invoiceNumber" header="Invoice Number" body={pTemplate27} filter={selectedFilterFields.includes("invoiceNumber")} hidden={selectedHideFields?.includes("invoiceNumber")}  sortable style={{ minWidth: "8rem" }} />
<Column field="consolidated" header="Consolidated" body={tickTemplate28} filter={selectedFilterFields.includes("consolidated")} hidden={selectedHideFields?.includes("consolidated")}  style={{ minWidth: "8rem" }} />
            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
            
        </DataTable>


      {selectedItems.length > 0 ? (
        <div
          className="card center"
          style={{
            width: "51rem",
            margin: "20px auto 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px",
            fontSize: "14px",
            fontFamily: "Arial, sans-serif",
            color: "#2A4454",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #2A4454",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            {selectedItems.length} selected
            <span
              className="pi pi-times"
              style={{
                cursor: "pointer",
                marginLeft: "10px",
                color: "#2A4454",
              }}
              onClick={() => {
                deselectAllRows();
              }}
            />
          </div>

          {/* New buttons section */}
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* Copy button */}
            <Button
              label="Copy"
              labelposition="right"
              icon={
                <img
                  src={CopyIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              // tooltip="Copy"
              // onClick={handleCopy}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* Duplicate button */}
            <Button
              label="Duplicate"
              labelposition="right"
              icon={
                <img
                  src={DuplicateIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              // tooltip="Duplicate"
              // onClick={handleDuplicate}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* Export button */}
            <Button
              label="Export"
              labelposition="right"
              icon={
                <img
                  src={ExportIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              // tooltip="Export"
              // onClick={handleExport}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* Message button */}
            <Button
              label="Message"
              labelposition="right"
              icon={
                <img
                  src={InviteIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              onClick={handleMessage}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* InboxCreateDialogComponent */}
            <InboxCreateDialogComponent
              show={showDialog}
              onHide={handleHideDialog}
              serviceInbox="companies"
              onCreateResult={onCreateResult}
              // selectedItemsId={selectedItems.map(item => item._id)}
              selectedItemsId={selectedItems}
            />

            {/* <div style={{ display: 'flex', alignItems: 'center' }}> */}
            <Button
              label="Delete"
              labelposition="right"
              icon={
                <img
                  src={DeleteIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              onClick={handleDelete}
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                gap: "4px",
              }}
            />
          </div>
        </div>
      ) : null}


        <Dialog header="Upload Invoice Data" visible={showUpload} onHide={() => setShowUpload(false)}>
        <UploadService 
          user={user} 
          serviceName="invoice"            
          onUploadComplete={() => {
            setShowUpload(false); // Close the dialog after upload
          }}/>
      </Dialog>

      <Dialog header="Search Invoice" visible={searchDialog} onHide={() => setSearchDialog(false)}>
      Search
    </Dialog>
    <Dialog
        header="Filter Users"
        visible={showFilter}
        onHide={() => setShowFilter(false)}
      >
        <div className="card flex justify-content-center">
          <MultiSelect
            value={selectedFilterFields}
            onChange={(e) => setSelectedFilterFields(e.value)}
            options={fields}
            optionLabel="name"
            optionValue="value"
            filter
            placeholder="Select Fields"
            maxSelectedLabels={6}
            className="w-full md:w-20rem"
          />
        </div>
        <Button
          text
          label="save as pref"
          onClick={() => {
            console.log(selectedFilterFields);
            onClickSaveFilteredfields(selectedFilterFields);
            setSelectedFilterFields(selectedFilterFields);
            setShowFilter(false)
          }}
        ></Button>
      </Dialog>

      <Dialog
        header="Hide Columns"
        visible={showColumns}
        onHide={() => setShowColumns(false)}
      >
        <div className="card flex justify-content-center">
          <MultiSelect
            value={selectedHideFields}
            onChange={(e) => setSelectedHideFields(e.value)}
            options={fields}
            optionLabel="name"
            optionValue="value"
            filter
            placeholder="Select Fields"
            maxSelectedLabels={6}
            className="w-full md:w-20rem"
          />
        </div>
        <Button
          text
          label="save as pref"
          onClick={() => {
            console.log(selectedHideFields);
            onClickSaveHiddenfields(selectedHideFields);
            setSelectedHideFields(selectedHideFields);
            setShowColumns(false)
          }}
        ></Button>
      </Dialog>
        </>
    );
};

export default InvoiceDataTable;