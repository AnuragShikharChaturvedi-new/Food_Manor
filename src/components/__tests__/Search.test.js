
import {render,screen} from "@testing-library/jest-dom";
import Body from "../Body";
import "@testing-library/jest-dom"
import MOCK_DATA from "../mocks/mockResList.json";
import {act} from "react-dom/test-utils";
import "@testing-library/jest-dom"
global.fetch=jest.fn(()=>{
    return Promise.resolve({   // dummy fetch function(mock fetch function)
        json:()=>{
            return Promise.resolve(MOCK_DATA);
        }
    })
})




import { Body } from 'native-base'
import { BrowserRouter } from "react-router-dom";
test("Should render the body component with search",()=>{
    await act(async()=>render(<BrowserRouter><Body/></BrowserRouter>))
    const searchBtn=screen.getByRole("button",{name:"Search"});

})