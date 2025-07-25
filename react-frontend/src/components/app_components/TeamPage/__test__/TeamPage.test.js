import React from "react";
import { render, screen } from "@testing-library/react";

import TeamPage from "../TeamPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders team page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <TeamPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("team-datatable")).toBeInTheDocument();
    expect(screen.getByRole("team-add-button")).toBeInTheDocument();
});
