import React from "react";
import { render, screen } from "@testing-library/react";

import MeasurementPage from "../MeasurementPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders measurement page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MeasurementPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("measurement-datatable")).toBeInTheDocument();
    expect(screen.getByRole("measurement-add-button")).toBeInTheDocument();
});
