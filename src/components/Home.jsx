import React, { useState, useEffect } from "react";
import style from "./CSS/Home.module.css";
import { IoSearch } from "react-icons/io5";

const Home = () => {
  const [record, setRecord] = useState([]);
  const [filteredRecord, setFilteredRecord] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const dataPerPage = 4;
  const endIndex = currentPage * dataPerPage;
  const startIndex = endIndex - dataPerPage;
  const updatedRecords = filteredRecord.slice(startIndex, endIndex);
  const lastPage = Math.ceil(filteredRecord.length / dataPerPage);
  const pageNums = [...Array(lastPage + 1).keys()].slice(1);

  const getInfo = async () => {
    const url = "https://gorest.co.in/public/v2/users";
    const response = await fetch(url);
    const information = await response.json();
    try {
      setRecord(information);
      setFilteredRecord(information);
    } catch (err) {
      console.log("Error found");
    }
  };

  const handlePageChange = (index) => {
    setCurrentPage(index + 1);
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    const newValues = record.filter((eachData) =>
      eachData.name.toUpperCase().includes(e.target.value.toUpperCase())
    );
    setFilteredRecord(newValues);
  };

  useEffect(function () {
    getInfo();
  }, []);

  return (
    <>
      <div className={style.home_page}>
        <div className={style.main_container}>
          <div className={style.search_container}>
            <input
              className={style.search_box}
              value={searchValue}
              type="search"
              onChange={handleSearch}
              placeholder="Search Name"
            />
            <IoSearch className={style.search_logo} />
          </div>

          <table className={style.table}>
            <thead>
              <tr className={style.head_row}>
                <th className={style.headerCell}>ID</th>
                <th className={style.headerCell}>NAME</th>
                <th className={style.headerCellE}>EMAIL</th>
                <th className={style.headerCell}>GENDER</th>
                <th className={style.headerCell}>STATUS</th>
              </tr>
            </thead>
          </table>
          {updatedRecords.map((eachItem) => (
            <table className={style.table} key={eachItem.id}>
              <tbody>
                <tr className={style.data_row}>
                  <td className={style.dataCell}>{eachItem.id}</td>
                  <td className={style.dataCell}>{eachItem.name}</td>
                  <td className={style.dataCellE}>{eachItem.email}</td>
                  <td className={style.dataCell}>{eachItem.gender}</td>
                  <td className={style.dataCell}>{eachItem.status}</td>
                </tr>
              </tbody>
            </table>
          ))}
          <div className={style.num_container}>
            {pageNums.map((eachData, index) => (
              <h1
                onClick={() => {
                  handlePageChange(index);
                }}
                key={index}
                className={style.page_number}
              >
                {eachData}
              </h1>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
