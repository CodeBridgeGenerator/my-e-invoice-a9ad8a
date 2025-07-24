import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const SuppliersCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [identifierType, setIdentifierType] = useState([])
const [theFirstSuppliersContactNumber, setTheFirstSuppliersContactNumber] = useState([])
const [countryName, setCountryName] = useState([])
const [stateName, setStateName] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount identifyType
                    client
                        .service("identifyType")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleIdentifyTypeId } })
                        .then((res) => {
                            setIdentifierType(res.data.map((e) => { return { name: e['identifyType'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "IdentifyType", type: "error", message: error.message || "Failed get identifyType" });
                        });
                }, []);
 useEffect(() => {
                    //on mount phoneNumberPrefix
                    client
                        .service("phoneNumberPrefix")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singlePhoneNumberPrefixId } })
                        .then((res) => {
                            setTheFirstSuppliersContactNumber(res.data.map((e) => { return { name: e['phoneNumberPrefix'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "PhoneNumberPrefix", type: "error", message: error.message || "Failed get phoneNumberPrefix" });
                        });
                }, []);
 useEffect(() => {
                    //on mount countryCodes
                    client
                        .service("countryCodes")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleCountryCodesId } })
                        .then((res) => {
                            setCountryName(res.data.map((e) => { return { name: e['countryCode'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "CountryCodes", type: "error", message: error.message || "Failed get countryCodes" });
                        });
                }, []);
 useEffect(() => {
                    //on mount stateCodes
                    client
                        .service("stateCodes")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleStateCodesId } })
                        .then((res) => {
                            setStateName(res.data.map((e) => { return { name: e['stateCode'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "StateCodes", type: "error", message: error.message || "Failed get stateCodes" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            suppliersName: _entity?.suppliersName,
suppliersTin: _entity?.suppliersTin,
suppliersSstRegistrationNumber: _entity?.suppliersSstRegistrationNumber,
identifierType: _entity?.identifierType?._id,
identifierNumber: _entity?.identifierNumber,
suppliersMsicCode: _entity?.suppliersMsicCode,
suppliersTourismTaxRegistrationNumber: _entity?.suppliersTourismTaxRegistrationNumber,
suppliersBusinessActivityDescription: _entity?.suppliersBusinessActivityDescription,
suppliersEMail: _entity?.suppliersEMail,
theFirstSuppliersContactNumber: _entity?.theFirstSuppliersContactNumber?._id,
suppliersContactNumber: _entity?.suppliersContactNumber,
countryName: _entity?.countryName?._id,
stateName: _entity?.stateName?._id,
cityName: _entity?.cityName,
postalZone: _entity?.postalZone,
suppliersBankAccountNumber: _entity?.suppliersBankAccountNumber,
paymentTerms: _entity?.paymentTerms,
prePaymentAmount: _entity?.prePaymentAmount,
prePaymentDate: _entity?.prePaymentDate,
prePaymentReferenceNumber: _entity?.prePaymentReferenceNumber,
        };

        setLoading(true);
        try {
            
        await client.service("suppliers").patch(_entity._id, _data);
        const eagerResult = await client
            .service("suppliers")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "identifierType",
                    service : "identifyType",
                    select:["identifyType"]},{
                    path : "theFirstSuppliersContactNumber",
                    service : "phoneNumberPrefix",
                    select:["phoneNumberPrefix"]},{
                    path : "countryName",
                    service : "countryCodes",
                    select:["countryCode"]},{
                    path : "stateName",
                    service : "stateCodes",
                    select:["stateCode"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info suppliers updated successfully" });
        props.onEditResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
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

    const identifierTypeOptions = identifierType.map((elem) => ({ name: elem.name, value: elem.value }));
const theFirstSuppliersContactNumberOptions = theFirstSuppliersContactNumber.map((elem) => ({ name: elem.name, value: elem.value }));
const countryNameOptions = countryName.map((elem) => ({ name: elem.name, value: elem.value }));
const stateNameOptions = stateName.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Suppliers" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="suppliers-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="suppliersName">Supplier's Name:</label>
                <InputText id="suppliersName" className="w-full mb-3 p-inputtext-sm" value={_entity?.suppliersName} onChange={(e) => setValByKey("suppliersName", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["suppliersName"]) && (
              <p className="m-0" key="error-suppliersName">
                {error["suppliersName"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="suppliersTin">Supplier's TIN:</label>
                <InputText id="suppliersTin" className="w-full mb-3 p-inputtext-sm" value={_entity?.suppliersTin} onChange={(e) => setValByKey("suppliersTin", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["suppliersTin"]) && (
              <p className="m-0" key="error-suppliersTin">
                {error["suppliersTin"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="suppliersSstRegistrationNumber">Supplier's SST Registration Number:</label>
                <InputText id="suppliersSstRegistrationNumber" className="w-full mb-3 p-inputtext-sm" value={_entity?.suppliersSstRegistrationNumber} onChange={(e) => setValByKey("suppliersSstRegistrationNumber", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["suppliersSstRegistrationNumber"]) && (
              <p className="m-0" key="error-suppliersSstRegistrationNumber">
                {error["suppliersSstRegistrationNumber"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="identifierType">Identifier Type:</label>
                <Dropdown id="identifierType" value={_entity?.identifierType?._id} optionLabel="name" optionValue="value" options={identifierTypeOptions} onChange={(e) => setValByKey("identifierType", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["identifierType"]) && (
              <p className="m-0" key="error-identifierType">
                {error["identifierType"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="identifierNumber">Identifier Number:</label>
                <InputText id="identifierNumber" className="w-full mb-3 p-inputtext-sm" value={_entity?.identifierNumber} onChange={(e) => setValByKey("identifierNumber", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["identifierNumber"]) && (
              <p className="m-0" key="error-identifierNumber">
                {error["identifierNumber"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="suppliersMsicCode">Supplier's MSIC code:</label>
                <InputText id="suppliersMsicCode" className="w-full mb-3 p-inputtext-sm" value={_entity?.suppliersMsicCode} onChange={(e) => setValByKey("suppliersMsicCode", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["suppliersMsicCode"]) && (
              <p className="m-0" key="error-suppliersMsicCode">
                {error["suppliersMsicCode"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="suppliersTourismTaxRegistrationNumber">Supplier's Tourism Tax Registration Number:</label>
                <InputText id="suppliersTourismTaxRegistrationNumber" className="w-full mb-3 p-inputtext-sm" value={_entity?.suppliersTourismTaxRegistrationNumber} onChange={(e) => setValByKey("suppliersTourismTaxRegistrationNumber", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["suppliersTourismTaxRegistrationNumber"]) && (
              <p className="m-0" key="error-suppliersTourismTaxRegistrationNumber">
                {error["suppliersTourismTaxRegistrationNumber"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="suppliersBusinessActivityDescription">Supplier's Business Activity Description:</label>
                <InputText id="suppliersBusinessActivityDescription" className="w-full mb-3 p-inputtext-sm" value={_entity?.suppliersBusinessActivityDescription} onChange={(e) => setValByKey("suppliersBusinessActivityDescription", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["suppliersBusinessActivityDescription"]) && (
              <p className="m-0" key="error-suppliersBusinessActivityDescription">
                {error["suppliersBusinessActivityDescription"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="suppliersEMail">Supplier's e-mail:</label>
                <InputText id="suppliersEMail" className="w-full mb-3 p-inputtext-sm" value={_entity?.suppliersEMail} onChange={(e) => setValByKey("suppliersEMail", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["suppliersEMail"]) && (
              <p className="m-0" key="error-suppliersEMail">
                {error["suppliersEMail"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="theFirstSuppliersContactNumber">The first Supplier's contact number:</label>
                <Dropdown id="theFirstSuppliersContactNumber" value={_entity?.theFirstSuppliersContactNumber?._id} optionLabel="name" optionValue="value" options={theFirstSuppliersContactNumberOptions} onChange={(e) => setValByKey("theFirstSuppliersContactNumber", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["theFirstSuppliersContactNumber"]) && (
              <p className="m-0" key="error-theFirstSuppliersContactNumber">
                {error["theFirstSuppliersContactNumber"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="suppliersContactNumber">Supplier's contact number:</label>
                <InputText id="suppliersContactNumber" className="w-full mb-3 p-inputtext-sm" value={_entity?.suppliersContactNumber} onChange={(e) => setValByKey("suppliersContactNumber", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["suppliersContactNumber"]) && (
              <p className="m-0" key="error-suppliersContactNumber">
                {error["suppliersContactNumber"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="countryName">Country name:</label>
                <Dropdown id="countryName" value={_entity?.countryName?._id} optionLabel="name" optionValue="value" options={countryNameOptions} onChange={(e) => setValByKey("countryName", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["countryName"]) && (
              <p className="m-0" key="error-countryName">
                {error["countryName"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="stateName">State name:</label>
                <Dropdown id="stateName" value={_entity?.stateName?._id} optionLabel="name" optionValue="value" options={stateNameOptions} onChange={(e) => setValByKey("stateName", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["stateName"]) && (
              <p className="m-0" key="error-stateName">
                {error["stateName"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="cityName">City name:</label>
                <InputText id="cityName" className="w-full mb-3 p-inputtext-sm" value={_entity?.cityName} onChange={(e) => setValByKey("cityName", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["cityName"]) && (
              <p className="m-0" key="error-cityName">
                {error["cityName"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="postalZone">Postal zone:</label>
                <InputText id="postalZone" className="w-full mb-3 p-inputtext-sm" value={_entity?.postalZone} onChange={(e) => setValByKey("postalZone", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["postalZone"]) && (
              <p className="m-0" key="error-postalZone">
                {error["postalZone"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="suppliersBankAccountNumber">Supplier's Bank Account Number:</label>
                <InputNumber id="suppliersBankAccountNumber" className="w-full mb-3 p-inputtext-sm" value={_entity?.suppliersBankAccountNumber} onChange={(e) => setValByKey("suppliersBankAccountNumber", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["suppliersBankAccountNumber"]) && (
              <p className="m-0" key="error-suppliersBankAccountNumber">
                {error["suppliersBankAccountNumber"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="paymentTerms">Payment Terms:</label>
                <InputText id="paymentTerms" className="w-full mb-3 p-inputtext-sm" value={_entity?.paymentTerms} onChange={(e) => setValByKey("paymentTerms", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["paymentTerms"]) && (
              <p className="m-0" key="error-paymentTerms">
                {error["paymentTerms"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="prePaymentAmount">PrePayment Amount:</label>
                <InputNumber id="prePaymentAmount" className="w-full mb-3 p-inputtext-sm" value={_entity?.prePaymentAmount} onChange={(e) => setValByKey("prePaymentAmount", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["prePaymentAmount"]) && (
              <p className="m-0" key="error-prePaymentAmount">
                {error["prePaymentAmount"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="prePaymentDate">PrePayment Date:</label>
                <Calendar id="prePaymentDate" value={_entity?.prePaymentDate ? new Date(_entity?.prePaymentDate) : null} onChange={ (e) => setValByKey("prePaymentDate", new Date(e.target.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["prePaymentDate"]) && (
              <p className="m-0" key="error-prePaymentDate">
                {error["prePaymentDate"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="prePaymentReferenceNumber">PrePayment Reference Number:</label>
                <InputText id="prePaymentReferenceNumber" className="w-full mb-3 p-inputtext-sm" value={_entity?.prePaymentReferenceNumber} onChange={(e) => setValByKey("prePaymentReferenceNumber", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["prePaymentReferenceNumber"]) && (
              <p className="m-0" key="error-prePaymentReferenceNumber">
                {error["prePaymentReferenceNumber"]}
              </p>
            )}
          </small>
            </div>
                <div className="col-12">&nbsp;</div>
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

export default connect(mapState, mapDispatch)(SuppliersCreateDialogComponent);
