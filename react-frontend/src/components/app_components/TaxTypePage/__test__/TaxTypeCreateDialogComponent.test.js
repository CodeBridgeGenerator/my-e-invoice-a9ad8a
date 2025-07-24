import React from "react";
import { render, screen } from "@testing-library/react";

import TaxTypeCreateDialogComponent from "../TaxTypeCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders taxType create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <TaxTypeCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("taxType-create-dialog-component")).toBeInTheDocument();
});
