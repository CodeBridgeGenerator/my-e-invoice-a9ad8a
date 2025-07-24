import React from "react";
import { render, screen } from "@testing-library/react";

import ClassificationCodePage from "../ClassificationCodePage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders classificationCode page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ClassificationCodePage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("classificationCode-datatable")).toBeInTheDocument();
    expect(screen.getByRole("classificationCode-add-button")).toBeInTheDocument();
});
