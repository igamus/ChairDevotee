import { createContext, useContext, useState } from "react";

export const FilterParamsContext = createContext();
export const useFilterParams = () => useContext(FilterParamsContext);

export default function FilterParamsProvider({ children }) {
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(20);
    const [minPrice, setMinPrice] = useState(1);
    const [maxPrice, setMaxPrice] = useState(50_000);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentSize, setCurrentSize] = useState(1);


    return (
        <FilterParamsContext.Provider
            value={{
                page,
                setPage,
                size,
                setSize,
                minPrice,
                setMinPrice,
                maxPrice,
                setMaxPrice,
                currentPage,
                setCurrentPage,
                currentSize,
                setCurrentSize
            }}
        >
            {children}
        </FilterParamsContext.Provider>
    );
}
