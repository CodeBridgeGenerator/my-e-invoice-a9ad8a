import React from "react";
import { render, screen } from "@testing-library/react";

import PaymentModeEditDialogComponent from "../PaymentModeEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders paymentMode edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PaymentModeEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("paymentMode-edit-dialog-component")).toBeInTheDocument();
});
