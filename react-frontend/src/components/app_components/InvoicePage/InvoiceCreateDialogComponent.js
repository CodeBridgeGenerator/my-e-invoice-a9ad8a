import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import { Checkbox } from "primereact/checkbox";


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
      if (Object.hasOwnProperty.call(errorObj.errors, key)) {
        const element = errorObj.errors[key];
        if (element?.message) {
          errMsg[key] = element.message;
        }
      }
    }
    return errMsg.length ? errMsg : errorObj.message ? { error : errorObj.message} : {};
};

const InvoiceCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [invoiceType, setInvoiceType] = useState([])
const [taxType, setTaxType] = useState([])
const [taxType1, setTaxType1] = useState([])

    useEffect(() => {
        let init  = {consolidated: false};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [invoiceType,taxType,taxType1], setError);
        }
        set_entity({...init});
        setError({});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
        
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            invoiceType: _entity?.invoiceType?._id,invoiceDateAndTime: _entity?.invoiceDateAndTime,originalEInvoiceReferenceNumber: _entity?.originalEInvoiceReferenceNumber,no: _entity?.no,classification: _entity?.classification,subtotal: _entity?.subtotal,countryOfOrigin: _entity?.countryOfOrigin,totalExcludingTax: _entity?.totalExcludingTax,taxType: _entity?.taxType?._id,taxRate: _entity?.taxRate,taxAmount: _entity?.taxAmount,detailsOfExemption: _entity?.detailsOfExemption,amountExempted: _entity?.amountExempted,discountRate: _entity?.discountRate,discountAmount: _entity?.discountAmount,description1: _entity?.description1,feeChargeRate: _entity?.feeChargeRate,feeChargeAmount: _entity?.feeChargeAmount,taxType1: _entity?.taxType1?._id,totalTaxableAmountPerTaxType: _entity?.totalTaxableAmountPerTaxType,totalTaxAmountPerTaxType: _entity?.totalTaxAmountPerTaxType,detailsOfTaxExemption: _entity?.detailsOfTaxExemption,amountExemptedFromTax: _entity?.amountExemptedFromTax,discountAmount1: _entity?.discountAmount1,description3: _entity?.description3,feeAmount: _entity?.feeAmount,description4: _entity?.description4,invoiceNumber: _entity?.invoiceNumber,consolidated: _entity?.consolidated || false,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("invoice").create(_data);
        const eagerResult = await client
            .service("invoice")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "invoiceType",
                    service : "eInvoiceTypes",
                    select:["eInvoiceTypes"]},{
                    path : "taxType",
                    service : "taxType",
                    select:["taxType"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Invoice updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Invoice" });
        }
        setLoading(false);
    };

    

    

    useEffect(() => {
                    // on mount eInvoiceTypes
                    client
                        .service("eInvoiceTypes")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleEInvoiceTypesId } })
                        .then((res) => {
                            setInvoiceType(res.data.map((e) => { return { name: e['eInvoiceTypes'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "EInvoiceTypes", type: "error", message: error.message || "Failed get eInvoiceTypes" });
                        });
                }, []);

useEffect(() => {
                    // on mount taxType
                    client
                        .service("taxType")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleTaxTypeId } })
                        .then((res) => {
                            setTaxType(res.data.map((e) => { return { name: e['taxType'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "TaxType", type: "error", message: error.message || "Failed get taxType" });
                        });
                }, []);

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    const invoiceTypeOptions = invoiceType.map((elem) => ({ name: elem.name, value: elem.value }));
const taxTypeOptions = taxType.map((elem) => ({ name: elem.name, value: elem.value }));
const taxType1Options = taxType1.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Invoice" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="invoice-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="invoiceType">Invoice Type:</label>
                <Dropdown id="invoiceType" value={_entity?.invoiceType?._id} optionLabel="name" optionValue="value" options={invoiceTypeOptions} onChange={(e) => setValByKey("invoiceType", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["invoiceType"]) ? (
              <p className="m-0" key="error-invoiceType">
                {error["invoiceType"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="invoiceDateAndTime">Invoice Date and Time:</label>
                <Calendar id="invoiceDateAndTime" value={_entity?.invoiceDateAndTime ? new Date(_entity?.invoiceDateAndTime) : null} onChange={ (e) => setValByKey("invoiceDateAndTime", e.value)} showTime hourFormat="12"  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["invoiceDateAndTime"]) ? (
              <p className="m-0" key="error-invoiceDateAndTime">
                {error["invoiceDateAndTime"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="originalEInvoiceReferenceNumber">Original e-Invoice Reference Number:</label>
                <InputText id="originalEInvoiceReferenceNumber" className="w-full mb-3 p-inputtext-sm" value={_entity?.originalEInvoiceReferenceNumber} onChange={(e) => setValByKey("originalEInvoiceReferenceNumber", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["originalEInvoiceReferenceNumber"]) ? (
              <p className="m-0" key="error-originalEInvoiceReferenceNumber">
                {error["originalEInvoiceReferenceNumber"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="no">No:</label>
                <InputNumber id="no" className="w-full mb-3 p-inputtext-sm" value={_entity?.no} onChange={(e) => setValByKey("no", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["no"]) ? (
              <p className="m-0" key="error-no">
                {error["no"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="classification">Classification:</label>
                <InputText id="classification" className="w-full mb-3 p-inputtext-sm" value={_entity?.classification} onChange={(e) => setValByKey("classification", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["classification"]) ? (
              <p className="m-0" key="error-classification">
                {error["classification"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="subtotal">Sub total:</label>
                <InputNumber id="subtotal" className="w-full mb-3 p-inputtext-sm" value={_entity?.subtotal} onChange={(e) => setValByKey("subtotal", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["subtotal"]) ? (
              <p className="m-0" key="error-subtotal">
                {error["subtotal"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="countryOfOrigin">Country of Origin:</label>
                <InputText id="countryOfOrigin" className="w-full mb-3 p-inputtext-sm" value={_entity?.countryOfOrigin} onChange={(e) => setValByKey("countryOfOrigin", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["countryOfOrigin"]) ? (
              <p className="m-0" key="error-countryOfOrigin">
                {error["countryOfOrigin"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="totalExcludingTax">Total Excluding Tax:</label>
                <InputNumber id="totalExcludingTax" className="w-full mb-3 p-inputtext-sm" value={_entity?.totalExcludingTax} onChange={(e) => setValByKey("totalExcludingTax", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["totalExcludingTax"]) ? (
              <p className="m-0" key="error-totalExcludingTax">
                {error["totalExcludingTax"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="taxType">Tax Type:</label>
                <Dropdown id="taxType" value={_entity?.taxType?._id} optionLabel="name" optionValue="value" options={taxTypeOptions} onChange={(e) => setValByKey("taxType", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["taxType"]) ? (
              <p className="m-0" key="error-taxType">
                {error["taxType"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="taxRate">Tax Rate (%):</label>
                <InputNumber id="taxRate" className="w-full mb-3 p-inputtext-sm" value={_entity?.taxRate} onChange={(e) => setValByKey("taxRate", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["taxRate"]) ? (
              <p className="m-0" key="error-taxRate">
                {error["taxRate"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="taxAmount">Tax Amount:</label>
                <InputNumber id="taxAmount" className="w-full mb-3 p-inputtext-sm" value={_entity?.taxAmount} onChange={(e) => setValByKey("taxAmount", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["taxAmount"]) ? (
              <p className="m-0" key="error-taxAmount">
                {error["taxAmount"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="detailsOfExemption">Details of Exemption:</label>
                <InputText id="detailsOfExemption" className="w-full mb-3 p-inputtext-sm" value={_entity?.detailsOfExemption} onChange={(e) => setValByKey("detailsOfExemption", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["detailsOfExemption"]) ? (
              <p className="m-0" key="error-detailsOfExemption">
                {error["detailsOfExemption"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="amountExempted">Amount Exempted:</label>
                <InputNumber id="amountExempted" className="w-full mb-3 p-inputtext-sm" value={_entity?.amountExempted} onChange={(e) => setValByKey("amountExempted", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["amountExempted"]) ? (
              <p className="m-0" key="error-amountExempted">
                {error["amountExempted"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="discountRate">Discount Rate (%):</label>
                <InputNumber id="discountRate" className="w-full mb-3 p-inputtext-sm" value={_entity?.discountRate} onChange={(e) => setValByKey("discountRate", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["discountRate"]) ? (
              <p className="m-0" key="error-discountRate">
                {error["discountRate"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="discountAmount">Discount Amount:</label>
                <InputNumber id="discountAmount" className="w-full mb-3 p-inputtext-sm" value={_entity?.discountAmount} onChange={(e) => setValByKey("discountAmount", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["discountAmount"]) ? (
              <p className="m-0" key="error-discountAmount">
                {error["discountAmount"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="description1">Description_1:</label>
                <InputText id="description1" className="w-full mb-3 p-inputtext-sm" value={_entity?.description1} onChange={(e) => setValByKey("description1", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["description1"]) ? (
              <p className="m-0" key="error-description1">
                {error["description1"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="feeChargeRate">Fee/Charge Rate (%):</label>
                <InputNumber id="feeChargeRate" className="w-full mb-3 p-inputtext-sm" value={_entity?.feeChargeRate} onChange={(e) => setValByKey("feeChargeRate", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["feeChargeRate"]) ? (
              <p className="m-0" key="error-feeChargeRate">
                {error["feeChargeRate"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="feeChargeAmount">Fee/Charge Amount:</label>
                <InputNumber id="feeChargeAmount" className="w-full mb-3 p-inputtext-sm" value={_entity?.feeChargeAmount} onChange={(e) => setValByKey("feeChargeAmount", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["feeChargeAmount"]) ? (
              <p className="m-0" key="error-feeChargeAmount">
                {error["feeChargeAmount"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="taxType1">Tax Type _1:</label>
                <Dropdown id="taxType1" value={_entity?.taxType1?._id} optionLabel="name" optionValue="value" options={taxType1Options} onChange={(e) => setValByKey("taxType1", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["taxType1"]) ? (
              <p className="m-0" key="error-taxType1">
                {error["taxType1"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="totalTaxableAmountPerTaxType">Total Taxable Amount per Tax Type:</label>
                <InputNumber id="totalTaxableAmountPerTaxType" className="w-full mb-3 p-inputtext-sm" value={_entity?.totalTaxableAmountPerTaxType} onChange={(e) => setValByKey("totalTaxableAmountPerTaxType", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["totalTaxableAmountPerTaxType"]) ? (
              <p className="m-0" key="error-totalTaxableAmountPerTaxType">
                {error["totalTaxableAmountPerTaxType"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="totalTaxAmountPerTaxType">Total Tax Amount Per Tax Type:</label>
                <InputNumber id="totalTaxAmountPerTaxType" className="w-full mb-3 p-inputtext-sm" value={_entity?.totalTaxAmountPerTaxType} onChange={(e) => setValByKey("totalTaxAmountPerTaxType", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["totalTaxAmountPerTaxType"]) ? (
              <p className="m-0" key="error-totalTaxAmountPerTaxType">
                {error["totalTaxAmountPerTaxType"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="detailsOfTaxExemption">Details of Tax Exemption:</label>
                <InputText id="detailsOfTaxExemption" className="w-full mb-3 p-inputtext-sm" value={_entity?.detailsOfTaxExemption} onChange={(e) => setValByKey("detailsOfTaxExemption", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["detailsOfTaxExemption"]) ? (
              <p className="m-0" key="error-detailsOfTaxExemption">
                {error["detailsOfTaxExemption"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="amountExemptedFromTax">Amount Exempted from Tax:</label>
                <InputNumber id="amountExemptedFromTax" className="w-full mb-3 p-inputtext-sm" value={_entity?.amountExemptedFromTax} onChange={(e) => setValByKey("amountExemptedFromTax", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["amountExemptedFromTax"]) ? (
              <p className="m-0" key="error-amountExemptedFromTax">
                {error["amountExemptedFromTax"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="discountAmount1">Discount Amount_1:</label>
                <InputNumber id="discountAmount1" className="w-full mb-3 p-inputtext-sm" value={_entity?.discountAmount1} onChange={(e) => setValByKey("discountAmount1", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["discountAmount1"]) ? (
              <p className="m-0" key="error-discountAmount1">
                {error["discountAmount1"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="description3">Description_3:</label>
                <InputText id="description3" className="w-full mb-3 p-inputtext-sm" value={_entity?.description3} onChange={(e) => setValByKey("description3", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["description3"]) ? (
              <p className="m-0" key="error-description3">
                {error["description3"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="feeAmount">Fee Amount:</label>
                <InputNumber id="feeAmount" className="w-full mb-3 p-inputtext-sm" value={_entity?.feeAmount} onChange={(e) => setValByKey("feeAmount", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["feeAmount"]) ? (
              <p className="m-0" key="error-feeAmount">
                {error["feeAmount"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="description4">Description_4:</label>
                <InputText id="description4" className="w-full mb-3 p-inputtext-sm" value={_entity?.description4} onChange={(e) => setValByKey("description4", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["description4"]) ? (
              <p className="m-0" key="error-description4">
                {error["description4"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="invoiceNumber">Invoice Number:</label>
                <InputText id="invoiceNumber" className="w-full mb-3 p-inputtext-sm" value={_entity?.invoiceNumber} onChange={(e) => setValByKey("invoiceNumber", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["invoiceNumber"]) ? (
              <p className="m-0" key="error-invoiceNumber">
                {error["invoiceNumber"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="consolidated">Consolidated:</label>
                <Checkbox id="consolidated" className="ml-3" checked={_entity?.consolidated} onChange={(e) => setValByKey("consolidated", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["consolidated"]) ? (
              <p className="m-0" key="error-consolidated">
                {error["consolidated"]}
              </p>
            ) : null}
          </small>
            </div>
            <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(InvoiceCreateDialogComponent);
