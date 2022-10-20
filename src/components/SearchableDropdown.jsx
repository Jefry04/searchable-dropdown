import React from "react";
// import AsyncSelect from "react-select/async";
import AsyncCreatableSelect from "react-select/async-creatable";
import { components } from "react-select";

const { Option } = components;
const CustomOption = (props) => (
  <Option {...props}>
    {props.data.logo && (
      <img src={props.data.logo} style={{ width: 36 }} alt={props.data.label} />
    )}
    {props.data.label}
  </Option>
);

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
        logo: opt.logo,
      }));
      return companies;
    }
  };

  return (
    <AsyncCreatableSelect
      onChange={(opt, meta) => console.log("option", opt, "meta:", meta)}
      cacheOptions
      defaultOptions
      isClearable={true}
      loadOptions={promiseOptions}
      components={{ Option: CustomOption }}
    />
  );
};

export default SearchableDropdown;
