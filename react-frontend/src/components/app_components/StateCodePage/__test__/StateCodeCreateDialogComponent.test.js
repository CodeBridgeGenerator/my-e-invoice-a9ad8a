import React from "react";
import { render, screen } from "@testing-library/react";

import StateCodeCreateDialogComponent from "../StateCodeCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders stateCode create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <StateCodeCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("stateCode-create-dialog-component")).toBeInTheDocument();
});
