import React from "react";
import { render, screen } from "@testing-library/react";

import TaxTypePage from "../TaxTypePage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders taxType page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <TaxTypePage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("taxType-datatable")).toBeInTheDocument();
    expect(screen.getByRole("taxType-add-button")).toBeInTheDocument();
});
