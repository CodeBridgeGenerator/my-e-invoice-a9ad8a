import React from "react";
import { render, screen } from "@testing-library/react";

import MeasurementEditDialogComponent from "../MeasurementEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders measurement edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MeasurementEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("measurement-edit-dialog-component")).toBeInTheDocument();
});
