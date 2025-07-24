import React from "react";
import { render, screen } from "@testing-library/react";

import PaymentModePage from "../PaymentModePage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders paymentMode page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PaymentModePage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("paymentMode-datatable")).toBeInTheDocument();
    expect(screen.getByRole("paymentMode-add-button")).toBeInTheDocument();
});
