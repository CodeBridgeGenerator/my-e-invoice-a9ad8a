import React from "react";
import { render, screen } from "@testing-library/react";

import PaymentModeCreateDialogComponent from "../PaymentModeCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders paymentMode create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PaymentModeCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("paymentMode-create-dialog-component")).toBeInTheDocument();
});
