import { createContext, useContext, useState } from "react";

export const FilterParamsContext = createContext();
export const useFilterParams = () => useContext(FilterParamsContext);

export default function FilterParamsProvider({ children }) {
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(20);
    const [minPrice, setMinPrice] = useState(1);
    const [maxPrice, setMaxPrice] = useState(50_000);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [currentSize, setCurrentSize] = useState(1);
    const [urlSuffix, setUrlSuffix] = useState("");

    // function setUrl({ page, size, minPrice, maxPrice }) {
        // const suffixStrArr = [];

        // // we'll circle back and see what conditionals are necessary // can probably update this not to use params but the context
        // if (page && page !== 1) suffixStrArr.push(`page=${page}`);
        // if (size && size !== 20) suffixStrArr.push(`size=${size}`);
        // if (minPrice && minPrice !== 1) suffixStrArr.push(`minPrice=${minPrice}`);
        // if (maxPrice && maxPrice !== 50_000) suffixStrArr.push(`minPrice=${maxPrice}`);
    function setSuffix() {
        const suffixStrArr = [];

        // we'll circle back and see what conditionals are necessary // can probably update this not to use params but the context
        if (page !== 1) suffixStrArr.push(`page=${page}`);
        if (size !== 20) suffixStrArr.push(`size=${size}`);
        if (minPrice !== 1) suffixStrArr.push(`minPrice=${minPrice}`);
        if (maxPrice !== 50_000) suffixStrArr.push(`minPrice=${maxPrice}`);
        if (suffixStrArr.length) {
            const suffixStr = "?" + suffixStrArr.join("&");
            return setUrlSuffix(suffixStr);
        } else {
            return setUrlSuffix("");
        }
    };

    // page turn left & page turn right -- handle logic of max and min
    // function pageRight() {
    //     setPage(page + 1);
    // };

    function pageLeft() {
        if (page > 1) {
            setPage(page - 1).then(() => setSuffix());
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
                // currentPage,
                // setCurrentPage,
                // currentSize,
                // setCurrentSize,
                urlSuffix,
                setSuffix
            }}
        >
            {children}
        </FilterParamsContext.Provider>
    );
}
