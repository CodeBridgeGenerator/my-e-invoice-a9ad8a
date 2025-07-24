import React from "react";
import { render, screen } from "@testing-library/react";

import ClassificationCodeEditDialogComponent from "../ClassificationCodeEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders classificationCode edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ClassificationCodeEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("classificationCode-edit-dialog-component")).toBeInTheDocument();
});
