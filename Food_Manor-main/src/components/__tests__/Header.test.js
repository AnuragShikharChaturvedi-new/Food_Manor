import { render, screen,fireEvent } from '@testing-library/react';  // Make sure this import is correct
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import appStore from "../../utils/appStore";
import Header from "../Header";
import "@testing-library/jest-dom";

test("Should load Header Component with a login button", () => {
    const { getByRole } = render(  // Destructure getByRole from render result
        <BrowserRouter>
            <Provider store={appStore}>
                <Header />
            </Provider>
        </BrowserRouter>
    );
    
    const loginButton = getByRole("button",{name:"Login"});  // Use getByRole directly
    expect(loginButton).toBeInTheDocument();
});

test("Should load Header Component with a Cart item 0", () => {
    const { getByText } = render(  // Destructure getByText from render result
        <BrowserRouter>
            <Provider store={appStore}>
                <Header />
            </Provider>
        </BrowserRouter>
    );

    const cartItems = getByText("Cart (0 items)");  // Use getByText directly
    expect(cartItems).toBeInTheDocument();
});

test("Should Change Login button to Logout Button",()=>{
    const { getByRole } = render(  // Destructure getByRole from render result
        <BrowserRouter>
            <Provider store={appStore}>
                <Header />
            </Provider>
        </BrowserRouter>
    );
    const loginButton = getByRole("button", {name:"Login"});
    fireEvent.click(loginButton);
    const logoutButton = getByRole("button", {name:"Logout"});
    expect(logoutButton).toBeInTheDocument();
})