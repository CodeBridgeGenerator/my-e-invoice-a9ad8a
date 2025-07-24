import React from "react";
import { render, screen } from "@testing-library/react";

import StateCodePage from "../StateCodePage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders stateCode page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <StateCodePage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("stateCode-datatable")).toBeInTheDocument();
    expect(screen.getByRole("stateCode-add-button")).toBeInTheDocument();
});
