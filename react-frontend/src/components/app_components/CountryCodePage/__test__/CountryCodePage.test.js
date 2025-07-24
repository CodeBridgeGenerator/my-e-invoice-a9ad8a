import React from "react";
import { render, screen } from "@testing-library/react";

import CountryCodePage from "../CountryCodePage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders countryCode page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CountryCodePage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("countryCode-datatable")).toBeInTheDocument();
    expect(screen.getByRole("countryCode-add-button")).toBeInTheDocument();
});
