import React from "react";
import ListPackage from "../../components/package/ListPackage";
import ListTransaction from "../../components/package/ListTransaction";

const PackageManagement = () => {
  return (
    <div className="mt-3 h-100">
      <div>
        <h6 className="mb-3">Package Management</h6>
      </div>
      <ListPackage />
      <br />
      <br />
      <div>
        <h6 className="mb-3">Transaction History</h6>
      </div>
      <ListTransaction />
    </div>
  );
};

export default PackageManagement;
