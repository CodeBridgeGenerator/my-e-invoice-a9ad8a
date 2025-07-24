import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";


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

const SupplierCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [], setError);
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
            suppliersName: _entity?.suppliersName,suppliersTin: _entity?.suppliersTin,suppliersSstRegistrationNumber: _entity?.suppliersSstRegistrationNumber,identifierType: _entity?.identifierType,identifierNumber: _entity?.identifierNumber,suppliersMsicCode: _entity?.suppliersMsicCode,suppliersTourismTaxRegistrationNumber: _entity?.suppliersTourismTaxRegistrationNumber,suppliersBusinessActivityDescription: _entity?.suppliersBusinessActivityDescription,suppliersEMail: _entity?.suppliersEMail,theFirstSuppliersContactNumber: _entity?.theFirstSuppliersContactNumber,suppliersContactNumber: _entity?.suppliersContactNumber,countryName: _entity?.countryName,stateName: _entity?.stateName,cityName: _entity?.cityName,postalZone: _entity?.postalZone,suppliersBankAccountNumber: _entity?.suppliersBankAccountNumber,paymentTerms: _entity?.paymentTerms,prePaymentAmount: _entity?.prePaymentAmount,prePaymentDate: _entity?.prePaymentDate,prePaymentReferenceNumber: _entity?.prePaymentReferenceNumber,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("supplier").create(_data);
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Supplier created successfully" });
        props.onCreateResult(result);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Supplier" });
        }
        setLoading(false);
    };

    

    

    

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

    

    return (
        <Dialog header="Create Supplier" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="supplier-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="suppliersName">Supplier's Name:</label>
                <InputText id="suppliersName" className="w-full mb-3 p-inputtext-sm" value={_entity?.suppliersName} onChange={(e) => setValByKey("suppliersName", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["suppliersName"]) ? (
              <p className="m-0" key="error-suppliersName">
                {error["suppliersName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="suppliersTin">Supplier's TIN:</label>
                <InputText id="suppliersTin" className="w-full mb-3 p-inputtext-sm" value={_entity?.suppliersTin} onChange={(e) => setValByKey("suppliersTin", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["suppliersTin"]) ? (
              <p className="m-0" key="error-suppliersTin">
                {error["suppliersTin"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="suppliersSstRegistrationNumber">Supplier's SST Registration Number:</label>
                <InputText id="suppliersSstRegistrationNumber" className="w-full mb-3 p-inputtext-sm" value={_entity?.suppliersSstRegistrationNumber} onChange={(e) => setValByKey("suppliersSstRegistrationNumber", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["suppliersSstRegistrationNumber"]) ? (
              <p className="m-0" key="error-suppliersSstRegistrationNumber">
                {error["suppliersSstRegistrationNumber"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="identifierType">Identifier Type:</label>
                <InputText id="identifierType" className="w-full mb-3 p-inputtext-sm" value={_entity?.identifierType} onChange={(e) => setValByKey("identifierType", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["identifierType"]) ? (
              <p className="m-0" key="error-identifierType">
                {error["identifierType"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="identifierNumber">Identifier Number:</label>
                <InputText id="identifierNumber" className="w-full mb-3 p-inputtext-sm" value={_entity?.identifierNumber} onChange={(e) => setValByKey("identifierNumber", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["identifierNumber"]) ? (
              <p className="m-0" key="error-identifierNumber">
                {error["identifierNumber"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="suppliersMsicCode">Supplier's MSIC code:</label>
                <InputText id="suppliersMsicCode" className="w-full mb-3 p-inputtext-sm" value={_entity?.suppliersMsicCode} onChange={(e) => setValByKey("suppliersMsicCode", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["suppliersMsicCode"]) ? (
              <p className="m-0" key="error-suppliersMsicCode">
                {error["suppliersMsicCode"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="suppliersTourismTaxRegistrationNumber">Supplier's Tourism Tax Registration Number:</label>
                <InputText id="suppliersTourismTaxRegistrationNumber" className="w-full mb-3 p-inputtext-sm" value={_entity?.suppliersTourismTaxRegistrationNumber} onChange={(e) => setValByKey("suppliersTourismTaxRegistrationNumber", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["suppliersTourismTaxRegistrationNumber"]) ? (
              <p className="m-0" key="error-suppliersTourismTaxRegistrationNumber">
                {error["suppliersTourismTaxRegistrationNumber"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="suppliersBusinessActivityDescription">Supplier's Business Activity Description:</label>
                <InputText id="suppliersBusinessActivityDescription" className="w-full mb-3 p-inputtext-sm" value={_entity?.suppliersBusinessActivityDescription} onChange={(e) => setValByKey("suppliersBusinessActivityDescription", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["suppliersBusinessActivityDescription"]) ? (
              <p className="m-0" key="error-suppliersBusinessActivityDescription">
                {error["suppliersBusinessActivityDescription"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="suppliersEMail">Supplier's e-mail:</label>
                <InputText id="suppliersEMail" className="w-full mb-3 p-inputtext-sm" value={_entity?.suppliersEMail} onChange={(e) => setValByKey("suppliersEMail", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["suppliersEMail"]) ? (
              <p className="m-0" key="error-suppliersEMail">
                {error["suppliersEMail"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="theFirstSuppliersContactNumber">The first Supplier's contact number:</label>
                <InputText id="theFirstSuppliersContactNumber" className="w-full mb-3 p-inputtext-sm" value={_entity?.theFirstSuppliersContactNumber} onChange={(e) => setValByKey("theFirstSuppliersContactNumber", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["theFirstSuppliersContactNumber"]) ? (
              <p className="m-0" key="error-theFirstSuppliersContactNumber">
                {error["theFirstSuppliersContactNumber"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="suppliersContactNumber">Supplier's contact number:</label>
                <InputText id="suppliersContactNumber" className="w-full mb-3 p-inputtext-sm" value={_entity?.suppliersContactNumber} onChange={(e) => setValByKey("suppliersContactNumber", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["suppliersContactNumber"]) ? (
              <p className="m-0" key="error-suppliersContactNumber">
                {error["suppliersContactNumber"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="countryName">Country name:</label>
                <InputText id="countryName" className="w-full mb-3 p-inputtext-sm" value={_entity?.countryName} onChange={(e) => setValByKey("countryName", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["countryName"]) ? (
              <p className="m-0" key="error-countryName">
                {error["countryName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="stateName">State name:</label>
                <InputText id="stateName" className="w-full mb-3 p-inputtext-sm" value={_entity?.stateName} onChange={(e) => setValByKey("stateName", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["stateName"]) ? (
              <p className="m-0" key="error-stateName">
                {error["stateName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="cityName">City name:</label>
                <InputText id="cityName" className="w-full mb-3 p-inputtext-sm" value={_entity?.cityName} onChange={(e) => setValByKey("cityName", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["cityName"]) ? (
              <p className="m-0" key="error-cityName">
                {error["cityName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="postalZone">Postal zone:</label>
                <InputNumber id="postalZone" className="w-full mb-3 p-inputtext-sm" value={_entity?.postalZone} onChange={(e) => setValByKey("postalZone", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["postalZone"]) ? (
              <p className="m-0" key="error-postalZone">
                {error["postalZone"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="suppliersBankAccountNumber">Supplier's Bank Account Number:</label>
                <InputNumber id="suppliersBankAccountNumber" className="w-full mb-3 p-inputtext-sm" value={_entity?.suppliersBankAccountNumber} onChange={(e) => setValByKey("suppliersBankAccountNumber", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["suppliersBankAccountNumber"]) ? (
              <p className="m-0" key="error-suppliersBankAccountNumber">
                {error["suppliersBankAccountNumber"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="paymentTerms">Payment Terms:</label>
                <InputText id="paymentTerms" className="w-full mb-3 p-inputtext-sm" value={_entity?.paymentTerms} onChange={(e) => setValByKey("paymentTerms", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["paymentTerms"]) ? (
              <p className="m-0" key="error-paymentTerms">
                {error["paymentTerms"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="prePaymentAmount">PrePayment Amount:</label>
                <InputNumber id="prePaymentAmount" className="w-full mb-3 p-inputtext-sm" value={_entity?.prePaymentAmount} onChange={(e) => setValByKey("prePaymentAmount", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["prePaymentAmount"]) ? (
              <p className="m-0" key="error-prePaymentAmount">
                {error["prePaymentAmount"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="prePaymentDate">PrePayment Date:</label>
                <Calendar id="prePaymentDate" value={_entity?.prePaymentDate ? new Date(_entity?.prePaymentDate) : null} onChange={ (e) => setValByKey("prePaymentDate", e.value)} showTime hourFormat="12"  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["prePaymentDate"]) ? (
              <p className="m-0" key="error-prePaymentDate">
                {error["prePaymentDate"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="prePaymentReferenceNumber">PrePayment Reference Number:</label>
                <InputText id="prePaymentReferenceNumber" className="w-full mb-3 p-inputtext-sm" value={_entity?.prePaymentReferenceNumber} onChange={(e) => setValByKey("prePaymentReferenceNumber", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["prePaymentReferenceNumber"]) ? (
              <p className="m-0" key="error-prePaymentReferenceNumber">
                {error["prePaymentReferenceNumber"]}
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

export default connect(mapState, mapDispatch)(SupplierCreateDialogComponent);
