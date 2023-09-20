import { createContext, useContext, useState } from "react";

export const FilterParamsContext = createContext();
export const useFilterParams = () => useContext(FilterParamsContext);

export default function FilterParamsProvider({ children }) {
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(20);
    const [minPrice, setMinPrice] = useState(1);
    const [maxPrice, setMaxPrice] = useState(50_000);
    const [urlSuffix, setUrlSuffix] = useState("");

    function setSuffix() {
        const suffixStrArr = [];

        if (page !== 1) suffixStrArr.push(`page=${page}`);
        if (size !== 20) suffixStrArr.push(`size=${size}`);
        if (minPrice !== 1) suffixStrArr.push(`minPrice=${minPrice}`);
        if (maxPrice !== 50_000) suffixStrArr.push(`maxPrice=${maxPrice}`);
        if (suffixStrArr.length) {
            const suffixStr = "?" + suffixStrArr.join("&");
            return setUrlSuffix(suffixStr);
        } else {
            return setUrlSuffix("");
        }
    };

    function pageRight() {
        if (page < 10) {
            setPage(page + 1);
            setSuffix();
        }
    };

    function pageLeft() {
        if (page > 1) {
            setPage(page - 1);
            setSuffix();
        }
    };

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
                urlSuffix,
                setSuffix,
                pageLeft,
                pageRight
            }}
        >
            {children}
        </FilterParamsContext.Provider>
    );
}
