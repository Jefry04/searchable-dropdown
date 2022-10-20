import React from "react";
// import AsyncSelect from "react-select/async";
import AsyncCreatableSelect from "react-select/async-creatable";

const SearchableDropdown = () => {
  const promiseOptions = async (inputValue) => {
    if (inputValue) {
      const response = await fetch(
        `https://autocomplete.clearbit.com/v1/companies/suggest?query=${inputValue}`
      );
      const data = await response.json();
      const companies = data.map((opt) => ({
        label: opt.name,
        value: opt.name,
      }));
       console.log("empresas :", companies)
      return companies;
    }
  };
  return (
    <AsyncCreatableSelect
      //   onChange={(opt, meta) => console.log("option", opt, "meta:", meta)}
      cacheOptions
      defaultOptions
      isClearable={true}
      loadOptions={promiseOptions}
      //   getOptionLabel={e => console.log(e)}
    />
  );
};

export default SearchableDropdown;
