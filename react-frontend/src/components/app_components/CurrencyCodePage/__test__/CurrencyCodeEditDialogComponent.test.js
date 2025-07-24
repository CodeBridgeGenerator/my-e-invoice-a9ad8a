import React from "react";
import { render, screen } from "@testing-library/react";

import CurrencyCodeEditDialogComponent from "../CurrencyCodeEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders currencyCode edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CurrencyCodeEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("currencyCode-edit-dialog-component")).toBeInTheDocument();
});
