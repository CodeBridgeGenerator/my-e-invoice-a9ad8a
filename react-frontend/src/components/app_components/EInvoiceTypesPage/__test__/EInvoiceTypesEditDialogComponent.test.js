import React from "react";
import { render, screen } from "@testing-library/react";

import EInvoiceTypesEditDialogComponent from "../EInvoiceTypesEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders eInvoiceTypes edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <EInvoiceTypesEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("eInvoiceTypes-edit-dialog-component")).toBeInTheDocument();
});
